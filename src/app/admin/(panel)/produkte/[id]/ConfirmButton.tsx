"use client";

export function ConfirmButton({ message, children }: { message: string; children: React.ReactNode }) {
  return (
    <button
      className="btn border-danger text-danger hover:bg-danger hover:text-paper"
      onClick={(e) => {
        if (!confirm(message)) e.preventDefault();
      }}
    >
      {children}
    </button>
  );
}
