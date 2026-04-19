import React from "react";
import { Link } from "react-router";

const footerLinks = [
  {
    title: "Platform",
    links: [
      { label: "Campaigns", to: "/campaigns" },
      { label: "Find Creators", to: "/creators" },
      { label: "How it Works", to: "/how-it-works" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", to: "/" },
      { label: "Contact", to: "mailto:hello@spreadem.in", external: true },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", to: "/legal/privacy" },
      { label: "Terms of Service", to: "/legal/terms" },
      { label: "Refund Policy", to: "/legal/refund" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-[#0D1F17] text-white">
      <div className="max-w-[1280px] mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center mb-4">
              <span style={{ fontFamily: "var(--font-heading)", fontSize: 22, fontWeight: 600 }}>Spread</span>
              <span style={{ fontFamily: "var(--font-heading)", fontSize: 22, fontWeight: 600, color: "#1A8A5A" }}>Em</span>
            </div>
            <p style={{ fontSize: 14, color: "#8FA69C", lineHeight: 1.7 }}>
              India's first performance-backed creator marketplace. Transparent campaigns, secured budgets, 3-day payouts.
            </p>
          </div>
          {footerLinks.map((col) => (
            <div key={col.title}>
              <span style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.06em", color: "#8FA69C" }}>
                {col.title}
              </span>
              <div className="flex flex-col gap-3 mt-4">
                {col.links.map((l) =>
                  (l as any).external ? (
                    <a
                      key={l.label}
                      href={l.to}
                      className="no-underline transition-colors hover:text-white"
                      style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#B3DFC8" }}
                    >
                      {l.label}
                    </a>
                  ) : (
                    <Link
                      key={l.label}
                      to={l.to}
                      className="no-underline transition-colors hover:text-white"
                      style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#B3DFC8" }}
                    >
                      {l.label}
                    </Link>
                  )
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="border-t border-[#1A8A5A]/20 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <span style={{ fontSize: 13, color: "#8FA69C" }}>&copy; 2026 SpreadEm. All rights reserved.</span>
          <span style={{ fontSize: 13, color: "#4A6358" }}>Built for creators, by creators. Made in India.</span>
        </div>
      </div>
    </footer>
  );
}
