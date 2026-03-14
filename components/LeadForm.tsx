"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from "react-google-recaptcha-v3";

const LeadFormContent = ({
  onSubmit,
}: {
  onSubmit: (input: string) => void;
}) => {
  const [form, setForm] = useState({ name: "", email: "", query: "" });
  const [isLoading, setIsLoading] = useState(false);

  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSend = async () => {
    if (!form.name || !form.email || !form.query) return;

    setIsLoading(true);

    try {
      // Get reCAPTCHA token
      if (!executeRecaptcha) {
        alert("reCAPTCHA is not ready yet. Please try again.");
        setIsLoading(false);
        return;
      }

      const token = await executeRecaptcha("submit_lead_form");

      // Send form data with reCAPTCHA token
      const payload = {
        ...form,
        recaptchaToken: token,
      };

      await axios.post("/api/lead", payload);
      onSubmit(form.query);
      setForm({ name: "", email: "", query: "" });
    } catch (error) {
      console.error("Lead form submission error:", error);
      alert("An error occurred while submitting the form. Please try again.");
    } finally {
      setIsLoading(false);
    }
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
        disabled={isLoading}
        className="w-full bg-[#D4AF37] text-black py-2 rounded font-semibold disabled:opacity-50"
      >
        {isLoading ? "Sending..." : "Send"}
      </button>
    </div>
  );
};

const LeadForm = ({ onSubmit }: { onSubmit: (input: string) => void }) => {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  // If site key is not available, don't render the form to avoid errors
  if (!siteKey) {
    console.error(
      "reCAPTCHA site key is missing. Please check your environment variables.",
    );
    return (
      <div className="mt-4 space-y-3">
        <p className="text-white">
          Lead form temporarily unavailable due to technical issues.
        </p>
      </div>
    );
  }

  return (
    <GoogleReCaptchaProvider reCaptchaKey={siteKey}>
      <LeadFormContent onSubmit={onSubmit} />
    </GoogleReCaptchaProvider>
  );
};

export default LeadForm;
