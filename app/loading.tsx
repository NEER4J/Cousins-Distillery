"use client";

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#FEFEF6] flex items-center justify-center px-6">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 border-2 border-zinc-300 border-t-[#D1BB8A] rounded-full animate-spin" />
        <p className="font-body text-[11px] font-bold uppercase tracking-[0.3em] text-zinc-500">
          Loading
        </p>
      </div>
    </div>
  );
}
