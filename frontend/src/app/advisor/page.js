"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Advisor() {
    const [form, setForm] = useState({
        N: "", P: "", K: "", temperature: "", humidity: "", ph: "", rainfall: "",
    });
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [dark, setDark] = useState(false);

    useEffect(() => {
        document.documentElement.classList.toggle("dark", dark);
    }, [dark]);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async () => {
        setLoading(true); setError(""); setResult(null);
        try {
            const res = await fetch("https://krishi-disha-backend.onrender.com/predict", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    N: parseFloat(form.N), P: parseFloat(form.P), K: parseFloat(form.K),
                    temperature: parseFloat(form.temperature), humidity: parseFloat(form.humidity),
                    ph: parseFloat(form.ph), rainfall: parseFloat(form.rainfall),
                }),
            });
            const data = await res.json();
            setResult(data);
        } catch {
            setError("সার্ভারের সাথে সংযোগ করা যায়নি। ব্যাকএন্ড চালু আছে কিনা দেখুন।");
        }
        setLoading(false);
    };

    // বাংলা লেবেল সহ ইনপুট ফিল্ড
    const fields = [
        { name: "N", label: "নাইট্রোজেন (N)" },
        { name: "P", label: "ফসফরাস (P)" },
        { name: "K", label: "পটাশিয়াম (K)" },
        { name: "temperature", label: "তাপমাত্রা (°C)" },
        { name: "humidity", label: "আর্দ্রতা (%)" },
        { name: "ph", label: "মাটির pH" },
        { name: "rainfall", label: "বৃষ্টিপাত (mm)" },
    ];

    // ইংরেজি ফসলের নাম → বাংলা নাম
    const cropBangla = {
        rice: "ধান",
        maize: "ভুট্টা",
        chickpea: "ছোলা",
        kidneybeans: "রাজমা",
        pigeonpeas: "অড়হর ডাল",
        mothbeans: "মথ ডাল",
        mungbean: "মুগ ডাল",
        blackgram: "মাষকলাই",
        lentil: "মসুর ডাল",
        pomegranate: "ডালিম",
        banana: "কলা",
        mango: "আম",
        grapes: "আঙুর",
        watermelon: "তরমুজ",
        muskmelon: "খরমুজ",
        apple: "আপেল",
        orange: "কমলা",
        papaya: "পেঁপে",
        coconut: "নারকেল",
        cotton: "তুলা",
        jute: "পাট",
        coffee: "কফি",
    };

    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors font-sans">

            <Navbar dark={dark} setDark={setDark} activePage="অ্যাডভাইজর" />

            <main className="flex-1 mx-auto w-full max-w-6xl px-4 sm:px-6 py-10 sm:py-14">

                {/* শিরোনাম */}
                <div className="text-center mb-10">
                    <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
                        ফসল পরামর্শ টুল
                    </h1>
                    <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto font-medium">
                        আপনার মাটি ও আবহাওয়ার তথ্য দিন, এআই মডেল সেরা ফসলটি সুপারিশ করবে।
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-5">

                    {/* ইনপুট ফর্ম */}
                    <div className="md:col-span-3 rounded-3xl border border-slate-100 bg-white p-6 sm:p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <h2 className="mb-5 text-lg font-bold">মাটি ও আবহাওয়ার তথ্য</h2>
                        <div className="grid grid-cols-2 gap-4">
                            {fields.map((f) => (
                                <div key={f.name}>
                                    <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">{f.label}</label>
                                    <input type="number" name={f.name} value={form[f.name]} onChange={handleChange} placeholder="0"
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100 dark:border-slate-700 dark:bg-slate-800 dark:focus:ring-emerald-900/40" />
                                </div>
                            ))}
                        </div>
                        <button onClick={handleSubmit} disabled={loading}
                            className="mt-7 w-full rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-4 py-3.5 font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:from-emerald-700 hover:to-emerald-600 active:scale-[0.99] disabled:opacity-60">
                            {loading ? "বিশ্লেষণ করা হচ্ছে..." : "ফসল সুপারিশ করুন"}
                        </button>
                        {error && <p className="mt-3 text-sm text-red-500">{error}</p>}
                    </div>

                    {/* ফলাফল */}
                    <div className="md:col-span-2 flex items-center justify-center rounded-3xl bg-gradient-to-br from-emerald-600 to-emerald-900 p-8 text-white shadow-xl">
                        {result ? (
                            <div className="text-center">
                                <p className="text-xs uppercase tracking-widest text-emerald-200">সুপারিশকৃত ফসল</p>
                                <p className="mt-3 text-4xl sm:text-5xl font-black">{cropBangla[result.recommended_crop] || result.recommended_crop}</p>
                                <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/15 px-5 py-2 text-sm font-medium backdrop-blur">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                    নিশ্চয়তা: {result.confidence}%
                                </div>
                            </div>
                        ) : (
                            <div className="text-center text-emerald-100">
                                <svg width="56" height="56" viewBox="0 0 24 24" fill="none" className="mx-auto mb-4 opacity-50">
                                    <path d="M4 20V10M10 20V4M16 20v-7M20 20H3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <p className="text-sm text-emerald-200">আপনার ফসলের সুপারিশ<br />এখানে দেখা যাবে</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}