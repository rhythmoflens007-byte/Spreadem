import React from "react";

export function PendingReviewAnnotation() {
  return (
    <div
      className="fixed top-20 right-4 z-40 max-w-[280px] p-4 rounded-[12px] border-2 border-[#DC2626] bg-[#FEF2F2] shadow-lg"
      style={{ fontFamily: "var(--font-body)" }}
    >
      <p style={{ fontSize: 12, fontWeight: 600, color: "#DC2626", textTransform: "uppercase", letterSpacing: "0.04em" }}>
        PENDING NAVIGATION REVIEW
      </p>
      <p className="mt-2" style={{ fontSize: 12, color: "#4A6358", lineHeight: 1.5 }}>
        This screen has not been fully audited for route conflicts, dead buttons, or hardcoded IDs.
        Do not finalise prototype connections until reviewed.
        Block sprint sign-off.
      </p>
    </div>
  );
}
