import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

export function StatCard({ label, value, delta }: { label: string; value: string; delta?: { value: string; positive: boolean } }) {
  return (
    <div className="bg-white rounded-[16px] border border-[#E2EAE6] p-6">
      <span style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.06em", color: "#8FA69C" }}>
        {label}
      </span>
      <div className="flex items-end gap-3 mt-2">
        <h2 style={{ color: "#0D1F17" }}>{value}</h2>
        {delta && (
          <span className={`flex items-center gap-1 pb-1 ${delta.positive ? "text-[#16A34A]" : "text-[#DC2626]"}`} style={{ fontSize: 14, fontWeight: 500 }}>
            {delta.positive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
            {delta.value}
          </span>
        )}
      </div>
    </div>
  );
}
