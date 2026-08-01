"use client";

export default function ThemeToggle({ dark, setDark }) {
    return (
        <button
            onClick={() => setDark(!dark)}
            className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100 border-2 border-emerald-300/80 text-emerald-700 shadow-md transition-all hover:scale-105 hover:shadow-emerald-500/20 active:scale-95 dark:from-emerald-900 dark:to-emerald-800 dark:border-emerald-600 dark:text-emerald-300"
            aria-label="Toggle theme"
        >
            {dark ? (
                // Sun Icon
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="animate-spin-slow">
                    <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" />
                    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
            ) : (
                // Moon Icon
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="currentColor" className="text-emerald-600" />
                </svg>
            )}
        </button>
    );
}