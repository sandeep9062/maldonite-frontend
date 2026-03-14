"use client";

import { useState, useEffect, useRef, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useSendMessageToMaldoMutation } from "@/services/maldoApi";
import { v4 as uuidv4 } from "uuid";

interface Message {
  sender: "user" | "bot";
  text: string;
}

export default function MaldoChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [confirmEnd, setConfirmEnd] = useState(false);
  const [showAssistant, setShowAssistant] = useState(false);

  const [sendMessage, { isLoading }] = useSendMessageToMaldoMutation();
  const chatBodyRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // ✅ Set session ID on initial load
  useEffect(() => {
    if (!sessionId) {
      const newSessionId = localStorage.getItem("maldo_session_id") || uuidv4();
      localStorage.setItem("maldo_session_id", newSessionId);
      setSessionId(newSessionId);
    }
  }, [sessionId]);

  // ✅ Scroll to bottom when new messages are added
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  // ✅ Handle sending messages
  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const response = await sendMessage({ sessionId, message: input }).unwrap();
      const botMessage: Message = { sender: "bot", text: response.reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        sender: "bot",
        text: "Sorry, something went wrong. Please try again.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  // ✅ Toggle chatbox and confirmation
  const toggleChat = () => {
    if (isOpen && !confirmEnd) {
      setConfirmEnd(true);
    } else {
      setConfirmEnd(false);
      setIsOpen(!isOpen);
    }
  };

  // ✅ Reset chat state
  const resetChat = () => {
    setMessages([]);
    const newSessionId = uuidv4();
    localStorage.setItem("maldo_session_id", newSessionId);
    setSessionId(newSessionId);
    setIsOpen(false);
    setConfirmEnd(false);
  };

  // Loop assistant every 10s, show for 2s
  useEffect(() => {
    const startLoop = () => {
      intervalRef.current = setInterval(() => {
        setShowAssistant(true);
        setTimeout(() => setShowAssistant(false), 2000);
      }, 10000);
    };

    if (!isOpen) {
      setShowAssistant(false);
      startLoop();
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isOpen]);

  return (
    <div className="fixed bottom-4 right-5 z-50">
      {/* Animated Assistant Appearing from Bottom */}
      <AnimatePresence>
        {showAssistant && !isOpen && (
          <motion.div
            key="assistant"
            initial={{ y: 5, opacity: 0 }}
            animate={{ y: -50, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute bottom-[10px] right-10 pointer-events-none"
          >
            <motion.div
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                repeat: Infinity,
                repeatType: "loop",
                duration: 1.2,
              }}
            >
              <Image
                src="/maldo-hello.gif"
                alt="Maldo Assistant"
                width={80}
                height={80}
                className="rounded-full drop-shadow-xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ask a Question Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-white dark:bg-gray-800 dark:text-white text-black font-medium px-4 py-2 rounded-full shadow-md flex items-center gap-2 border dark:border-gray-700 hover:shadow-lg transition-all duration-200 relative z-10"
        >
          <span>💬</span> Ask a Question
        </button>
      )}

      {/* Chatbox */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chatbox"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 60 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-900 w-[360px] sm:w-[380px] h-[500px] rounded-xl shadow-2xl p-4 flex flex-col justify-between text-black dark:text-white border dark:border-gray-700 relative z-20"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-semibold text-lg">Maldo Assistant</h2>
              <button
                onClick={toggleChat}
                className="text-xl font-bold hover:text-red-500 transition"
                aria-label="Close chat"
              >
                ✖️
              </button>
            </div>

            {/* Chat Body */}
            <div
              ref={chatBodyRef}
              className="flex-1 overflow-y-auto px-1 space-y-4"
            >
              {/* Initial Message */}
              <div className="flex items-start gap-3">
                <Image
                  src="/maldo-hello.gif"
                  alt="Maldo"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-xl shadow text-sm">
                  Hi there! I&apos;m <strong>Maldo</strong>. How can I help you
                  today?
                </div>
              </div>

              {/* Render Messages */}
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-3 ${
                    msg.sender === "user" ? "justify-end" : ""
                  }`}
                >
                  {msg.sender === "bot" && (
                    <Image
                      src="/maldo-hello.gif"
                      alt="Maldo"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  )}
                  <div
                    className={`p-3 rounded-xl shadow text-sm ${
                      msg.sender === "user"
                        ? "bg-gold dark:bg-gold/80 text-black"
                        : "bg-gray-100 dark:bg-gray-800"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex items-start gap-3">
                  <Image
                    src="/maldo-hello.gif"
                    alt="Maldo"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-xl shadow text-sm">
                    Typing...
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={handleSendMessage}
              className="pt-2 border-t dark:border-gray-700"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="w-full border dark:border-gray-600 rounded-full px-4 py-2 text-sm bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:focus:ring-yellow-600"
                disabled={isLoading}
              />
            </form>

            {/* End Chat Confirmation */}
            {confirmEnd && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                className="absolute bottom-24 left-4 right-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-4 text-center shadow-md"
              >
                <p className="font-medium mb-2">End chat session?</p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={resetChat}
                    className="px-4 py-1 bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200 rounded hover:bg-red-200 dark:hover:bg-red-800 transition"
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setConfirmEnd(false)}
                    className="px-4 py-1 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                  >
                    No
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
