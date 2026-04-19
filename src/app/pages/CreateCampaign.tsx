import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link, useNavigate } from "react-router";
import { Button } from "../components/Buttons";
import {
  ArrowRight,
  ArrowLeft,
  X,
  ChevronDown,
  Check,
  Calendar,
  Rocket,
  Info,
} from "lucide-react";

/* ───── types ───── */
interface StepOneData {
  title: string;
  description: string;
  requirements: string;
  platform: string;
  nicheTags: string[];
  deadline: string;
}
interface StepTwoData {
  ppvRate: string;
  totalBudget: string;
  minFollowers: string;
}

const platforms = ["Select platform", "Instagram", "YouTube", "Twitter", "LinkedIn"];
const availableNiches = [
  "Beauty & Skincare",
  "Fitness & Health",
  "Tech & Gadgets",
  "Fashion & Style",
  "Finance & Business",
  "Food & Lifestyle",
  "Travel & Adventure",
  "Education & Learning",
  "Gaming",
  "Parenting",
];

/* ───── helpers ───── */
const inputClass =
  "w-full h-11 rounded-[8px] border border-[#E2EAE6] bg-white px-4 outline-none focus:border-[#1A8A5A] focus:shadow-[0_0_0_3px_#E8F5EE] transition-all";
const inputStyle: React.CSSProperties = {
  fontFamily: "var(--font-body)",
  fontSize: 15,
  color: "#0D1F17",
};
const labelStyle: React.CSSProperties = {
  fontFamily: "var(--font-body)",
  fontSize: 14,
  fontWeight: 500,
  color: "#0D1F17",
};

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block mb-1.5" style={labelStyle}>
        {label}
      </label>
      {children}
    </div>
  );
}

function formatINR(n: number): string {
  return "₹" + n.toLocaleString("en-IN");
}

function formatViews(views: number): string {
  if (views >= 10_000_000) return (views / 10_000_000).toFixed(1).replace(/\.0$/, "") + "Cr";
  if (views >= 100_000) return (views / 100_000).toFixed(1).replace(/\.0$/, "") + "L";
  if (views >= 1_000) return (views / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  return String(views);
}

/* ───── slide variants ───── */
const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 40 : -40, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -40 : 40, opacity: 0 }),
};

/* ───── Progress Bar ───── */
function ProgressBar({ current }: { current: number }) {
  const steps = ["Campaign Details", "Set Budget", "Review & Submit"];
  return (
    <div className="flex items-center gap-0 w-full">
      {steps.map((s, i) => {
        const completed = i < current;
        const active = i === current;
        return (
          <React.Fragment key={s}>
            <div className="flex items-center gap-2.5 shrink-0">
              <motion.div
                animate={{
                  backgroundColor: completed ? "#1A8A5A" : active ? "#FFFFFF" : "#FFFFFF",
                  borderColor: completed || active ? "#1A8A5A" : "#E2EAE6",
                }}
                transition={{ duration: 0.3 }}
                className="w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0"
              >
                {completed ? (
                  <Check className="w-4 h-4 text-white" />
                ) : (
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 13,
                      fontWeight: 600,
                      color: active ? "#1A8A5A" : "#8FA69C",
                    }}
                  >
                    {i + 1}
                  </span>
                )}
              </motion.div>
              <span
                className="hidden sm:block"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 13,
                  fontWeight: 500,
                  color: completed || active ? "#0D1F17" : "#8FA69C",
                }}
              >
                {s}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className="flex-1 h-0.5 mx-3 rounded-full overflow-hidden bg-[#E2EAE6]">
                <motion.div
                  animate={{ width: completed ? "100%" : "0%" }}
                  transition={{ duration: 0.3 }}
                  className="h-full bg-[#1A8A5A]"
                />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

/* ───── Niche Chip Input ───── */
function NicheChipInput({
  selected,
  onChange,
}: {
  selected: string[];
  onChange: (v: string[]) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const toggle = (niche: string) => {
    onChange(
      selected.includes(niche)
        ? selected.filter((n) => n !== niche)
        : [...selected, niche]
    );
  };

  return (
    <div ref={ref} className="relative">
      <div
        onClick={() => setOpen(!open)}
        className={`${inputClass} flex items-center cursor-pointer pr-10`}
        style={{ ...inputStyle, color: selected.length === 0 ? "#8FA69C" : "#0D1F17" }}
      >
        {selected.length === 0 ? "Select niches" : `${selected.length} selected`}
      </div>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8FA69C] pointer-events-none" />

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15 }}
          className="absolute z-20 top-[48px] left-0 right-0 bg-white border border-[#E2EAE6] rounded-[10px] shadow-lg py-2 max-h-52 overflow-y-auto"
        >
          {availableNiches.map((n) => (
            <button
              key={n}
              onClick={() => toggle(n)}
              className="w-full text-left px-4 py-2.5 flex items-center justify-between hover:bg-[#F8FAF9] transition-colors cursor-pointer"
              style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#0D1F17" }}
            >
              {n}
              {selected.includes(n) && <Check className="w-4 h-4 text-[#1A8A5A]" />}
            </button>
          ))}
        </motion.div>
      )}

      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2.5">
          {selected.map((n) => (
            <span
              key={n}
              className="inline-flex items-center gap-1.5 pl-3 pr-2 py-1.5 rounded-full bg-[#E8F5EE] border border-[#B3DFC8]"
            >
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 13,
                  fontWeight: 500,
                  color: "#0A4D32",
                }}
              >
                {n}
              </span>
              <button
                onClick={() => toggle(n)}
                className="p-0.5 rounded-full hover:bg-[#B3DFC8] transition-colors cursor-pointer"
              >
                <X className="w-3 h-3 text-[#0A4D32]" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

/* ───── Main Component ───── */
export function CreateCampaign() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [stepErrors, setStepErrors] = useState<Record<string, string>>({});

  const [one, setOne] = useState<StepOneData>({
    title: "",
    description: "",
    requirements: "",
    platform: "Select platform",
    nicheTags: [],
    deadline: "",
  });

  const [two, setTwo] = useState<StepTwoData>({
    ppvRate: "",
    totalBudget: "",
    minFollowers: "",
  });

  const clearErr = (key: string) => setStepErrors((e) => { const n = { ...e }; delete n[key]; return n; });

  const validateStep1 = (): boolean => {
    const errs: Record<string, string> = {};
    if (!one.title.trim()) errs.title = "Campaign title is required.";
    else if (one.title.trim().length < 10) errs.title = "Title must be at least 10 characters.";
    if (!one.description.trim()) errs.description = "Product description is required.";
    else if (one.description.trim().length < 30) errs.description = "Description must be at least 30 characters.";
    if (one.platform === "Select platform") errs.platform = "Please select a platform.";
    if (one.nicheTags.length === 0) errs.nicheTags = "Select at least one niche.";
    if (!one.deadline) {
      errs.deadline = "Campaign deadline is required.";
    } else {
      const today = new Date(); today.setHours(0, 0, 0, 0);
      if (new Date(one.deadline) <= today) errs.deadline = "Deadline must be a future date.";
    }
    setStepErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep2 = (): boolean => {
    const errs: Record<string, string> = {};
    const ppv = Number(two.ppvRate);
    const budget = Number(two.totalBudget);
    if (!two.ppvRate || ppv <= 0) errs.ppvRate = "Pay-per-view rate must be greater than ₹0.";
    else if (ppv > 100) errs.ppvRate = "PPV rate cannot exceed ₹100 per 1,000 views.";
    if (!two.totalBudget || budget <= 0) errs.totalBudget = "Total budget is required.";
    else if (budget < 10000) errs.totalBudget = "Minimum campaign budget is ₹10,000.";
    setStepErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const goNext = () => {
    if (step === 0 && !validateStep1()) return;
    if (step === 1 && !validateStep2()) return;
    setDir(1);
    setStep((s) => s + 1);
  };
  const goBack = () => {
    setStepErrors({});
    setDir(-1);
    setStep((s) => s - 1);
  };

  const canStep1 =
    one.title.trim() &&
    one.description.trim() &&
    one.platform !== "Select platform" &&
    one.nicheTags.length > 0 &&
    one.deadline;

  const canStep2 = Number(two.ppvRate) > 0 && Number(two.totalBudget) > 0;

  /* auto-calc */
  const ppv = Number(two.ppvRate) || 0;
  const budget = Number(two.totalBudget) || 0;
  const maxViews = ppv > 0 ? Math.round((budget / ppv) * 1000) : 0;

  const handleSubmit = () => {
    setSubmitting(true);
    /* [BE:API] POST /api/campaigns → then redirect to payment */
    setTimeout(() => {
      setSubmitting(false);
      navigate("/brand/payment/select-method");
    }, 1200);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="max-w-[1280px] mx-auto px-8 py-10 md:py-14"
    >
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => (step > 0 ? goBack() : navigate("/brand/dashboard"))}
          className="p-2 rounded-[8px] hover:bg-[#F0F4F2] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5 text-[#4A6358]" />
        </button>
        <h2 style={{ color: "#0D1F17" }}>Create Campaign</h2>
      </div>

      {/* Card container */}
      <div className="max-w-[680px] mx-auto">
        {/* Progress */}
        <ProgressBar current={step} />

        {/* Step content */}
        <div className="mt-10 bg-white rounded-[16px] border border-[#E2EAE6] p-8 md:p-10 overflow-hidden relative min-h-[420px]">
          <AnimatePresence mode="wait" custom={dir}>
            {step === 0 && (
              <motion.div
                key="step-1"
                custom={dir}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <h3 style={{ color: "#0D1F17" }}>What's your campaign about?</h3>
                <p className="mt-1 mb-8" style={{ fontSize: 14, color: "#8FA69C" }}>
                  Tell creators what you're looking for.
                </p>

                <div className="flex flex-col gap-5">
                  <FormField label="Campaign Title">
                    <input
                      type="text"
                      placeholder="e.g. Summer Glow Product Launch"
                      value={one.title}
                      onChange={(e) => { setOne({ ...one, title: e.target.value }); clearErr("title"); }}
                      className={`${inputClass} ${stepErrors.title ? "!border-[#DC2626] !shadow-[0_0_0_3px_#FEF2F2]" : ""}`}
                      style={inputStyle}
                    />
                    {stepErrors.title && <p className="mt-1.5" style={{ fontSize: 12, color: "#DC2626", fontFamily: "var(--font-body)" }}>{stepErrors.title}</p>}
                  </FormField>

                  <FormField label="Product Description">
                    <textarea
                      placeholder="Describe the product or service creators will be promoting"
                      value={one.description}
                      onChange={(e) => { setOne({ ...one, description: e.target.value }); clearErr("description"); }}
                      rows={4}
                      className={`w-full rounded-[8px] border bg-white px-4 py-3 outline-none transition-all resize-none ${stepErrors.description ? "border-[#DC2626] shadow-[0_0_0_3px_#FEF2F2]" : "border-[#E2EAE6] focus:border-[#1A8A5A] focus:shadow-[0_0_0_3px_#E8F5EE]"}`}
                      style={{ ...inputStyle, minHeight: 120 }}
                    />
                    {stepErrors.description && <p className="mt-1.5" style={{ fontSize: 12, color: "#DC2626", fontFamily: "var(--font-body)" }}>{stepErrors.description}</p>}
                  </FormField>

                  <FormField label="Content Requirements">
                    <textarea
                      placeholder="Specify deliverables — e.g. 1 Reel + 2 Stories, mention brand handle, etc."
                      value={one.requirements}
                      onChange={(e) => setOne({ ...one, requirements: e.target.value })}
                      rows={3}
                      className="w-full rounded-[8px] border border-[#E2EAE6] bg-white px-4 py-3 outline-none focus:border-[#1A8A5A] focus:shadow-[0_0_0_3px_#E8F5EE] transition-all resize-none"
                      style={inputStyle}
                    />
                  </FormField>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FormField label="Platform">
                      <div className="relative">
                        <select
                          value={one.platform}
                          onChange={(e) => { setOne({ ...one, platform: e.target.value }); clearErr("platform"); }}
                          className={`${inputClass} appearance-none pr-10 cursor-pointer ${stepErrors.platform ? "!border-[#DC2626] !shadow-[0_0_0_3px_#FEF2F2]" : ""}`}
                          style={{ ...inputStyle, color: one.platform === "Select platform" ? "#8FA69C" : "#0D1F17" }}
                        >
                          {platforms.map((p) => (
                            <option key={p} value={p}>
                              {p}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8FA69C] pointer-events-none" />
                      </div>
                      {stepErrors.platform && <p className="mt-1.5" style={{ fontSize: 12, color: "#DC2626", fontFamily: "var(--font-body)" }}>{stepErrors.platform}</p>}
                    </FormField>

                    <FormField label="Campaign Deadline">
                      <div className="relative">
                        <input
                          type="date"
                          value={one.deadline}
                          onChange={(e) => { setOne({ ...one, deadline: e.target.value }); clearErr("deadline"); }}
                          className={`${inputClass} pr-10 cursor-pointer ${stepErrors.deadline ? "!border-[#DC2626] !shadow-[0_0_0_3px_#FEF2F2]" : ""}`}
                          style={{ ...inputStyle, color: one.deadline ? "#0D1F17" : "#8FA69C" }}
                        />
                        <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8FA69C] pointer-events-none" />
                      </div>
                      {stepErrors.deadline && <p className="mt-1.5" style={{ fontSize: 12, color: "#DC2626", fontFamily: "var(--font-body)" }}>{stepErrors.deadline}</p>}
                    </FormField>
                  </div>

                  <FormField label="Niche Tags">
                    <NicheChipInput
                      selected={one.nicheTags}
                      onChange={(v) => { setOne({ ...one, nicheTags: v }); clearErr("nicheTags"); }}
                    />
                    {stepErrors.nicheTags && <p className="mt-1.5" style={{ fontSize: 12, color: "#DC2626", fontFamily: "var(--font-body)" }}>{stepErrors.nicheTags}</p>}
                  </FormField>
                </div>

                <div className="flex justify-end mt-10">
                  <Button variant="primary" onClick={goNext}>
                    Next: Set your budget <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div
                key="step-2"
                custom={dir}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <h3 style={{ color: "#0D1F17" }}>Set your budget</h3>
                <p className="mt-1 mb-8" style={{ fontSize: 14, color: "#8FA69C" }}>
                  You only pay for real performance.
                </p>

                <div className="flex flex-col gap-5">
                  <FormField label="Pay per 1,000 views (₹)">
                    <div className="relative">
                      <span
                        className="absolute left-4 top-1/2 -translate-y-1/2"
                        style={{ fontSize: 15, color: "#8FA69C", fontWeight: 500 }}
                      >
                        ₹
                      </span>
                      <input
                        type="number"
                        min={0}
                        max={100}
                        placeholder="e.g. 2"
                        value={two.ppvRate}
                        onChange={(e) => { setTwo({ ...two, ppvRate: e.target.value }); clearErr("ppvRate"); }}
                        className={`${inputClass} pl-9 ${stepErrors.ppvRate ? "!border-[#DC2626] !shadow-[0_0_0_3px_#FEF2F2]" : ""}`}
                        style={inputStyle}
                      />
                    </div>
                    {stepErrors.ppvRate && <p className="mt-1.5" style={{ fontSize: 12, color: "#DC2626", fontFamily: "var(--font-body)" }}>{stepErrors.ppvRate}</p>}
                  </FormField>

                  <FormField label="Total performance budget (₹)">
                    <div className="relative">
                      <span
                        className="absolute left-4 top-1/2 -translate-y-1/2"
                        style={{ fontSize: 15, color: "#8FA69C", fontWeight: 500 }}
                      >
                        ₹
                      </span>
                      <input
                        type="number"
                        min={0}
                        placeholder="e.g. 25000 (min ₹10,000)"
                        value={two.totalBudget}
                        onChange={(e) => { setTwo({ ...two, totalBudget: e.target.value }); clearErr("totalBudget"); }}
                        className={`${inputClass} pl-9 ${stepErrors.totalBudget ? "!border-[#DC2626] !shadow-[0_0_0_3px_#FEF2F2]" : ""}`}
                        style={inputStyle}
                      />
                    </div>
                    {stepErrors.totalBudget && <p className="mt-1.5" style={{ fontSize: 12, color: "#DC2626", fontFamily: "var(--font-body)" }}>{stepErrors.totalBudget}</p>}
                  </FormField>

                  {/* Auto-calc */}
                  {ppv > 0 && budget > 0 && (
                    <motion.p
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: 14,
                        fontWeight: 500,
                        color: "#1A8A5A",
                        lineHeight: 1.6,
                      }}
                    >
                      At ₹{ppv}/1,000 views, your {formatINR(budget)} covers up to{" "}
                      {formatViews(maxViews)} views
                    </motion.p>
                  )}

                  <FormField label="Minimum Followers (optional)">
                    <input
                      type="number"
                      min={0}
                      placeholder="e.g. 10000"
                      value={two.minFollowers}
                      onChange={(e) => setTwo({ ...two, minFollowers: e.target.value })}
                      className={inputClass}
                      style={inputStyle}
                    />
                  </FormField>

                  {/* Info banner */}
                  <div className="flex gap-3 p-4 rounded-[12px] bg-[#EFF6FF] border border-[#BFDBFE]">
                    <Info className="w-5 h-5 text-[#2563EB] shrink-0 mt-0.5" />
                    <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#1D4ED8", lineHeight: 1.6 }}>
                      No flat rate or revenue share. PPV only. Creators earn purely based on the views
                      their content generates.
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-10">
                  <Button variant="ghost" onClick={goBack}>
                    <ArrowLeft className="w-4 h-4" /> Back
                  </Button>
                  <Button variant="primary" disabled={!canStep2} onClick={goNext}>
                    Next: Review & submit <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step-3"
                custom={dir}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <h3 style={{ color: "#0D1F17" }}>Review your campaign</h3>
                <p className="mt-1 mb-8" style={{ fontSize: 14, color: "#8FA69C" }}>
                  Make sure everything looks good before submitting.
                </p>

                {/* Summary card */}
                <div className="bg-[#F8FAF9] rounded-[12px] border border-[#E2EAE6] p-6 flex flex-col gap-4">
                  <SummaryRow label="Campaign Title" value={one.title} />
                  <SummaryRow label="Product Description" value={one.description} />
                  {one.requirements && (
                    <SummaryRow label="Content Requirements" value={one.requirements} />
                  )}
                  <SummaryRow label="Platform" value={one.platform} />
                  <SummaryRow label="Niche Tags" value={one.nicheTags.join(", ")} />
                  <SummaryRow
                    label="Deadline"
                    value={
                      one.deadline
                        ? new Date(one.deadline).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })
                        : "—"
                    }
                  />

                  <div className="border-t border-[#E2EAE6] pt-4 mt-1" />

                  <SummaryRow label="PPV Rate" value={`₹${two.ppvRate}/1,000 views`} />
                  <SummaryRow label="Total Budget" value={formatINR(budget)} />
                  <SummaryRow label="Max Reach" value={`${formatViews(maxViews)} views`} highlight />
                  {two.minFollowers && (
                    <SummaryRow
                      label="Min. Followers"
                      value={Number(two.minFollowers).toLocaleString("en-IN")}
                    />
                  )}
                </div>

                <p
                  className="mt-6"
                  style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#4A6358", lineHeight: 1.7 }}
                >
                  Once submitted, your campaign goes to our team for review. After approval you'll
                  receive a payment link to lock funds in your performance budget.
                </p>

                <div className="flex items-center justify-between mt-10">
                  <Button variant="ghost" onClick={goBack}>
                    <ArrowLeft className="w-4 h-4" /> Back
                  </Button>
                  <Button variant="primary" loading={submitting} onClick={handleSubmit}>
                    Lock budget & go live <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Success Modal — triggered when navigate to payment is unavailable */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-[20px] p-10 max-w-[420px] w-full text-center shadow-xl"
            >
              <motion.div
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-20 h-20 rounded-full bg-[#E8F5EE] flex items-center justify-center mx-auto"
              >
                <Rocket className="w-9 h-9 text-[#1A8A5A]" />
              </motion.div>
              <h2 className="mt-6" style={{ color: "#0D1F17" }}>
                Campaign submitted!
              </h2>
              <p
                className="mt-3"
                style={{ fontSize: 15, color: "#4A6358", lineHeight: 1.7 }}
              >
                We'll review your campaign and notify you once it's approved and ready to go live.
              </p>
              <div className="mt-8">
                <Link to="/brand/dashboard" className="no-underline">
                  <Button variant="primary" className="w-full">
                    Go to Dashboard <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ───── Summary Row ───── */
function SummaryRow({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4">
      <span
        className="shrink-0 sm:w-40"
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 12,
          fontWeight: 500,
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          color: "#8FA69C",
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 15,
          fontWeight: highlight ? 600 : 400,
          color: highlight ? "#1A8A5A" : "#0D1F17",
          lineHeight: 1.5,
        }}
      >
        {value}
      </span>
    </div>
  );
}