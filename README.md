# Cassava AgroBot

Cassava AgroBot is an AI-powered assistant designed to provide expert agricultural advice on cassava farming. It helps farmers, agronomists, and researchers optimize cassava yield by offering real-time guidance on best farming practices, yield predictions, and soil management using ICP (Internet Computer Protocol).

## 🚀 Features
- **Cassava Farming Knowledge Bot**: Provides best practices for soil preparation, planting, and harvesting.
- **AI-Powered Yield Prediction**: Estimates cassava yield based on rainfall, temperature, soil type, and fertilizer use.
- **Conversational Assistance**: Engages in interactive discussions to answer cassava farming queries.
- **Secure & Decentralized**: Powered by ICP, ensuring transparency and security.

## 🛠️ Technologies Used
- **Rust**: Backend logic and canister development
- **React.js**: Frontend interface
- **ICP (Internet Computer)**: Decentralized hosting
- **IC LLM**: AI-powered responses
- **Candid**: Interface description language for ICP

## 🔧 Installation
### Prerequisites:
- Install **DFX** (Internet Computer SDK):
  ```sh
  sh -ci "$(curl -fsSL https://smartcontracts.org/install.sh)"
  ```
- Install **Rust & Cargo**:
  ```sh
  curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
  ```
- Clone the repository:
  ```sh
  git clone https://github.com/TelieChris/Cassava-AgroBot.git
  cd Cassava-AgroBot
  ```
- Install packages:
  ```sh
  npm install
  ```

### Running:
- Start the local ICP replica:
  ```sh
  dfx start --clean --background
  ```
- deploy frontend:
  ```sh
  dfx deploy cassava_yield_icp_frontend
  ```
- Run the bash script to setup the project
  ```sh
  npm run setup
  ```

## 📌 Usage
1. **Ask Cassava Farming Questions**:
   - Example: "What is the best planting season for cassava?"
2. **Get Yield Prediction**:
   - Example: "Predict yield for 1000mm rainfall, 27°C temperature, Clay soil, 50kg/ha fertilizer."
3. **Get Soil Preparation Tips**:
   - Example: "How should I prepare the soil for cassava farming?"

## 👥 User Persona
👩‍🌾 **Primary User**: Farmers looking to optimize cassava production.  
📊 **Secondary User**: Agronomists, researchers, and policymakers.

## 💡 Business Model
- **Freemium Model**: Free basic access with premium features for agribusinesses.
- **Partnerships**: Collaborate with agricultural agencies & cooperatives.
- **Subscription Plans**: Offer advanced analytics & API integration.

## 🤝 Contribution
We welcome contributions! To contribute:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature-xyz`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature-xyz`)
5. Open a Pull Request


## 📞 Contact
For any inquiries, reach out to us at twizeyimana1elia@gmail.com or https://github.com/teliechris.

