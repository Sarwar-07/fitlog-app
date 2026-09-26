export default function Footer() {
  return (
    <footer className="bg-[#090a0f] border-t border-slate-900 py-6 mt-20 text-xs text-slate-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 font-bold text-slate-300">
          <span className="text-[#ccff00]">●</span> FITLOG
        </div>
        <p>© 2026 FitLog — Workout Library. Train hard, log honest.</p>
      </div>
    </footer>
  );
}