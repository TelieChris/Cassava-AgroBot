import React, { useState } from "react";
import { createActor } from "../ic/canisters"; // ICP agent setup
import { toast } from "react-toastify";

const CassavaPrediction = () => {
  const [rainfall, setRainfall] = useState("");
  const [temperature, setTemperature] = useState("");
  const [soilType, setSoilType] = useState("");
  const [fertilizer, setFertilizer] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const handlePredict = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Call the Rust canister function
      const cassavaCanister = createActor(process.env.CANISTER_ID_CASSAVA_YIELD_ICP_BACKEND);
      const result = await cassavaCanister.predict_yield(
        parseFloat(rainfall),
        parseFloat(temperature),
        soilType,
        parseFloat(fertilizer)
      );

      setPrediction(result);
      toast.success("Prediction received successfully!");
    } catch (error) {
      console.error("Error fetching prediction:", error);
      toast.error("Failed to get prediction.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-semibold text-center mb-4">Cassava Yield Prediction</h2>

      {/* Prediction Form */}
      <form onSubmit={handlePredict} className="space-y-4">
        <div>
          <label className="block font-medium">Rainfall (mm)</label>
          <input
            type="number"
            value={rainfall}
            onChange={(e) => setRainfall(e.target.value)}
            className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Temperature (°C)</label>
          <input
            type="number"
            value={temperature}
            onChange={(e) => setTemperature(e.target.value)}
            className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Soil Type</label>
          <select
            value={soilType}
            onChange={(e) => setSoilType(e.target.value)}
            className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
            required
          >
            <option value="">Select Soil Type</option>
            <option value="Sandy">Sandy</option>
            <option value="Clay">Clay</option>
            <option value="Loamy">Loamy</option>
          </select>
        </div>

        <div>
          <label className="block font-medium">Fertilizer Usage (kg/ha)</label>
          <input
            type="number"
            value={fertilizer}
            onChange={(e) => setFertilizer(e.target.value)}
            className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Predicting..." : "Get Prediction"}
        </button>
      </form>

      {/* Prediction Result */}
      {prediction && (
        <div className="mt-4 p-4 bg-green-100 border border-green-400 rounded-md">
          <h3 className="text-lg font-semibold">Predicted Yield:</h3>
          <p className="text-xl font-bold">{prediction} tons/ha</p>
        </div>
      )}
    </div>
  );
};

export default CassavaPrediction;