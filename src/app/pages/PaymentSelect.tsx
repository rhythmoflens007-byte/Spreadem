import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "../components/Buttons";
import { useNavigate } from "react-router";
import { Smartphone, CreditCard, Building2, Wallet, Check, ArrowRight, Lock, AlertCircle } from "lucide-react";

type Method = "upi" | "card" | "netbanking" | "wallet" | null;

const methods = [
  { id: "upi" as const, icon: Smartphone, label: "UPI", desc: "Google Pay, PhonePe, Paytm & any UPI app" },
  { id: "card" as const, icon: CreditCard, label: "Debit / Credit Card", desc: "Visa, Mastercard, RuPay" },
  { id: "netbanking" as const, icon: Building2, label: "Net Banking", desc: "All major Indian banks" },
  { id: "wallet" as const, icon: Wallet, label: "Wallets", desc: "Paytm Wallet, Mobikwik, Amazon Pay" },
];

const amount = "₹2,50,000";

const inputBase = "w-full h-11 rounded-[8px] border bg-white px-4 outline-none transition-all";
const inputStyle: React.CSSProperties = { fontFamily: "var(--font-body)", fontSize: 15, color: "#0D1F17" };

/* Validation patterns */
const upiRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z]+$/;
const cardRegex = /^\d{16}$/;
const cvvRegex = /^\d{3,4}$/;
const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;

function ErrMsg({ msg }: { msg?: string }) {
  if (!msg) return null;
  return (
    <p className="mt-1.5 flex items-center gap-1.5" style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#DC2626" }}>
      <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {msg}
    </p>
  );
}

function getInputClass(hasError: boolean) {
  return `${inputBase} ${hasError ? "border-[#DC2626] shadow-[0_0_0_3px_#FEF2F2]" : "border-[#E2EAE6] focus:border-[#1A8A5A] focus:shadow-[0_0_0_3px_#E8F5EE]"}`;
}

export function PaymentSelect() {
  const [selected, setSelected] = useState<Method>(null);
  const navigate = useNavigate();

  /* UPI state */
  const [upiId, setUpiId] = useState("");

  /* Card state */
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardName, setCardName] = useState("");

  /* Netbanking state */
  const [bank, setBank] = useState("Select your bank");

  /* Errors */
  const [errors, setErrors] = useState<Record<string, string>>({});
  const clearErr = (k: string) => setErrors((e) => { const n = { ...e }; delete n[k]; return n; });

  /* Format card number with spaces as user types */
  const handleCardNumber = (val: string) => {
    const digits = val.replace(/\D/g, "").slice(0, 16);
    setCardNumber(digits);
    clearErr("cardNumber");
  };

  /* Format expiry as MM/YY */
  const handleExpiry = (val: string) => {
    const digits = val.replace(/\D/g, "").slice(0, 4);
    const formatted = digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
    setExpiry(formatted);
    clearErr("expiry");
  };

  const validateAndPay = () => {
    const errs: Record<string, string> = {};

    if (selected === "upi") {
      if (!upiId.trim()) errs.upiId = "UPI ID is required.";
      else if (!upiRegex.test(upiId.trim())) errs.upiId = "Enter a valid UPI ID (e.g. name@upi or name@oksbi).";
    }

    if (selected === "card") {
      if (!cardNumber.trim()) errs.cardNumber = "Card number is required.";
      else if (!cardRegex.test(cardNumber.replace(/\s/g, ""))) errs.cardNumber = "Card number must be exactly 16 digits.";
      if (!expiry.trim()) errs.expiry = "Expiry date is required.";
      else if (!expiryRegex.test(expiry)) errs.expiry = "Enter expiry as MM/YY (e.g. 12/27).";
      else {
        const [month, year] = expiry.split("/");
        const exp = new Date(2000 + parseInt(year), parseInt(month) - 1);
        if (exp < new Date()) errs.expiry = "Card has expired.";
      }
      if (!cvv.trim()) errs.cvv = "CVV is required.";
      else if (!cvvRegex.test(cvv)) errs.cvv = "CVV must be 3 or 4 digits.";
      if (!cardName.trim()) errs.cardName = "Cardholder name is required.";
    }

    if (selected === "netbanking") {
      if (bank === "Select your bank") errs.bank = "Please select your bank.";
    }

    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    navigate("/brand/payment/processing");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: "easeOut" }}
      className="max-w-[560px] mx-auto px-6 py-14 md:py-20"
    >
      <h2 style={{ color: "#0D1F17" }}>Choose payment method</h2>
      <p className="mt-2" style={{ fontSize: 15, color: "#4A6358", lineHeight: 1.7 }}>
        Your {amount} will be secured as your campaign performance budget.
      </p>

      <div className="flex flex-col gap-3 mt-8">
        {methods.map((m) => {
          const active = selected === m.id;
          return (
            <div key={m.id}>
              <motion.button
                onClick={() => { setSelected(active ? null : m.id); setErrors({}); }}
                whileTap={{ scale: 0.99 }}
                className={`w-full h-16 rounded-[16px] border-2 px-5 flex items-center gap-4 cursor-pointer transition-all ${
                  active ? "border-[#1A8A5A] bg-[#E8F5EE]" : "border-[#E2EAE6] bg-white hover:border-[#1A8A5A]"
                }`}
              >
                <m.icon className="w-5 h-5 text-[#1A8A5A] shrink-0" />
                <div className="text-left flex-1">
                  <span style={{ fontFamily: "var(--font-body)", fontSize: 15, fontWeight: 500, color: "#0D1F17" }}>{m.label}</span>
                  <p style={{ fontSize: 13, color: "#8FA69C", marginTop: 2 }}>{m.desc}</p>
                </div>
                {active && <Check className="w-5 h-5 text-[#1A8A5A] shrink-0" />}
              </motion.button>

              {/* Sub-fields */}
              <AnimatePresence>
                {active && m.id === "upi" && (
                  <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }} className="mt-3 px-1">
                    <input
                      type="text"
                      placeholder="yourname@upi or name@oksbi"
                      value={upiId}
                      onChange={(e) => { setUpiId(e.target.value); clearErr("upiId"); }}
                      className={getInputClass(!!errors.upiId)}
                      style={inputStyle}
                    />
                    <ErrMsg msg={errors.upiId} />
                  </motion.div>
                )}
                {active && m.id === "card" && (
                  <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }} className="mt-3 px-1 flex flex-col gap-3">
                    <div>
                      <input
                        type="text"
                        placeholder="Card Number (16 digits)"
                        value={cardNumber}
                        onChange={(e) => handleCardNumber(e.target.value)}
                        className={getInputClass(!!errors.cardNumber)}
                        style={inputStyle}
                        maxLength={16}
                      />
                      <ErrMsg msg={errors.cardNumber} />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          value={expiry}
                          onChange={(e) => handleExpiry(e.target.value)}
                          className={getInputClass(!!errors.expiry)}
                          style={inputStyle}
                          maxLength={5}
                        />
                        <ErrMsg msg={errors.expiry} />
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder="CVV"
                          value={cvv}
                          onChange={(e) => { setCvv(e.target.value.replace(/\D/g, "").slice(0, 4)); clearErr("cvv"); }}
                          className={getInputClass(!!errors.cvv)}
                          style={inputStyle}
                          maxLength={4}
                        />
                        <ErrMsg msg={errors.cvv} />
                      </div>
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Cardholder Name"
                        value={cardName}
                        onChange={(e) => { setCardName(e.target.value); clearErr("cardName"); }}
                        className={getInputClass(!!errors.cardName)}
                        style={inputStyle}
                      />
                      <ErrMsg msg={errors.cardName} />
                    </div>
                  </motion.div>
                )}
                {active && m.id === "netbanking" && (
                  <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }} className="mt-3 px-1">
                    <select
                      value={bank}
                      onChange={(e) => { setBank(e.target.value); clearErr("bank"); }}
                      className={getInputClass(!!errors.bank) + " appearance-none cursor-pointer"}
                      style={{ ...inputStyle, color: bank === "Select your bank" ? "#8FA69C" : "#0D1F17" }}
                    >
                      <option>Select your bank</option>
                      <option>State Bank of India</option>
                      <option>HDFC Bank</option>
                      <option>ICICI Bank</option>
                      <option>Axis Bank</option>
                      <option>Kotak Mahindra Bank</option>
                      <option>Punjab National Bank</option>
                    </select>
                    <ErrMsg msg={errors.bank} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* CTA */}
      <div className="mt-8">
        <Button
          variant="primary"
          className="w-full"
          disabled={!selected}
          onClick={validateAndPay}
        >
          Confirm & Pay {amount} <ArrowRight className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex items-center justify-center gap-1.5 mt-4">
        <Lock className="w-3.5 h-3.5 text-[#8FA69C]" />
        <span style={{ fontSize: 12, color: "#8FA69C" }}>Secured by Razorpay</span>
      </div>
    </motion.div>
  );
}
