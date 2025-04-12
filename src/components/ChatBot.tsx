import { useState } from "react";
import { generateResponse } from "../services/gemini";

const ChatBot: React.FC = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleGenerate = async () => {
    if (!input) return;
    setLoading(true);

    try {
      const aiResponse = await generateResponse(input);
      setResponse(aiResponse);
    } catch (error) {
      setResponse("Error generating response.");
    }

    setLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleGenerate();
    }
  };

  return (
    <>
      <button
        className="fixed bottom-4 right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "Close ChatBot" : "Open ChatBot"}
      </button>

      {isOpen && (
        <div className="fixed bottom-16 right-4 p-4 border rounded-lg shadow-lg bg-white dark:bg-gray-800 dark:text-white">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-bold">Ask Questions With AI</h2>
            <button
              className="text-red-500"
              onClick={() => setIsOpen(false)}
            >
              Close
            </button>
          </div>
          <textarea
            className="w-full p-2 border rounded mb-2 dark:bg-gray-700 dark:text-white"
            rows={3}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your question..."
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleGenerate}
            disabled={loading}
          >
            {loading ? "Generating..." : "Ask AI"}
          </button>
          {response && <p className="mt-4 p-2 border dark:bg-gray-700 dark:text-white">{response}</p>}
        </div>
      )}
    </>
  );
};

export default ChatBot;