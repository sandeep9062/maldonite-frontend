"use client";

import { useState } from "react";
import axios from "axios";

const LeadForm = ({ onSubmit }: { onSubmit: (input: string) => void }) => {
  const [form, setForm] = useState({ name: "", email: "", query: "" });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSend = async () => {
    if (!form.name || !form.email || !form.query) return;
    await axios.post("/api/lead", form);
    onSubmit(form.query);
    setForm({ name: "", email: "", query: "" });
  };

  return (
    <div className="mt-4 space-y-3">
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        className="w-full bg-transparent border-b border-gray-500 p-2 text-white"
        value={form.name}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Your Email"
        className="w-full bg-transparent border-b border-gray-500 p-2 text-white"
        value={form.email}
        onChange={handleChange}
      />
      <textarea
        name="query"
        placeholder="Ask me anything..."
        rows={2}
        className="w-full bg-transparent border border-gray-500 p-2 text-white"
        value={form.query}
        onChange={handleChange}
      />
      <button
        onClick={handleSend}
        className="w-full bg-[#D4AF37] text-black py-2 rounded font-semibold"
      >
        Send
      </button>
    </div>
  );
};

export default LeadForm;
