import React, { useState } from "react";
import "./App.css";

const App = () => {
    const [prompt, setPrompt] = useState("");
    const [response, setResponse] = useState({ response: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://127.0.0.1:5000/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ prompt }),
            });

            const data = await res.json();
            if (data.response && data.response.response) {
                setResponse({ response: data.response.response });
            } else {
                setResponse({ response: "No response received from server" });
            }
        } catch (error) {
            console.error("Error occurred:", error);
            setResponse({ response: "Error: Unable to connect to the server" });
        }
    };

    return (
      <div style={{ padding: "20px" }}>
          <h1>Spiritual Guidance Chatbot</h1>
          <form onSubmit={handleSubmit}>
              <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Enter your question"
                  rows="4"
                  cols="50"
              />
              <button type="submit">Submit</button>
          </form>
          <div className="response-container">
              <h3>Response:</h3>
              {response.response ? (
                  <p>{response.response}</p>
              ) : (
                  <p>Ask a question about mindfulness, meditation or stress management!</p>
              )}
          </div>
      </div>
  );
};

export default App;