import React from "react";
import { motion } from "motion/react";
import { Link, useParams } from "react-router";
import { ArrowLeft } from "lucide-react";

const content: Record<string, { title: string; body: string[] }> = {
  privacy: {
    title: "Privacy Policy",
    body: [
      "SpreadEm respects your privacy and is committed to protecting the personal data you share with us. This policy outlines how we collect, use, and safeguard your information when you use our platform.",
      "We collect information that you voluntarily provide when creating an account, submitting campaigns, or interacting with our services. This includes your name, email, business details, and payment information.",
      "We use your data solely to operate, maintain, and improve SpreadEm's services. We do not sell your personal information to third parties. All data is encrypted in transit and at rest.",
      "You may request access to, correction of, or deletion of your personal data at any time by contacting us at hello@spreadem.in.",
    ],
  },
  terms: {
    title: "Terms of Service",
    body: [
      "By using SpreadEm, you agree to be bound by these terms. SpreadEm is a performance-backed creator marketplace platform that connects brands with creators through a pay-per-view model.",
      "Brands are responsible for funding their campaign budgets prior to launch. Funds are secured as performance budgets and released to creators only upon verified view delivery.",
      "Creators must submit original, authentic content. Any fraudulent activity, including fake views or misleading metrics, will result in account termination and forfeiture of pending payouts.",
      "SpreadEm reserves the right to modify these terms at any time. Continued use of the platform after changes constitutes acceptance of the updated terms.",
    ],
  },
  refund: {
    title: "Refund Policy",
    body: [
      "Campaign budgets are secured as performance budgets. Unused portions of the budget may be refunded after the campaign ends, subject to a 48-hour processing period.",
      "Refunds for campaigns cancelled before going live will be processed within 5-7 business days to the original payment method.",
      "Creator payouts that have been processed cannot be reversed. Disputes between brands and creators regarding content quality should be raised through our resolution centre.",
      "For any refund-related queries, contact us at hello@spreadem.in with your campaign ID and payment details.",
    ],
  },
};

export function LegalPage() {
  const { type } = useParams();
  const page = content[type || "privacy"] || content.privacy;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="pt-24 pb-16"
    >
      <div className="max-w-[720px] mx-auto px-8">
        <Link to="/" className="no-underline inline-flex items-center gap-2 mb-8" style={{ fontSize: 14, fontWeight: 500, color: "#1A8A5A" }}>
          <ArrowLeft className="w-4 h-4" /> Home
        </Link>
        <h2 style={{ color: "#0D1F17" }}>{page.title}</h2>
        <div className="mt-8 flex flex-col gap-6">
          {page.body.map((p, i) => (
            <p key={i} style={{ fontSize: 16, color: "#4A6358", lineHeight: 1.7 }}>{p}</p>
          ))}
        </div>
        <p className="mt-10" style={{ fontSize: 13, color: "#8FA69C" }}>Last updated: April 1, 2026</p>
      </div>
    </motion.div>
  );
}
