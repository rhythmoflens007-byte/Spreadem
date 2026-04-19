import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "../components/Buttons";
import { Link, useNavigate } from "react-router";
import { ArrowRight, ChevronDown, Lock, X } from "lucide-react";

const categories = [
  "Select category",
  "Beauty & Personal Care",
  "Fashion & Apparel",
  "Health & Fitness",
  "Food & Beverage",
  "Tech & Electronics",
  "Finance & Fintech",
  "Education & EdTech",
  "Travel & Hospitality",
  "Home & Lifestyle",
  "Entertainment & Media",
];

const requiredFields: { key: string; label: string }[] = [
  { key: "businessName", label: "Business name is required." },
  { key: "address", label: "Registered address is required." },
  { key: "category", label: "Product category is required." },
  { key: "website", label: "Website URL is required." },
  { key: "contactPerson", label: "Contact person is required." },
  { key: "phone", label: "Phone number is required." },
];

/* Validation rules */
const urlRegex = /^https?:\/\/.+\..+/;
const phoneRegex = /^[6-9]\d{9}$/;
const gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;

const inputBase =
  "w-full h-11 rounded-[8px] border bg-white px-4 outline-none transition-all";
const inputStyle: React.CSSProperties = { fontFamily: "var(--font-body)", fontSize: 15, color: "#0D1F17" };

function getInputClass(hasError: boolean) {
  return `${inputBase} ${hasError ? "border-[#DC2626] shadow-[0_0_0_3px_#FEF2F2]" : "border-[#E2EAE6] focus:border-[#1A8A5A] focus:shadow-[0_0_0_3px_#E8F5EE]"}`;
}

export function OnboardingBrand() {
  const [form, setForm] = useState({
    businessName: "",
    gstNumber: "",
    address: "",
    category: "Select category",
    website: "",
    contactPerson: "",
    phone: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(false);
  const navigate = useNavigate();

  const update = (key: string, val: string) => {
    setForm((f) => ({ ...f, [key]: val }));
    setErrors((e) => ({ ...e, [key]: "" }));
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    let valid = true;

    if (!form.businessName.trim()) { newErrors.businessName = "Business name is required."; valid = false; }
    if (!form.address.trim()) { newErrors.address = "Registered address is required."; valid = false; }
    if (!form.category || form.category === "Select category") { newErrors.category = "Product category is required."; valid = false; }
    if (!form.website.trim()) {
      newErrors.website = "Website URL is required."; valid = false;
    } else if (!urlRegex.test(form.website.trim())) {
      newErrors.website = "Enter a valid URL starting with https:// (e.g. https://yourbrand.com)."; valid = false;
    }
    if (!form.contactPerson.trim()) { newErrors.contactPerson = "Contact person name is required."; valid = false; }
    const phone = form.phone.replace(/\s/g, "").replace(/^\+91/, "");
    if (!phone) {
      newErrors.phone = "Phone number is required."; valid = false;
    } else if (!phoneRegex.test(phone)) {
      newErrors.phone = "Enter a valid 10-digit Indian mobile number."; valid = false;
    }
    if (form.gstNumber.trim() && !gstinRegex.test(form.gstNumber.trim().toUpperCase())) {
      newErrors.gstNumber = "Enter a valid 15-character GSTIN (e.g. 22AAAAA0000A1Z5)."; valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = () => {
    if (!validate()) {
      setToast(true);
      setTimeout(() => setToast(false), 4000);
      return;
    }
    setLoading(true);
    /* [BE:API] POST /api/onboarding/brand (application/json) */
    setTimeout(() => {
      setLoading(false);
      navigate("/pending");
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="min-h-screen flex items-center justify-center px-6 py-24 md:py-32"
      style={{ backgroundColor: "#F8FAF9" }}
    >
      <div className="w-full max-w-[560px]">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link to="/" className="flex items-center no-underline">
            <span style={{ fontFamily: "var(--font-heading)", fontSize: 24, fontWeight: 600, color: "#0D1F17" }}>Spread</span>
            <span style={{ fontFamily: "var(--font-heading)", fontSize: 24, fontWeight: 600, color: "#1A8A5A" }}>Em</span>
          </Link>
        </div>

        {/* Card */}
        <div className="bg-white rounded-[20px] border border-[#E2EAE6] p-8 md:p-10 shadow-[0_4px_40px_rgba(0,0,0,0.04)]">
          {/* Progress */}
          <div className="flex items-center justify-between mb-6">
            <span style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.06em", color: "#8FA69C" }}>
              Step 1 of 1
            </span>
            <div className="flex-1 mx-4 h-1.5 rounded-full bg-[#E2EAE6] overflow-hidden">
              <div className="h-full rounded-full bg-[#1A8A5A] w-full" />
            </div>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h2 style={{ color: "#0D1F17" }}>Tell us about your brand</h2>
            <p className="mt-2" style={{ fontSize: 15, color: "#4A6358", lineHeight: 1.7 }}>
              We verify every brand manually. This takes up to 48 hours.
            </p>
          </div>

          {/* Fields */}
          <div className="flex flex-col gap-5">
            {/* Business Name* */}
            <FieldWrapper label="Business Name *" error={errors.businessName} errorMsg="Business name is required.">
              <input
                type="text"
                placeholder="e.g. GlowSkin Pvt. Ltd."
                value={form.businessName}
                onChange={(e) => update("businessName", e.target.value)}
                className={getInputClass(!!errors.businessName)}
                style={inputStyle}
              />
            </FieldWrapper>

            {/* Registered Address* */}
            <FieldWrapper label="Registered Address *" error={errors.address} errorMsg="Registered address is required.">
              <textarea
                placeholder="Full registered business address"
                value={form.address}
                onChange={(e) => update("address", e.target.value)}
                rows={3}
                className={`w-full rounded-[8px] border bg-white px-4 py-3 outline-none transition-all resize-none ${errors.address ? "border-[#DC2626] shadow-[0_0_0_3px_#FEF2F2]" : "border-[#E2EAE6] focus:border-[#1A8A5A] focus:shadow-[0_0_0_3px_#E8F5EE]"}`}
                style={inputStyle}
              />
            </FieldWrapper>

            {/* Product Category* */}
            <FieldWrapper label="Product Category *" error={errors.category} errorMsg="Product category is required.">
              <div className="relative">
                <select
                  value={form.category}
                  onChange={(e) => update("category", e.target.value)}
                  className={`${getInputClass(!!errors.category)} appearance-none pr-10 cursor-pointer`}
                  style={{ ...inputStyle, color: form.category === "Select category" ? "#8FA69C" : "#0D1F17" }}
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8FA69C] pointer-events-none" />
              </div>
            </FieldWrapper>

            {/* Website URL* */}
            <FieldWrapper label="Website URL *" error={errors.website} errorMsg="Website URL is required.">
              <input
                type="url"
                placeholder="https://yourbrand.com"
                value={form.website}
                onChange={(e) => update("website", e.target.value)}
                className={getInputClass(!!errors.website)}
                style={inputStyle}
              />
            </FieldWrapper>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Contact Person* */}
              <FieldWrapper label="Contact Person *" error={errors.contactPerson} errorMsg="Contact person is required.">
                <input
                  type="text"
                  placeholder="Full name"
                  value={form.contactPerson}
                  onChange={(e) => update("contactPerson", e.target.value)}
                  className={getInputClass(!!errors.contactPerson)}
                  style={inputStyle}
                />
              </FieldWrapper>

              {/* Phone Number* */}
              <FieldWrapper label="Phone Number *" error={errors.phone} errorMsg="Phone number is required.">
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  className={getInputClass(!!errors.phone)}
                  style={inputStyle}
                />
              </FieldWrapper>
            </div>

            {/* GST Number (optional) */}
            <div>
              <label className="block mb-1.5" style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 500, color: "#0D1F17" }}>
                GST Number
              </label>
              <input
                type="text"
                placeholder="e.g. 22AAAAA0000A1Z5"
                value={form.gstNumber}
                onChange={(e) => update("gstNumber", e.target.value)}
                className={`${inputBase} border-[#E2EAE6] focus:border-[#1A8A5A] focus:shadow-[0_0_0_3px_#E8F5EE]`}
                style={inputStyle}
              />
              <p className="mt-1.5" style={{ fontSize: 12, color: "#8FA69C" }}>Optional — helps with faster verification.</p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-8">
            <Button variant="primary" className="w-full" loading={loading} onClick={handleSubmit}>
              Submit for Review <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Footer note */}
          <div className="flex items-center justify-center gap-1.5 mt-5">
            <Lock className="w-3.5 h-3.5 text-[#8FA69C]" />
            <p style={{ fontSize: 13, color: "#8FA69C" }}>
              Your information is encrypted and only used for verification.
            </p>
          </div>
        </div>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 right-6 z-50 bg-white rounded-[12px] border border-[#E2EAE6] shadow-lg px-5 py-4 flex items-center gap-3 max-w-sm"
          >
            <div className="w-8 h-8 rounded-full bg-[#FEF2F2] flex items-center justify-center shrink-0">
              <X className="w-4 h-4 text-[#DC2626]" />
            </div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#0D1F17" }}>
              Please fill in all required fields.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ── Field Wrapper with error state ── */
function FieldWrapper({ label, error, errorMsg, children }: { label: string; error?: string | boolean; errorMsg?: string; children: React.ReactNode }) {
  const msg = typeof error === "string" ? error : errorMsg;
  return (
    <div>
      <label className="block mb-1.5" style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 500, color: "#0D1F17" }}>
        {label}
      </label>
      {children}
      <AnimatePresence>
        {!!error && msg && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="mt-1.5"
            style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 500, color: "#DC2626" }}
          >
            {msg}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}