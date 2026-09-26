import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center text-center px-4">
      <span className="text-5xl font-black text-[#ccff00]">404</span>
      <h1 className="text-2xl font-black uppercase text-white mt-2">Page Not Found</h1>
      <p className="text-slate-400 text-sm mt-1 max-w-sm">
        The lift or route you are looking for does not exist in our library.
      </p>
      <Link
        href="/"
        className="mt-6 px-6 py-2.5 rounded-lg bg-[#ccff00] text-black font-bold text-xs uppercase hover:brightness-110 transition-all"
      >
        Back to Library
      </Link>
    </div>
  );
}