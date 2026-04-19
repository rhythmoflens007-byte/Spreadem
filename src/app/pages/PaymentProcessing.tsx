import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { Button } from "../components/Buttons";

/*
  ⚠ Navigation is webhook-driven only.
  No hardcoded setTimeout. API response triggers route.
  [BE:WEBHOOK] Razorpay webhook → POST /api/payments/confirm
  → 200: redirect to /brand/payment/success
  → 4xx: redirect to /brand/payment/failed
*/

export function PaymentProcessing() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="min-h-screen flex flex-col items-center justify-center px-6 bg-[#F8FAF9] relative"
    >
      {/* Top animated progress bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#E2EAE6] overflow-hidden">
        <motion.div
          className="h-full w-1/3 bg-[#1A8A5A] rounded-r-full"
          animate={{ x: ["-100%", "400%"] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="max-w-[560px] w-full bg-white rounded-[16px] border border-[#E2EAE6] p-10 md:p-12 text-center">
        {/* Spinner */}
        <div className="flex justify-center mb-8">
          <motion.svg
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
          >
            <circle cx="24" cy="24" r="20" stroke="#E2EAE6" strokeWidth="4" />
            <motion.circle
              cx="24"
              cy="24"
              r="20"
              stroke="#1A8A5A"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="80 45"
            />
          </motion.svg>
        </div>

        <h2 style={{ color: "#0D1F17" }}>Processing your payment…</h2>
        <p
          className="mt-4"
          style={{ fontFamily: "var(--font-body)", fontSize: 16, color: "#4A6358", lineHeight: 1.7 }}
        >
          Please don't close this window.
        </p>
        <p
          className="mt-2"
          style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#8FA69C" }}
        >
          This usually takes under 10 seconds.
        </p>

        {/* Indeterminate progress bar */}
        <div className="mt-8 h-1.5 rounded-full bg-[#E2EAE6] overflow-hidden">
          <motion.div
            className="h-full w-1/3 rounded-full bg-[#1A8A5A]"
            animate={{ x: ["-100%", "400%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* Demo prototype flows — visible for testing */}
        <div className="mt-8 pt-6 border-t border-[#E2EAE6]">
          <p className="mb-3" style={{ fontSize: 12, color: "#8FA69C", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.06em" }}>
            Demo: Simulate API Response
          </p>
          <div className="flex gap-3 justify-center">
            <Button variant="primary" size="small" onClick={() => navigate("/brand/payment/success")}>
              Payment Confirmed
            </Button>
            <Button variant="outline" size="small" onClick={() => navigate("/brand/payment/failed")}>
              Payment Declined
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
