import React, { useState } from "react";
import { motion } from "motion/react";
import { Button } from "../components/Buttons";
import { TabBar, Field, SecurityTab, inputClass, inputStyle, labelStyle } from "../components/AccountShared";
import { Download } from "lucide-react";

const tabs = ["Profile", "Billing", "Notifications", "Security"];

/* Mock billing data */
const billingHistory = [
  { id: "txn_001", date: "10 Apr 2026", amount: "₹1,50,000", txnId: "TXN-2026-04-001" },
  { id: "txn_002", date: "28 Mar 2026", amount: "₹75,000", txnId: "TXN-2026-03-004" },
  { id: "txn_003", date: "15 Mar 2026", amount: "₹2,00,000", txnId: "TXN-2026-03-002" },
  { id: "txn_004", date: "1 Feb 2026", amount: "₹50,000", txnId: "TXN-2026-02-001" },
];

const gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
const urlRegex = /^https?:\/\/.+\..+/;

export function BrandAccount() {
  const [tab, setTab] = useState("Profile");

  /* Profile form */
  const [businessName, setBusinessName] = useState("GlowSkin Pvt Ltd");
  const [gst, setGst] = useState("29ABCDE1234F1Z5");
  const [address, setAddress] = useState("42 MG Road, Bengaluru, Karnataka 560001");
  const [category, setCategory] = useState("Beauty & Skincare");
  const [website, setWebsite] = useState("https://glowskin.in");
  const [saving, setSaving] = useState(false);
  const [profileErrors, setProfileErrors] = useState<Record<string, string>>({});
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = () => {
    const errs: Record<string, string> = {};
    if (!businessName.trim()) errs.businessName = "Business name is required.";
    if (gst.trim() && !gstinRegex.test(gst.trim().toUpperCase())) errs.gst = "Enter a valid 15-character GSTIN.";
    if (!address.trim()) errs.address = "Registered address is required.";
    if (website.trim() && !urlRegex.test(website.trim())) errs.website = "Enter a valid URL starting with https://.";
    setProfileErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setSaving(true);
    setTimeout(() => { setSaving(false); setSaveSuccess(true); setTimeout(() => setSaveSuccess(false), 3000); }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="max-w-[1280px] mx-auto px-8 py-10 md:py-14"
    >
      <h2 style={{ color: "#0D1F17" }}>Account Settings</h2>
      <p className="mt-2 mb-8" style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "#4A6358" }}>
        Manage your brand profile, billing, and security.
      </p>

      <div className="bg-white rounded-[16px] border border-[#E2EAE6] p-6 md:p-8">
        <TabBar tabs={tabs} active={tab} onChange={setTab} />

        {/* Profile */}
        {tab === "Profile" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }} className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
            <div>
              <Field label="Business Name"><input value={businessName} onChange={(e) => { setBusinessName(e.target.value); setProfileErrors((p) => ({...p, businessName: ""})); }} className={`${inputClass} ${profileErrors.businessName ? "!border-[#DC2626]" : ""}`} style={inputStyle} /></Field>
              {profileErrors.businessName && <p className="mt-1" style={{ fontSize: 12, color: "#DC2626", fontFamily: "var(--font-body)" }}>{profileErrors.businessName}</p>}
            </div>
            <div>
              <Field label="GST Number (optional)"><input value={gst} onChange={(e) => { setGst(e.target.value); setProfileErrors((p) => ({...p, gst: ""})); }} className={`${inputClass} ${profileErrors.gst ? "!border-[#DC2626]" : ""}`} style={inputStyle} /></Field>
              {profileErrors.gst && <p className="mt-1" style={{ fontSize: 12, color: "#DC2626", fontFamily: "var(--font-body)" }}>{profileErrors.gst}</p>}
            </div>
            <div className="md:col-span-2">
              <Field label="Registered Address"><input value={address} onChange={(e) => { setAddress(e.target.value); setProfileErrors((p) => ({...p, address: ""})); }} className={`${inputClass} ${profileErrors.address ? "!border-[#DC2626]" : ""}`} style={inputStyle} /></Field>
              {profileErrors.address && <p className="mt-1" style={{ fontSize: 12, color: "#DC2626", fontFamily: "var(--font-body)" }}>{profileErrors.address}</p>}
            </div>
            <Field label="Category">
              <select value={category} onChange={(e) => setCategory(e.target.value)} className={`${inputClass} appearance-none cursor-pointer`} style={inputStyle}>
                {["Beauty & Skincare", "Fitness & Health", "Tech & Gadgets", "Fashion & Style", "Food & Lifestyle", "Education", "Other"].map((c) => <option key={c}>{c}</option>)}
              </select>
            </Field>
            <div>
              <Field label="Website URL"><input value={website} onChange={(e) => { setWebsite(e.target.value); setProfileErrors((p) => ({...p, website: ""})); }} className={`${inputClass} ${profileErrors.website ? "!border-[#DC2626]" : ""}`} style={inputStyle} placeholder="https://yourbrand.com" /></Field>
              {profileErrors.website && <p className="mt-1" style={{ fontSize: 12, color: "#DC2626", fontFamily: "var(--font-body)" }}>{profileErrors.website}</p>}
            </div>
            <div className="md:col-span-2 pt-2 flex items-center gap-4">
              <Button variant="primary" loading={saving} onClick={handleSave}>Save Changes</Button>
              {saveSuccess && <span style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#1A8A5A", fontWeight: 500 }}>✓ Saved successfully</span>}
            </div>
          </motion.div>
        )}

        {/* Billing */}
        {tab === "Billing" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
            <div className="rounded-[12px] border border-[#E2EAE6] overflow-hidden">
              <div className="hidden md:grid grid-cols-[1fr_1fr_1.2fr_0.8fr] gap-4 px-6 py-3.5 border-b border-[#E2EAE6] bg-[#F8FAF9]">
                {["Date", "Amount", "Transaction ID", "Invoice"].map((h) => (
                  <span key={h} style={labelStyle}>{h}</span>
                ))}
              </div>
              {billingHistory.map((b, i) => (
                <motion.div
                  key={b.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.08 }}
                  className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1.2fr_0.8fr] gap-2 md:gap-4 items-center px-6 py-4 border-b border-[#E2EAE6] last:border-b-0 hover:bg-[#F8FAF9] transition-colors"
                >
                  <span style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#0D1F17" }}>{b.date}</span>
                  <span className="hidden md:block" style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 500, color: "#0D1F17" }}>{b.amount}</span>
                  <span className="hidden md:block" style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#8FA69C", fontVariantNumeric: "tabular-nums" }}>{b.txnId}</span>
                  <button className="hidden md:inline-flex items-center gap-1.5 cursor-pointer bg-transparent border-none" style={{ fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 500, color: "#1A8A5A" }}>
                    <Download className="w-3.5 h-3.5" /> Download
                  </button>
                  {/* Mobile */}
                  <div className="flex md:hidden items-center gap-3 flex-wrap">
                    <span style={{ fontSize: 13, fontWeight: 500, color: "#0D1F17" }}>{b.amount}</span>
                    <span style={{ fontSize: 12, color: "#8FA69C" }}>{b.txnId}</span>
                    <button className="inline-flex items-center gap-1 cursor-pointer bg-transparent border-none" style={{ fontSize: 13, fontWeight: 500, color: "#1A8A5A" }}><Download className="w-3 h-3" /> PDF</button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Notifications */}
        {tab === "Notifications" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }} className="flex flex-col gap-5 max-w-xl">
            <NotifToggle label="New submission received" sub="Get notified when a creator submits content." defaultOn />
            <NotifToggle label="Campaign milestones" sub="Budget 50%/75%/100% utilised alerts." defaultOn />
            <NotifToggle label="Payment confirmations" sub="Receive receipts for escrow and payout transactions." defaultOn />
            <NotifToggle label="Marketing & updates" sub="Product updates and SpreadEm newsletters." defaultOn={false} />
          </motion.div>
        )}

        {/* Security */}
        {tab === "Security" && <SecurityTab email="brand@glowskin.in" />}
      </div>
    </motion.div>
  );
}

function NotifToggle({ label, sub, defaultOn }: { label: string; sub: string; defaultOn: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div className="flex items-start justify-between gap-4 py-2">
      <div>
        <p style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 500, color: "#0D1F17" }}>{label}</p>
        <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#8FA69C", marginTop: 2 }}>{sub}</p>
      </div>
      <button
        onClick={() => setOn(!on)}
        className={`w-11 h-6 rounded-full p-0.5 transition-colors cursor-pointer shrink-0 ${on ? "bg-[#1A8A5A]" : "bg-[#E2EAE6]"}`}
      >
        <motion.div
          animate={{ x: on ? 20 : 0 }}
          transition={{ duration: 0.15 }}
          className="w-5 h-5 rounded-full bg-white shadow-sm"
        />
      </button>
    </div>
  );
}