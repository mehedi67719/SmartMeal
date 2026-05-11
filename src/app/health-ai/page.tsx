"use client";

import { aichat } from "@/server/AiChat/healthai";
import React, { useState } from "react";


const Page = () => {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    setLoading(true);
    const res = await aichat(message);
    setReply(res);
    setLoading(false);
  };

  return (
    <div className="container">
      <h1>AI Chat Page</h1>

      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask something..."
      />

      <button onClick={handleSend} disabled={loading}>
        {loading ? "Thinking..." : "Send"}
      </button>

      <div>
        <h3>Reply:</h3>
        <p>{reply}</p>
      </div>
    </div>
  );
};

export default Page;