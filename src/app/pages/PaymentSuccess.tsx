import { motion } from "motion/react";
import { Link } from "react-router";
import { Button } from "../components/Buttons";
import { StatusBadge } from "../components/Badges";
import { ArrowRight } from "lucide-react";

const labelStyle: React.CSSProperties = {
  fontFamily: "var(--font-body)",
  fontSize: 12,
  fontWeight: 500,
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  color: "#8FA69C",
};

const valStyle: React.CSSProperties = {
  fontFamily: "var(--font-body)",
  fontSize: 15,
  fontWeight: 500,
  color: "#0D1F17",
};

/* Mock data — [BE:API] GET /api/payments/{id} */
const payment = {
  campaign: "Summer Glow Reels",
  campaignId: "1",
  amount: 150000,
  method: "Razorpay (UPI)",
  txnId: "pay_Ox7k2mNpQrS9aB",
};

function formatINR(n: number) {
  return "₹" + n.toLocaleString("en-IN");
}

/* Animated checkmark: stroke-dasharray reveal */
function AnimatedCheck() {
  return (
    <div className="flex justify-center mb-8">
      <div className="w-20 h-20 rounded-full bg-[#F0FDF4] flex items-center justify-center">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="18" stroke="#16A34A" strokeWidth="2.5" opacity="0.3" />
          <motion.circle
            cx="20"
            cy="20"
            r="18"
            stroke="#16A34A"
            strokeWidth="2.5"
            strokeDasharray="113"
            strokeDashoffset={113}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
          <motion.path
            d="M13 21L18 26L28 15"
            stroke="#16A34A"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="24"
            strokeDashoffset={24}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.35 }}
          />
        </svg>
      </div>
    </div>
  );
}

export function PaymentSuccess() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="min-h-screen flex items-center justify-center px-6 bg-[#F8FAF9]"
    >
      <div className="max-w-[560px] w-full bg-white rounded-[16px] border border-[#E2EAE6] p-10 md:p-12 text-center">
        <AnimatedCheck />

        <h2 style={{ color: "#0D1F17" }}>
          Your {formatINR(payment.amount)} is secured as your performance budget.
        </h2>
        <p
          className="mt-4"
          style={{ fontFamily: "var(--font-body)", fontSize: 16, color: "#4A6358", lineHeight: 1.7 }}
        >
          Funds have been secured. Creators will be paid based on verified performance once the campaign ends.
        </p>

        {/* Summary card */}
        <div className="mt-8 bg-white rounded-[16px] border border-[#E2EAE6] text-left">
          {[
            { label: "Campaign", value: payment.campaign },
            { label: "Amount", value: formatINR(payment.amount) },
            { label: "Payment Method", value: payment.method },
            { label: "Transaction ID", value: payment.txnId, mono: true },
          ].map((row, i) => (
            <div
              key={row.label}
              className={`flex items-center justify-between px-6 py-4 ${i > 0 ? "border-t border-[#E2EAE6]" : ""}`}
            >
              <span style={labelStyle}>{row.label}</span>
              <span style={{ ...valStyle, fontFamily: row.mono ? "monospace" : "var(--font-body)", fontSize: row.mono ? 13 : 15 }}>
                {row.value}
              </span>
            </div>
          ))}
          <div className="flex items-center justify-between px-6 py-4 border-t border-[#E2EAE6]">
            <span style={labelStyle}>Status</span>
            <StatusBadge variant="live" />
          </div>
        </div>

        {/* CTAs */}
        {/*
          Yellow annotation on "View Campaign" button:
          "campaignId from URL param or payment API response.
          Never hardcoded string '1'."
        */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link to={`/brand/campaigns/${payment.campaignId}`} className="no-underline">
            <Button variant="primary">
              View Campaign <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link to="/brand/dashboard" className="no-underline">
            <Button variant="outline">Go to Dashboard</Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}