"use client";

import { useEffect, useState } from "react";

import { X } from "lucide-react";
import toast from "react-hot-toast"; // ✅ Use react-hot-toast for professional alerts
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useAddContactMutation } from "@/services/contactApi"; // ✅ Import the API hook

export default function PopupFormModal() {
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const [addContact, { isLoading }] = useAddContactMutation();

  useEffect(() => {
    const hasShown = localStorage.getItem("popupShown");
    if (!hasShown) {
      const timer = setTimeout(() => {
        setShow(true);
        localStorage.setItem("popupShown", "true");
      }, 3000); // delay
      return () => clearTimeout(timer);
    }
  }, []);

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
      const payload = {
        ...form,
      };

      await addContact(payload).unwrap();

      toast.success("Message sent successfully!");
      setSubmitted(true);
      setTimeout(() => setShow(false), 2000); // ✅ Hide modal after 2 seconds
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong!");
    }
  };

  const handleClose = () => {
    setShow(false);
    setSubmitted(false);
    setForm({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-[#1e1e1f] text-white rounded-xl shadow-2xl p-4 sm:p-8 mx-2 sm:mx-0">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 sm:top-4 sm:right-4 text-white hover:text-gray-400 transition p-1"
          onClick={handleClose}
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {submitted ? (
          <div className="mt-4 sm:mt-6 text-center text-white p-3 sm:p-4 rounded-md">
            <h2 className="text-xl sm:text-2xl font-bold mb-2">Thank you!</h2>
            <p className="text-sm sm:text-base">
              Your message has been sent successfully.
            </p>
          </div>
        ) : (
          <div>
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center text-gold">
              Request a Free Quote
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              {/* Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="bg-transparent border-b border-gray-400 py-1.5 sm:py-2 px-1 placeholder:text-gray-300 focus:outline-none focus:border-gold transition text-sm sm:text-base"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="bg-transparent border-b border-gray-400 py-1.5 sm:py-2 px-1 placeholder:text-gray-300 focus:outline-none focus:border-gold transition text-sm sm:text-base"
                />
              </div>

              {/* Phone & Subject */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <PhoneInput
                    country={"in"}
                    value={form.phone}
                    onChange={handlePhoneChange}
                    inputStyle={{
                      width: "100%",
                      backgroundColor: "transparent",
                      border: "none",
                      borderBottom: "1px solid #9ca3af",
                      borderRadius: "0",
                      paddingLeft: "42px",
                      color: "white",
                      fontSize: "14px",
                    }}
                    containerStyle={{
                      width: "100%",
                    }}
                    buttonStyle={{
                      backgroundColor: "transparent",
                      border: "none",
                      borderBottom: "1px solid #9ca3af",
                      borderRadius: "0",
                    }}
                    dropdownStyle={{
                      backgroundColor: "#1e1e1f",
                      color: "white",
                    }}
                  />
                </div>
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={form.subject}
                  onChange={handleChange}
                  required
                  className="bg-transparent border-b border-gray-400 py-1.5 sm:py-2 px-1 placeholder:text-gray-300 focus:outline-none focus:border-gold transition text-sm sm:text-base"
                />
              </div>

              {/* Message */}
              <textarea
                name="message"
                placeholder="Message"
                value={form.message}
                onChange={handleChange}
                required
                rows={3}
                className="w-full bg-transparent border-b border-gray-400 py-1.5 sm:py-2 px-1 placeholder:text-gray-300 focus:outline-none focus:border-gold transition text-sm sm:text-base"
              />

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-4 sm:mt-6 bg-gold text-black py-2.5 sm:py-3 font-semibold rounded hover:bg-yellow-500 transition disabled:opacity-50 text-sm sm:text-base"
              >
                {isLoading ? "Sending..." : "Request a Free Quote"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
