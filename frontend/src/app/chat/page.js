"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Chat() {
  const [dark, setDark] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "ai", text: data.text || "দুঃখিত, কোনো উত্তর পাওয়া যায়নি।" }]);
    } catch {
      setMessages((prev) => [...prev, { role: "ai", text: "দুঃখিত, সংযোগে সমস্যা হয়েছে।" }]);
    }
    setLoading(false);
  };

  // Gemini-র Markdown উত্তরকে সুন্দর করে দেখানোর জন্য
  const formatText = (text) => {
    // **bold** কে আলাদা করা, তারা চিহ্ন সরানো
    const lines = text.split("\n").filter((l) => l.trim() !== "");
    return lines.map((line, idx) => {
      // **text** বোল্ড করা
      const parts = line.split(/(\*\*.*?\*\*)/g).map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={i}>{part.slice(2, -2)}</strong>;
        }
        return part;
      });
      // শুরুর * বা সংখ্যা থাকলে bullet হিসেবে
      const isBullet = /^\s*[\*\-]/.test(line);
      const cleanParts = isBullet
        ? [<span key="b" className="text-emerald-600 mr-1">•</span>, ...line.replace(/^\s*[\*\-]\s*/, "").split(/(\*\*.*?\*\*)/g).map((part, i) =>
            part.startsWith("**") && part.endsWith("**") ? <strong key={i}>{part.slice(2, -2)}</strong> : part
          )]
        : parts;
      return (
        <p key={idx} className={isBullet ? "pl-2 mb-1.5" : "mb-2"}>
          {cleanParts}
        </p>
      );
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors font-sans">
      <Navbar dark={dark} setDark={setDark} activePage="এআই চ্যাট" />

      <main className="flex-1 mx-auto w-full max-w-3xl px-4 sm:px-6 py-6 sm:py-8 flex flex-col">
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">কৃষি বিশেষজ্ঞ চ্যাট</h1>
          <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400 font-medium">
            চাষ, ফসল, রোগবালাই — যেকোনো কৃষি প্রশ্ন বাংলায় জিজ্ঞাসা করুন
          </p>
        </div>

        {/* চ্যাট উইন্ডো */}
        <div className="flex-1 rounded-3xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 p-4 sm:p-6 min-h-[400px] flex flex-col gap-4 overflow-y-auto shadow-sm">
          {messages.length === 0 && (
            <div className="m-auto text-center text-slate-400 dark:text-slate-500">
              <p className="text-sm font-semibold">যেমন: "ধান চাষের সঠিক সময় কখন?"</p>
            </div>
          )}

          {messages.map((msg, i) => (
            <div key={i} className={msg.role === "user" ? "flex justify-end" : "flex justify-start"}>
              <div className={msg.role === "user"
                ? "max-w-[85%] sm:max-w-[80%] rounded-2xl rounded-br-none bg-gradient-to-r from-emerald-600 to-emerald-500 px-4 py-2.5 text-sm font-medium text-white shadow-md"
                : "max-w-[90%] sm:max-w-[85%] rounded-2xl rounded-bl-none bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-3 text-sm leading-relaxed text-slate-800 dark:text-slate-100 shadow-sm"
              }>
                {msg.role === "ai" ? formatText(msg.text) : msg.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="rounded-2xl rounded-bl-none bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-2.5 text-sm font-semibold text-slate-500 dark:text-slate-400 animate-pulse">
                উত্তর লেখা হচ্ছে...
              </div>
            </div>
          )}
        </div>

        {/* ইনপুট এরিয়া */}
        <div className="mt-4 flex gap-2 sm:gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="আপনার প্রশ্ন লিখুন..."
            className="flex-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-sm font-medium text-slate-900 dark:text-slate-100 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 dark:focus:ring-emerald-900/30"
          />
          <button
            onClick={sendMessage}
            disabled={loading}
            className="rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 px-5 sm:px-6 py-3 font-bold text-white shadow-md transition active:scale-[0.98] disabled:opacity-60 text-sm sm:text-base whitespace-nowrap"
          >
            পাঠান
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}