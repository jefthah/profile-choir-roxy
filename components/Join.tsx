"use client";
import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import { SparklesCore } from "@/components/ui/sparkles";

const Join: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [showForm, setShowForm] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false); // State alert sukses
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    reason: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!, // Service ID dari .env
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!, // Template ID dari .env
        {
          from_name: formData.name,
          message: formData.reason,
          phone: formData.phone,
          to_name: "Jefta",
          reply_to: formData.email,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY! // Public Key dari .env
      )
      .then(() => {
        setShowSuccessAlert(true); // Menampilkan alert sukses
        setFormData({ name: "", email: "", phone: "", reason: "" });
      })
      .catch((error) => {
        console.error("Failed to send email:", error);
        alert("Failed to send message. Please try again.");
      });
  };

  return (
    <motion.section
      id="join"
      ref={sectionRef}
      className="w-full min-h-screen bg-black text-white flex items-center justify-center px-4 relative"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Sparkles Effect */}
      <SparklesCore
        background="transparent"
        minSize={0.5}
        maxSize={1.5}
        particleDensity={80}
        className="absolute inset-0 w-full h-full z-0 pointer-events-none"
        particleColor="#FFFFFF"
      />

      {/* Alert Success */}
      {showSuccessAlert && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold text-green-600 mb-2">Success!</h2>
            <p className="text-gray-700 mb-4">
              Kami akan segera menghubungimu.
            </p>
            <button
              onClick={() => setShowSuccessAlert(false)}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none transition duration-300"
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* Kontainer Utama */}
      <div className="relative z-10 w-full max-w-6xl">
        <AnimatePresence mode="wait">
          {!showForm ? (
            <motion.div
              key="intro"
              className="text-center space-y-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8, y: -50 }}
              transition={{ duration: 0.5 }}
            >
              <motion.h1
                className="text-5xl md:text-6xl font-bold leading-tight"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                Want to join in serving?
              </motion.h1>
              <motion.p
                className="text-lg md:text-xl text-gray-300 leading-relaxed"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Become part of our family in serving God with your talents.
                <br />
                Let’s grow together!
              </motion.p>
              <motion.button
                className="inline-block mt-4 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-lg font-semibold transition duration-300"
                whileHover={{ scale: 1.05 }}
                onClick={() => setShowForm(true)}
              >
                Join Us
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              className="flex flex-col md:flex-row items-center justify-center gap-12"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.5 }}
            >
              {/* Teks Serve with Excellence */}
              <motion.div
                className="md:w-1/2 flex flex-col items-start justify-center text-left"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-4xl font-bold leading-tight">
                  Serve with Excellence
                </h2>
                <p className="text-lg text-gray-300 mt-4 leading-relaxed">
                  Let&apos;s grow and serve together to bring out the best in
                  our talents!
                </p>
              </motion.div>

              {/* Form Join Us */}
              <motion.div
                className="md:w-1/2 relative p-8 rounded-[20px] border border-[#18212F] hover:border-purple-500 hover:shadow-[0_0_15px_4px_rgba(128,90,213,0.6)]"
                style={{
                  background: "rgba(0, 0, 0, 0.3)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <h2 className="text-3xl font-bold mb-6 text-center text-white">
                  Join Us
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Input Fields */}
                  <div>
                    <label className="block text-white mb-2">Name</label>
                    <input
                      type="text"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-transparent border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-white mb-2">Email</label>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-transparent border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-white mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-transparent border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-white mb-2">
                      Reason to Join
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Why do you want to join?"
                      value={formData.reason}
                      onChange={(e) =>
                        setFormData({ ...formData, reason: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-transparent border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-lg font-semibold transition duration-300"
                  >
                    Submit
                  </button>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
};

export default Join;
