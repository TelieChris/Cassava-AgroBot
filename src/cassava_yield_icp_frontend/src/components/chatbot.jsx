import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { createActor } from "../ic/canisters";
import Sidebar from "./Sidebar";

const backend = createActor(process.env.CANISTER_ID_CASSAVA_YIELD_ICP_BACKEND);

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [examplePrompts, setExamplePrompts] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];
    setChatHistory(savedHistory);
  }, []);

  useEffect(() => {
    const fetchExamples = async () => {
      try {
        const examples = await backend.get_example_projects();
        setExamplePrompts(examples);
      } catch (error) {
        console.error("Error fetching example prompts:", error);
      }
    };
    fetchExamples();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const user = "default_user";
      const botResponse = await backend.ask_cassava_question(user, input);
      const botMessage = { role: "bot", content: botResponse };

      const updatedMessages = [...messages, userMessage, botMessage];
      setMessages(updatedMessages);

      const updatedHistory = [...chatHistory, updatedMessages];
      setChatHistory(updatedHistory);
      localStorage.setItem("chatHistory", JSON.stringify(updatedHistory));
    } catch (error) {
      console.error("Error calling the backend:", error);
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: "⚠️ Error: Unable to fetch response. Please try again." },
      ]);
    }

    setLoading(false);
  };

  return (
    
    <div className={`flex min-h-screen ${isDarkMode ? "bg-gray-900 text-white" : "bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-black"}`}>
      {/* Sidebar with collapse option */}
      <Sidebar
        chatHistory={chatHistory}
        setMessages={setMessages}
        isDarkMode={isDarkMode}
        toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        isCollapsed={isSidebarCollapsed}
        toggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      {/* Main Chat Area */}
      
      <div className={`flex flex-col flex-grow ${isDarkMode ? "bg-gray-900 text-white" : "bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-black"}`}>
      <div className="bg-white bg-opacity-20 min-h-screen p-4">
        <h1 className="text-2xl font-bold text-center mb-4">Cassava AgroBot</h1>
        
        {/* Chat Box */}
        <div className="h-[65vh] overflow-y-auto bg-white bg-opacity-40 border shadow rounded-lg p-4">
          {messages.map((msg, index) => (
            <div key={index} className="flex flex-col items-end mb-2">
              {msg.role === "user" && (
                <div className="bg-blue-500 text-white p-3 rounded-lg max-w-[75%] text-right">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              )}
              {msg.role === "bot" && (
                <div className="bg-gray-300 text-black p-3 rounded-lg max-w-[75%] text-left mt-1">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              )}
            </div>
          ))}
          {loading && (
            <div className="flex justify-center text-gray-500 text-sm mt-4">
              <div className="animate-spin rounded-full border-t-2 border-blue-600 w-6 h-6 mr-2"></div>
              Thinking...
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input - Positioned at the Top Right */}
        <div className="flex justify-end mt-3">
          <input
            type="text"
            className={`w-1/2 border rounded-lg p-2 focus:outline-none ${isDarkMode ? "text-black":"text-black"}`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question..."
          />
          <button
            onClick={sendMessage}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 ml-2"
            disabled={loading}
          >
            Send
          </button>
        </div>

        {/* Example Prompts */}
        <div className="mt-5">
          <h2 className="text-lg font-bold mb-2">Try These Prompts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {examplePrompts.map((prompt, index) => (
              <button
                key={index}
                onClick={() => setInput(prompt)}
                className="bg-gray-200 text-gray-900 p-2 rounded-lg hover:bg-gray-300"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Chatbot;
