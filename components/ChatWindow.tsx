"use client";

import { useState } from "react";
import LeadForm from "./LeadForm";

const ChatWindow = ({ onClose }: { onClose: () => void }) => {
  const [messages, setMessages] = useState<string[]>(["How can I help you today?"]);

  const handleSubmit = (input: string) => {
    setMessages((prev) => [...prev, `🧑: ${input}`, `🤖: I'm still learning! We'll get back soon.`]);
  };

  return (
    <div className="bg-white/5 rounded-xl p-6 w-full max-w-lg shadow-xl">
      <button onClick={onClose} className="text-sm text-gray-400 float-right">✖</button>
      <div className="space-y-3 max-h-64 overflow-y-auto text-sm mt-4">
        {messages.map((msg, i) => (
          <div key={i} className="whitespace-pre-line">{msg}</div>
        ))}
      </div>
      <LeadForm onSubmit={handleSubmit} />
    </div>
  );
};

export default ChatWindow;
