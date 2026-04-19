import { motion } from "motion/react";
import { Button } from "../components/Buttons";
import { ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router";

/*
  Yellow annotation on "Try Again" button:
  "Navigates to /brand/payment/select — never navigate(-1).
  navigate(-1) would loop back to /processing."
*/

function AnimatedX() {
  return (
    <div className="flex justify-center mb-8">
      <div className="w-20 h-20 rounded-full bg-[#FEF2F2] flex items-center justify-center">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="18" stroke="#DC2626" strokeWidth="2.5" opacity="0.3" />
          <motion.circle
            cx="20"
            cy="20"
            r="18"
            stroke="#DC2626"
            strokeWidth="2.5"
            strokeDasharray="113"
            strokeDashoffset={113}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
          <motion.path
            d="M15 15L25 25"
            stroke="#DC2626"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="15"
            strokeDashoffset={15}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 0.3, ease: "easeOut", delay: 0.35 }}
          />
          <motion.path
            d="M25 15L15 25"
            stroke="#DC2626"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="15"
            strokeDashoffset={15}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 0.3, ease: "easeOut", delay: 0.5 }}
          />
        </svg>
      </div>
    </div>
  );
}

export function PaymentFailed() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="min-h-screen flex items-center justify-center px-6 bg-[#F8FAF9]"
    >
      <div className="max-w-[560px] w-full bg-white rounded-[16px] border border-[#E2EAE6] p-10 md:p-12 text-center">
        <AnimatedX />

        <h2 style={{ color: "#0D1F17" }}>Payment could not be processed</h2>
        <p
          className="mt-4"
          style={{ fontFamily: "var(--font-body)", fontSize: 16, color: "#4A6358", lineHeight: 1.7 }}
        >
          No amount has been deducted. Please try again or reach out to our support team for help.
        </p>

        {/* CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link to="/brand/payment/select-method" className="no-underline">
            <Button variant="primary">
              Try Again <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Button variant="ghost" onClick={() => window.open("mailto:support@spreadem.in", "_blank")}>
            Contact Support
          </Button>
        </div>

        {/* Return to Dashboard */}
        <div className="mt-4">
          <Link
            to="/brand/dashboard"
            className="no-underline"
            style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 500, color: "#1A8A5A" }}
          >
            Return to Dashboard
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
