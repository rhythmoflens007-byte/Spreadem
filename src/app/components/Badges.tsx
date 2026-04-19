import React from "react";

type BadgeVariant = "pending" | "escrow" | "live" | "completed" | "rejected" | "paidout";

const variantStyles: Record<BadgeVariant, { bg: string; text: string; border: string; label: string }> = {
  pending:   { bg: "#FFFBEB", text: "#B45309", border: "#FDE68A", label: "Pending Review" },
  escrow:    { bg: "#EFF6FF", text: "#1D4ED8", border: "#BFDBFE", label: "Budget Secured" },
  live:      { bg: "#F0FDF4", text: "#15803D", border: "#BBF7D0", label: "Live" },
  completed: { bg: "#F5F3FF", text: "#6D28D9", border: "#DDD6FE", label: "Completed" },
  rejected:  { bg: "#FEF2F2", text: "#B91C1C", border: "#FECACA", label: "Rejected" },
  paidout:   { bg: "#F5F3FF", text: "#6D28D9", border: "#DDD6FE", label: "Paid Out" },
};

export function StatusBadge({ variant, label }: { variant: BadgeVariant; label?: string }) {
  const s = variantStyles[variant];
  return (
    <span
      style={{ backgroundColor: s.bg, color: s.text, borderColor: s.border }}
      className="inline-flex items-center border px-3 py-1.5 rounded-full"
    >
      <span style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 500, letterSpacing: "0.02em" }}>
        {label || s.label}
      </span>
    </span>
  );
}
