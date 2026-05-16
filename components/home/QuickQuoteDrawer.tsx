"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

type FormState = "idle" | "submitting" | "success" | "error";

interface FormData {
  name: string;
  email: string;
  whatsapp: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  whatsapp?: string;
}

const validateForm = (data: FormData): FormErrors => {
  const errors: FormErrors = {};
  if (!data.name.trim()) errors.name = "Name is required";
  if (!data.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Invalid email format";
  }
  if (!data.whatsapp.trim()) {
    errors.whatsapp = "WhatsApp number is required";
  } else if (!/^[\d\+\-\s\(\)]{7,15}$/.test(data.whatsapp)) {
    errors.whatsapp = "Enter a valid number";
  }
  return errors;
};

const QuickQuoteDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formState, setFormState] = useState<FormState>("idle");
  const [isMobile, setIsMobile] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    whatsapp: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const nameInputRef = useRef<HTMLInputElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkViewport = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  useEffect(() => {
    if (isOpen && !isMobile) {
      const timer = setTimeout(() => nameInputRef.current?.focus(), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen, isMobile]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) setIsOpen(false);
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("mousedown", handleClickOutside);
      if (isMobile) document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "";
    };
  }, [isOpen, isMobile]);

  const handleBlur = useCallback(
    (field: keyof FormData) => {
      setTouched((prev) => ({ ...prev, [field]: true }));
      const fieldErrors = validateForm(formData);
      if (fieldErrors[field]) {
        setErrors((prev) => ({ ...prev, [field]: fieldErrors[field] }));
      } else {
        setErrors((prev) => {
          const next = { ...prev };
          delete next[field];
          return next;
        });
      }
    },
    [formData],
  );

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const fieldErrors = validateForm({ ...formData, [field]: value });
      if (fieldErrors[field]) {
        setErrors((prev) => ({ ...prev, [field]: fieldErrors[field] }));
      } else {
        setErrors((prev) => {
          const next = { ...prev };
          delete next[field];
          return next;
        });
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const allTouched = { name: true, email: true, whatsapp: true };
    setTouched(allTouched);
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setFormState("submitting");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setFormState("success");
    } catch {
      setFormState("error");
    }
  };

  const handleReset = () => {
    setFormData({ name: "", email: "", whatsapp: "" });
    setErrors({});
    setTouched({});
    setFormState("idle");
    setIsOpen(false);
  };

  const panelVariants = {
    initial: isMobile ? { y: "100%", x: 0 } : { x: "100%", y: 0 },
    animate: { x: 0, y: 0 },
    exit: isMobile ? { y: "100%", x: 0 } : { x: "100%", y: 0 },
  };

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs z-[9998] md:bg-transparent md:backdrop-blur-none pointer-events-auto md:pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Main Structural Layout Box */}
      <div className="fixed bottom-24 right-4 top-auto md:top-1/2 md:-translate-y-1/2 md:bottom-auto md:right-0 z-[9999] flex items-center h-auto">
        {/* Trigger Bubble: Clean vertical badge on desktop, shifts straight above the WhatsApp floating widget on mobile */}
        <button
          onClick={() => setIsOpen(true)}
          title="Get a free project estimate"
          aria-label="Open quick quote form"
          className={`bg-[#14141c] text-[#d4af37] border border-gray-800 shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:bg-[#1a1a26] transition-all duration-300 z-[9999] group cursor-pointer
            ${
              isMobile
                ? "w-12 h-12 rounded-full flex items-center justify-center border-gray-700/70"
                : "py-5 px-2.5 rounded-l-xl border-r-0 hover:text-[#d4af37]/90"
            }
            ${isOpen ? "scale-0 opacity-0 pointer-events-none" : "scale-100 opacity-100"}`}
          style={
            !isMobile
              ? { writingMode: "vertical-rl", textOrientation: "mixed" }
              : {}
          }
        >
          {isMobile ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          ) : (
            <span className="text-[10px] tracking-[0.2em] font-bold uppercase transition-transform group-hover:-translate-y-0.5">
              Quick Quote
            </span>
          )}
        </button>

        {/* Adaptive Drawer Layout Block */}
        <AnimatePresence mode="wait">
          {isOpen && (
            <motion.div
              ref={drawerRef}
              variants={panelVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ type: "spring", damping: 30, stiffness: 220 }}
              className="bg-[#14141c] text-white relative overflow-hidden border-gray-800/80 shadow-[0_-8px_30px_rgba(0,0,0,0.5)] md:shadow-[0_0_40px_rgba(0,0,0,0.5)]
                fixed bottom-0 left-0 right-0 top-auto md:top-1/2 md:-translate-y-1/2 md:bottom-auto md:right-0
                w-full md:w-[19.5rem] 
                max-h-[82vh] md:max-h-none
                overflow-y-auto md:overflow-visible
                rounded-t-[1.75rem] md:rounded-t-none md:rounded-l-[1.75rem] 
                border-t md:border-t-y md:border-l 
                p-5 pb-7 md:pb-5"
              role="dialog"
              aria-modal="true"
            >
              {/* Mobile swipe/close bar element indicator */}
              <div
                className="w-10 h-1 bg-gray-800 rounded-full mx-auto mb-4 md:hidden cursor-pointer"
                onClick={() => setIsOpen(false)}
              />

              {/* Close Button Trigger Action */}
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close drawer"
                className="absolute top-4 right-5 md:right-auto md:left-4.5 text-gray-500 hover:text-white transition-colors duration-200 z-10"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>

              <div className="flex gap-4 relative z-10">
                {/* Desktop Side Branding Accent */}
                <div
                  className="hidden md:block text-[#d4af37]/10 font-extrabold tracking-[0.25em] uppercase text-[10px] self-center select-none"
                  style={{ writingMode: "vertical-rl", rotate: "180deg" }}
                >
                  Quick Quote
                </div>

                {/* Form Elements Container */}
                <div className="flex-1 min-w-0">
                  <div className="mb-4 mt-0.5 text-center md:text-left">
                    <h3 className="text-gray-400 uppercase text-[9px] font-bold tracking-[0.18em]">
                      Free Project Estimate
                    </h3>
                    <div className="h-[1.5px] w-6 bg-[#d4af37] mt-1.5 rounded-full mx-auto md:mx-0" />
                  </div>

                  {/* SUCCESS */}
                  {formState === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center py-5"
                    >
                      <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <h4 className="text-white font-bold text-sm mb-1">
                        Request Received
                      </h4>
                      <p className="text-gray-400 text-[11px] leading-relaxed px-1">
                        We'll analyze your requirements and reach out within 24
                        hours.
                      </p>
                      <button
                        onClick={handleReset}
                        className="mt-4 text-[11px] text-[#d4af37] hover:text-[#d4af37]/80 font-medium underline underline-offset-4 transition-colors"
                      >
                        Submit New Request
                      </button>
                    </motion.div>
                  )}

                  {/* ERROR */}
                  {formState === "error" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-5"
                    >
                      <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="12" y1="8" x2="12" y2="12"></line>
                          <line x1="12" y1="16" x2="12.01" y2="16"></line>
                        </svg>
                      </div>
                      <h4 className="text-red-400 font-bold text-xs mb-1.5">
                        Submission Failed
                      </h4>
                      <button
                        onClick={() => setFormState("idle")}
                        className="text-[11px] bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg px-3 py-1.5 hover:bg-red-500/20 transition-colors"
                      >
                        Retry Form
                      </button>
                    </motion.div>
                  )}

                  {/* FORM FIELDS PIPELINE */}
                  {(formState === "idle" || formState === "submitting") && (
                    <form
                      className="space-y-2.5"
                      onSubmit={handleSubmit}
                      noValidate
                    >
                      {[
                        {
                          id: "name",
                          type: "text",
                          placeholder: "Your name",
                          auto: "name",
                        },
                        {
                          id: "email",
                          type: "email",
                          placeholder: "Work email address",
                          auto: "email",
                        },
                        {
                          id: "whatsapp",
                          type: "tel",
                          placeholder: "Phone / WhatsApp number",
                          auto: "tel",
                        },
                      ].map((input) => {
                        const key = input.id as keyof FormData;
                        const hasError = touched[key] && errors[key];
                        return (
                          <div key={input.id} className="relative">
                            <input
                              ref={input.id === "name" ? nameInputRef : null}
                              type={input.type}
                              placeholder={input.placeholder}
                              value={formData[key]}
                              onChange={(e) =>
                                handleChange(key, e.target.value)
                              }
                              onBlur={() => handleBlur(key)}
                              disabled={formState === "submitting"}
                              autoComplete={input.auto}
                              className={`w-full bg-[#1c1c26]/60 border rounded-lg py-2.5 px-3.5 text-base md:text-xs text-white placeholder-gray-500 font-medium transition-all duration-200 outline-none select-text touch-manipulation ${
                                hasError
                                  ? "border-red-500/50 focus:border-red-500 bg-red-500/[0.01]"
                                  : "border-gray-800/80 focus:border-[#d4af37]/40 focus:bg-[#1c1c26]"
                              }`}
                            />
                            {hasError && (
                              <p className="text-red-400 text-[9px] font-semibold mt-1 pl-0.5 flex items-center gap-1">
                                {errors[key]}
                              </p>
                            )}
                          </div>
                        );
                      })}

                      <button
                        type="submit"
                        disabled={formState === "submitting"}
                        className="w-full bg-[#d4af37] hover:bg-[#d4af37]/90 disabled:bg-[#d4af37]/50 text-[#14141c] font-bold py-2.5 px-4 rounded-lg flex items-center justify-center gap-1.5 mt-3 transition-all text-xs active:scale-[0.99] disabled:cursor-not-allowed touch-manipulation relative overflow-hidden group"
                      >
                        {formState === "submitting" ? (
                          <div className="flex items-center gap-2">
                            <svg
                              className="animate-spin h-3.5 w-3.5 text-[#14141c]"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              />
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                              />
                            </svg>
                            <span>Sending...</span>
                          </div>
                        ) : (
                          <>
                            <span className="tracking-wide">Get Quote</span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="group-hover:translate-x-0.5 transition-transform"
                            >
                              <line x1="5" y1="12" x2="19" y2="12"></line>
                              <polyline points="12 5 19 12 12 19"></polyline>
                            </svg>
                          </>
                        )}
                      </button>
                    </form>
                  )}

                  {/* Anti-spam Microcopy */}
                  {(formState === "idle" || formState === "submitting") && (
                    <p className="text-[9px] text-gray-500 text-center mt-3 tracking-wide font-medium">
                      🔒 Secure connection. Zero spam policy.
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default QuickQuoteDrawer;
