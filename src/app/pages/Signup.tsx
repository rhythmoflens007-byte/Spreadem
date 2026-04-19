import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "../components/Buttons";
import { Link, useNavigate } from "react-router";
import { ArrowRight, Building2, Video, Eye, EyeOff, AlertCircle } from "lucide-react";

type Role = "brand" | "creator" | null;

/* ── Validation helpers ── */
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[0-9]).{8,}$/; // min 8 chars + at least 1 number

function validate(role: Role, fullName: string, email: string, password: string, confirmPassword: string) {
  const errs: Record<string, string> = {};
  if (!role) errs.role = "Please select your account type.";
  if (!fullName.trim() || fullName.trim().length < 2) errs.fullName = "Full name must be at least 2 characters.";
  if (!emailRegex.test(email.trim())) errs.email = "Enter a valid email address.";
  if (!passwordRegex.test(password)) errs.password = "Password must be at least 8 characters and include a number.";
  if (password !== confirmPassword) errs.confirmPassword = "Passwords do not match.";
  return errs;
}

/* ── Sub-components ── */
function RoleCard({ selected, onSelect, icon: Icon, title, description }: {
  selected: boolean; onSelect: () => void; icon: React.ElementType; title: string; description: string;
}) {
  return (
    <motion.button
      onClick={onSelect}
      animate={{ scale: selected ? 1.02 : 1, borderColor: selected ? "#1A8A5A" : "#E2EAE6", backgroundColor: selected ? "#E8F5EE" : "#FFFFFF" }}
      transition={{ duration: 0.2 }}
      whileTap={{ scale: 0.98 }}
      className="flex-1 min-w-[200px] rounded-[16px] border-2 p-6 text-left cursor-pointer transition-shadow hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)]"
      style={{ outline: "none" }}
    >
      <div className="w-11 h-11 rounded-[12px] flex items-center justify-center mb-4" style={{ backgroundColor: selected ? "#1A8A5A" : "#F0F4F2" }}>
        <Icon className="w-5 h-5" style={{ color: selected ? "#FFFFFF" : "#4A6358" }} />
      </div>
      <h4 style={{ color: "#0D1F17", fontFamily: "var(--font-heading)" }}>{title}</h4>
      <p className="mt-1.5" style={{ fontSize: 14, color: "#4A6358", lineHeight: 1.6, fontFamily: "var(--font-body)" }}>{description}</p>
    </motion.button>
  );
}

function FieldError({ msg }: { msg?: string }) {
  return (
    <AnimatePresence>
      {msg && (
        <motion.p
          initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.2 }}
          className="mt-1.5 flex items-center gap-1.5"
          style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 500, color: "#DC2626" }}
        >
          <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {msg}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

function FormInput({ label, type = "text", placeholder, value, onChange, error }: {
  label: string; type?: string; placeholder: string; value: string;
  onChange: (v: string) => void; error?: string;
}) {
  const [showPw, setShowPw] = useState(false);
  const isPassword = type === "password";
  const hasError = !!error;

  return (
    <div>
      <label className="block mb-1.5" style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 500, color: "#0D1F17" }}>
        {label}
      </label>
      <div className="relative">
        <input
          type={isPassword && showPw ? "text" : type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full h-11 rounded-[8px] border bg-white px-4 outline-none transition-all ${
            hasError
              ? "border-[#DC2626] focus:shadow-[0_0_0_3px_#FEF2F2]"
              : "border-[#E2EAE6] focus:border-[#1A8A5A] focus:shadow-[0_0_0_3px_#E8F5EE]"
          }`}
          style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "#0D1F17" }}
        />
        {isPassword && (
          <button type="button" onClick={() => setShowPw(!showPw)}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-[#F0F4F2] cursor-pointer transition-colors">
            {showPw ? <EyeOff className="w-4 h-4 text-[#8FA69C]" /> : <Eye className="w-4 h-4 text-[#8FA69C]" />}
          </button>
        )}
      </div>
      <FieldError msg={error} />
    </div>
  );
}

export function Signup() {
  const [role, setRole] = useState<Role>(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState(false);
  const navigate = useNavigate();

  const clearError = (key: string) => setErrors((e) => { const n = { ...e }; delete n[key]; return n; });

  const ctaText = role === "brand" ? "Start your first campaign" : role === "creator" ? "Apply as a creator" : "Create account";

  const handleSubmit = () => {
    setTouched(true);
    const errs = validate(role, fullName, email, password, confirmPassword);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    /* [BE:API] POST /api/auth/signup { role, full_name, email, password } */
    if (role === "brand") navigate("/onboarding/brand");
    else if (role === "creator") navigate("/onboarding/creator");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: "easeOut" }}
      className="min-h-screen flex items-center justify-center px-6 py-24 md:py-32"
      style={{ backgroundColor: "#F8FAF9" }}
    >
      <div className="w-full max-w-[480px]">
        <div className="flex justify-center mb-8">
          <Link to="/" className="flex items-center no-underline">
            <span style={{ fontFamily: "var(--font-heading)", fontSize: 24, fontWeight: 600, color: "#0D1F17" }}>Spread</span>
            <span style={{ fontFamily: "var(--font-heading)", fontSize: 24, fontWeight: 600, color: "#1A8A5A" }}>Em</span>
          </Link>
        </div>

        <div className="bg-white rounded-[20px] border border-[#E2EAE6] p-8 md:p-10 shadow-[0_4px_40px_rgba(0,0,0,0.04)]">
          <div className="text-center mb-8">
            <h2 style={{ color: "#0D1F17" }}>Create your account</h2>
            <p className="mt-2" style={{ fontSize: 15, color: "#4A6358" }}>Join SpreadEm — it's free</p>
          </div>

          {/* Role selector */}
          <div className="flex flex-col sm:flex-row gap-4 mb-2">
            <RoleCard selected={role === "brand"} onSelect={() => { setRole("brand"); clearError("role"); }} icon={Building2} title="Brand / Business" description="Post campaigns and pay only for verified views" />
            <RoleCard selected={role === "creator"} onSelect={() => { setRole("creator"); clearError("role"); }} icon={Video} title="Content Creator" description="Turn your audience into income — safely" />
          </div>
          <FieldError msg={touched ? errors.role : undefined} />

          {/* Form fields */}
          <div className="flex flex-col gap-5 mt-6">
            <FormInput label="Full Name" placeholder="e.g. Priya Sharma" value={fullName}
              onChange={(v) => { setFullName(v); clearError("fullName"); }} error={touched ? errors.fullName : undefined} />
            <FormInput label="Email Address" type="email" placeholder="you@example.com" value={email}
              onChange={(v) => { setEmail(v); clearError("email"); }} error={touched ? errors.email : undefined} />
            <FormInput label="Password" type="password" placeholder="Min 8 chars with at least 1 number" value={password}
              onChange={(v) => { setPassword(v); clearError("password"); }} error={touched ? errors.password : undefined} />
            <FormInput label="Confirm Password" type="password" placeholder="Re-enter your password" value={confirmPassword}
              onChange={(v) => { setConfirmPassword(v); clearError("confirmPassword"); }} error={touched ? errors.confirmPassword : undefined} />
          </div>

          <div className="mt-8">
            <Button variant="primary" className="w-full" onClick={handleSubmit}>
              {ctaText} <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          <p className="mt-6 text-center" style={{ fontSize: 14, color: "#8FA69C" }}>
            Already have an account?{" "}
            <Link to="/signin" className="no-underline" style={{ color: "#1A8A5A", fontWeight: 500 }}>
              Sign in <span aria-hidden>→</span>
            </Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
}
