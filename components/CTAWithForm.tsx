"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from "react-google-recaptcha-v3";
import { useEffect } from "react";

import { useAddContactMutation } from "@/services/contactApi";

const ContactForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const [isRecaptchaReady, setIsRecaptchaReady] = useState(false);

  const [addContact, { isLoading }] = useAddContactMutation();
  const { executeRecaptcha } = useGoogleReCaptcha();

  // Check if reCAPTCHA is ready
  useEffect(() => {
    if (executeRecaptcha) {
      setIsRecaptchaReady(true);
      console.log("reCAPTCHA is ready");
    } else {
      setIsRecaptchaReady(false);
      console.log("reCAPTCHA is not ready yet");
    }
  }, [executeRecaptcha]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePhoneChange = (phone: string) => {
    setForm({ ...form, phone });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // ✅ Get reCAPTCHA token
      if (!executeRecaptcha) {
        toast.error("reCAPTCHA is not ready yet. Please try again.");
        return;
      }

      console.log("Generating reCAPTCHA token...");
      const token = await executeRecaptcha("submit_contact_form");
      console.log("reCAPTCHA token generated:", token);

      if (!token) {
        toast.error("Failed to generate reCAPTCHA token. Please try again.");
        return;
      }

      setRecaptchaToken(token);

      // ✅ Send JSON with reCAPTCHA token
      const payload = {
        ...form,
        recaptchaToken: token,
      };

      console.log("Sending contact form with payload:", payload);

      await addContact(payload).unwrap();

      toast.success("Message sent successfully!");
      setSubmitted(true);
      setForm({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Contact form submission error:", error);
      const err = error as { data?: { message?: string } };
      toast.error(err.data?.message || "Something went wrong!");
    }
  };

  return (
    <section className="relative py-16 bg-[var(--color-gold)] text-center text-black dark:text-black">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto px-4"
      >
        <h2 className="text-2xl md:text-4xl font-semibold">
          Let’s Build Something Golden
        </h2>
        <p className="mt-2 text-gray-800">
          Have a project idea? Contact us to start your custom project today.
        </p>

        <AnimatePresence>
          {submitted ? (
            <motion.div
              key="thanks"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-6 text-navy bg-white p-4 rounded-md shadow-md"
            >
              Thank you! Your message has been sent.
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="mt-8 space-y-4 text-left"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  className="w-full px-4 py-3 rounded-md bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black"
                />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  required
                  className="w-full px-4 py-3 rounded-md bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <PhoneInput
                    country={"in"}
                    value={form.phone}
                    onChange={handlePhoneChange}
                    inputStyle={{
                      width: "100%",
                      height: "48px",
                      border: "1px solid #000",
                      borderRadius: "6px",
                      paddingLeft: "48px",
                      backgroundColor: "white",
                      color: "black",
                    }}
                    containerStyle={{
                      width: "100%",
                    }}
                    buttonStyle={{
                      border: "1px solid #000",
                      borderRight: "none",
                    }}
                  />
                </div>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Subject"
                  required
                  className="w-full px-4 py-3 rounded-md bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Your Message"
                required
                rows={4}
                className="w-full px-4 py-3 rounded-md bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black"
              ></textarea>

              <div className="flex justify-center">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={isLoading}
                  className="bg-darkbg1 text-white px-6 py-3 rounded hover:bg-darkbg2 transition disabled:opacity-50"
                >
                  {isLoading ? "Sending..." : "Send Message"}
                </motion.button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

const CTAWithForm = () => {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  // If site key is not available, don't render the form to avoid errors
  if (!siteKey) {
    console.error(
      "reCAPTCHA site key is missing. Please check your environment variables.",
    );
    return (
      <section className="relative py-16 bg-[var(--color-gold)] text-center text-black dark:text-black">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-semibold">
            Contact Form Temporarily Unavailable
          </h2>
          <p className="mt-2 text-gray-800">
            We're experiencing technical issues with our contact form. Please
            try again later or contact us directly.
          </p>
        </div>
      </section>
    );
  }

  return (
    <GoogleReCaptchaProvider reCaptchaKey={siteKey}>
      <ContactForm />
    </GoogleReCaptchaProvider>
  );
};

export default CTAWithForm;
