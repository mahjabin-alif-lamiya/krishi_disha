"use client";

import ThemeToggle from "./ThemeToggle";

export default function Navbar({ dark, setDark, activePage = "হোম" }) {
  const links = ["হোম", "অ্যাডভাইজর", "এআই চ্যাট"];

  // প্রতিটি লিংক কোন পেজে যাবে
  const hrefs = {
    "হোম": "/",
    "অ্যাডভাইজর": "/advisor",
    "এআই চ্যাট": "/chat",
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-100 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">

        {/* লোগো + ট্যাগলাইন */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-white">
              <path d="M12 21V9m0 0c-1.5-2-4-2.5-6-2 0 3 2 4.5 6 4.5m0-2.5c1.5-2 4-2.5 6-2 0 3-2 4.5-6 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">KrishiDisha</span>
            <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400">AI Crop Advisor for Farmers</span>
          </div>
        </div>

        {/* নেভিগেশন লিংক */}
        <div className="hidden items-center gap-1 rounded-full bg-slate-100 p-1 md:flex dark:bg-slate-900">
          {links.map((link) => (
            <a key={link} href={hrefs[link]} className={link === activePage ? "rounded-full bg-emerald-600 px-5 py-2 text-sm font-semibold text-white" : "rounded-full px-5 py-2 text-sm font-medium text-slate-600 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"}>
              {link}
            </a>
          ))}
        </div>

        {/* থিম টগল */}
        <ThemeToggle dark={dark} setDark={setDark} />
      </div>
    </nav>
  );
}