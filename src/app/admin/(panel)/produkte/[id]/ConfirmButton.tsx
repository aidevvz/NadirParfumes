"use client";

export function ConfirmButton({ message, children }: { message: string; children: React.ReactNode }) {
  return (
    <button
      className="btn border-[#a12a2a] text-[#a12a2a] hover:bg-[#a12a2a] hover:text-paper"
      onClick={(e) => {
        if (!confirm(message)) e.preventDefault();
      }}
    >
      {children}
    </button>
  );
}
