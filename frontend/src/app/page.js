"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors font-sans">

      <Navbar dark={dark} setDark={setDark} activePage="হোম" />

      <main className="flex-1 flex flex-col items-center justify-center mx-auto max-w-4xl px-4 sm:px-6 py-10 sm:py-16 text-center">

        {/* ছোট সবুজ ব্যাজ */}
        <span className="inline-flex items-center rounded-full bg-emerald-100 dark:bg-emerald-900/60 border border-emerald-200 dark:border-emerald-800 px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-bold text-emerald-800 dark:text-emerald-300 shadow-sm">
          কৃষি ও বিজ্ঞানভিত্তিক ফসল পরামর্শ
        </span>

        {/* প্রধান শিরোনাম */}
        <h1 className="mt-6 text-3xl sm:text-5xl md:text-6xl font-black tracking-normal leading-tight text-slate-900 dark:text-white px-2">
          আপনার জমির জন্য সঠিক ফসল <br />
          <span className="bg-gradient-to-r from-emerald-600 to-lime-500 bg-clip-text text-transparent">
            বেছে নিন সহজে
          </span>
        </h1>

        {/* উপ-শিরোনাম */}
        <p className="mt-6 max-w-2xl text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-medium px-4">
          জমিতে অনুমান করে ফসল লাগিয়ে লস করার দিন শেষ। আপনার মাটির পুষ্টিগুণ এবং এলাকার আবহাওয়ার তথ্য দিয়ে জেনে নিন কোন ফসল চাষ করলে সবচেয়ে ভালো ফলন পাবেন।
        </p>

        {/* অ্যাকশন বাটনসমূহ */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4 justify-center w-full px-6 sm:px-0 sm:w-auto">
          <a href="/advisor" className="w-full sm:w-auto rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 px-8 py-4 sm:px-10 sm:py-5 font-bold text-white shadow-lg shadow-emerald-600/20 transition-all active:scale-[0.98] text-base sm:text-lg text-center">
            ফসল পরামর্শ টুল চালু করুন
          </a>
          <a href="/chat" className="w-full sm:w-auto rounded-2xl border-2 border-emerald-600/30 hover:border-emerald-600 bg-white dark:bg-emerald-900/30 px-8 py-4 sm:px-10 sm:py-5 font-bold text-emerald-700 dark:text-emerald-300 transition-all text-base sm:text-lg text-center shadow-sm">
            কৃষি বিশেষজ্ঞ চ্যাট (AI)
          </a>
        </div>

        {/* তিন ধাপের কার্ড */}
        <div className="mt-16 sm:mt-24 w-full px-4 sm:px-0">
          <h2 className="text-lg sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 mb-3 text-center">
            সহজে সঠিক ফসল জানার ৩টি ধাপ
          </h2>
          <p className="text-center text-sm sm:text-base text-slate-600 dark:text-slate-400 font-medium mb-6 sm:mb-10">
            <a href="/advisor" className="text-emerald-600 dark:text-emerald-400 font-bold underline underline-offset-2 hover:text-emerald-700">
              ফসল পরামর্শ টুল চালু
            </a>{" "}
            করে নিচের ৩টি ধাপে সহজেই সঠিক ফসল জেনে নিন
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">

            {/* কার্ড ১ */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm transition-transform hover:-translate-y-1">
              <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center font-black text-emerald-800 dark:text-emerald-300 text-base sm:text-lg mb-4">
                ১
              </div>
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base sm:text-lg">মাটির তথ্য দিন</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 font-medium leading-relaxed">
                আপনার জমির মাটির নাইট্রোজেন (N), ফসফরাস (P) ও পটাশিয়ামের (K) সঠিক পরিমাণ ইনপুট দিন।
              </p>
            </div>

            {/* কার্ড ২ */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm transition-transform hover:-translate-y-1">
              <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center font-black text-emerald-800 dark:text-emerald-300 text-base sm:text-lg mb-4">
                ২
              </div>
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base sm:text-lg">আবহাওয়ার তথ্য</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 font-medium leading-relaxed">
                আপনার এলাকার বর্তমান তাপমাত্রা, বাতাসের আর্দ্রতা এবং বৃষ্টিপাতের সঠিক পরিমাণ যুক্ত করুন।
              </p>
            </div>

            {/* কার্ড ৩ */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm transition-transform hover:-translate-y-1">
              <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center font-black text-emerald-800 dark:text-emerald-300 text-base sm:text-lg mb-4">
                ৩
              </div>
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base sm:text-lg">এআই ফলাফল দেখুন</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 font-medium leading-relaxed">
                আমাদের উন্নত মেশিন লার্নিং মডেল মুহূর্তেই হিসাব করে শতকরা নিশ্চয়তাসহ সেরা ফসলটির নাম জানিয়ে দেবে।
              </p>
            </div>

          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}