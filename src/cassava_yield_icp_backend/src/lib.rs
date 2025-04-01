use candid::CandidType;
use ic_llm::{Model, ChatMessage, Role};
use std::collections::HashMap;
use ic_cdk::storage;
use ic_cdk::api::stable::StableMemory;

// Define chat history storage using thread-local storage
thread_local! {
    static CHAT_HISTORY: std::cell::RefCell<HashMap<String, Vec<String>>> = std::cell::RefCell::new(HashMap::new());
}

// Simple Q&A functionality for Cassava Yield
#[ic_cdk::update]
async fn ask_cassava_question(user: String, question: String) -> String {
    let messages = vec![
        ChatMessage {
            role: Role::System,
            content: "You are an expert agronomist specializing in cassava farming and yield optimization.".to_string(),
        },
        ChatMessage {
            role: Role::User,
            content: question.clone(),
        },
    ];

    let response = ic_llm::chat(Model::Llama3_1_8B, messages).await;

    // Store chat history
    save_chat(user.clone(), question, response.clone());

    response
}

// Direct prediction prompt
#[ic_cdk::update]
async fn predict_yield(rainfall: f64, temperature: f64, soil_type: String, fertilizer_use: f64) -> String {
    let prompt = format!(
        "Given these cassava farming conditions:
        - Rainfall: {:.2} mm
        - Temperature: {:.2}°C
        - Soil Type: {}
        - Fertilizer Use: {:.2} kg/ha

        Predict the cassava yield in tons per hectare.

        **Important:** Provide only a numerical answer in the format:
        Yield: X.X tons/ha
        Do not include any additional explanation.",
        rainfall, temperature, soil_type, fertilizer_use
    );

    ic_llm::prompt(Model::Llama3_1_8B, prompt).await
}

// Cassava farming knowledge bot
#[ic_cdk::update]
async fn get_farming_tips(topic: String) -> String {
    let prompt = format!(
        "Provide detailed agricultural advice on '{}'. 
        Focus on practical tips and best practices for cassava farming.",
        topic
    );

    ic_llm::prompt(Model::Llama3_1_8B, prompt).await
}

// Example Prompts
#[ic_cdk::query]
fn get_example_projects() -> Vec<String> {
    vec![
        "What are the best soil conditions for growing cassava?".to_string(),
        "How can I protect my cassava crops from common pests and diseases?".to_string(),
        "What is the best fertilizer application schedule for high cassava yield?".to_string(),
    ]
}

// Save chat history for a user
#[ic_cdk::update]
fn save_chat(user: String, question: String, response: String) {
    CHAT_HISTORY.with(|history| {
        let mut history = history.borrow_mut();
        let entry = history.entry(user.clone()).or_insert_with(Vec::new);
        entry.push(format!("Q: {}\nA: {}", question, response));
    });
}

// Retrieve chat history for a user
#[ic_cdk::query]
fn get_chat_history(user: String) -> Vec<String> {
    CHAT_HISTORY.with(|history| {
        history.borrow().get(&user).cloned().unwrap_or_default()
    })
}

// Export Candid interface
ic_cdk::export_candid!();
