export default function Footer() {
  return (
    <footer className="border-t border-emerald-100 bg-emerald-50/40 dark:border-emerald-900/30 dark:bg-emerald-950">
      <div className="mx-auto max-w-6xl px-6 py-8 flex flex-col items-center justify-center gap-2 text-center">
        
        {/* Main Brand Text */}
        <div className="text-base font-bold text-emerald-900 dark:text-emerald-200 tracking-wide">
          KrishiDisha — AI Crop Advisor for Farmers
        </div>

        {/* Copyright Text */}
        <div className="text-xs font-medium text-emerald-800/60 dark:text-emerald-400/60">
          &copy; {new Date().getFullYear()} All Rights Reserved.
        </div>

      </div>
    </footer>
  );
}