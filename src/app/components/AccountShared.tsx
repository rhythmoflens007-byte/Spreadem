import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./Buttons";
import { X, Lock, AlertTriangle, Eye, EyeOff } from "lucide-react";

/* ─── shared styles ─── */
export const labelStyle: React.CSSProperties = { fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.06em", color: "#8FA69C" };
export const inputClass = "w-full h-11 rounded-[8px] border border-[#E2EAE6] bg-white px-4 outline-none focus:border-[#1A8A5A] focus:shadow-[0_0_0_3px_#E8F5EE] transition-all";
export const inputStyle: React.CSSProperties = { fontFamily: "var(--font-body)", fontSize: 15, color: "#0D1F17" };
export const readOnlyClass = "w-full h-11 rounded-[8px] border border-[#E2EAE6] bg-[#F8FAF9] px-4 flex items-center gap-2 text-[#8FA69C]";

/* ─── Tab bar ─── */
export function TabBar({ tabs, active, onChange }: { tabs: string[]; active: string; onChange: (t: string) => void }) {
  return (
    <div className="flex gap-1 border-b border-[#E2EAE6] mb-8 overflow-x-auto">
      {tabs.map((t) => (
        <button
          key={t}
          onClick={() => onChange(t)}
          className="relative px-4 py-3 cursor-pointer transition-colors whitespace-nowrap"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 14,
            fontWeight: 500,
            color: active === t ? "#0A4D32" : "#8FA69C",
            background: "none",
            border: "none",
          }}
        >
          {t}
          {active === t && (
            <motion.div
              layoutId="tab-indicator"
              className="absolute left-0 right-0 bottom-0 h-[2px] bg-[#1A8A5A] rounded-full"
              transition={{ duration: 0.2 }}
            />
          )}
        </button>
      ))}
    </div>
  );
}

/* ─── Field wrapper ─── */
export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block mb-1.5" style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 500, color: "#0D1F17" }}>{label}</label>
      {children}
    </div>
  );
}

/* ─── Security Tab ─── */
export function SecurityTab({ email }: { email: string }) {
  const [pwModal, setPwModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }} className="flex flex-col gap-6">
        <Field label="Email Address">
          <div className={readOnlyClass} style={inputStyle}>
            <Lock className="w-4 h-4 text-[#8FA69C] shrink-0" />
            <span style={{ color: "#8FA69C" }}>{email}</span>
          </div>
        </Field>

        <div>
          <Button variant="outline" onClick={() => setPwModal(true)}>Change Password</Button>
        </div>

        {/* Danger Zone */}
        <div className="mt-8 border-t-2 border-[#DC2626]/20 pt-8">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-[#DC2626]" />
            <span style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.06em", color: "#DC2626" }}>Danger Zone</span>
          </div>
          <p className="mb-4" style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#4A6358", lineHeight: 1.7 }}>
            Permanently delete your account and all associated data. This action cannot be undone.
          </p>
          <Button variant="danger" onClick={() => setDeleteModal(true)}>Delete Account</Button>
        </div>
      </motion.div>

      <ChangePasswordModal open={pwModal} onClose={() => setPwModal(false)} />
      <DeleteAccountModal open={deleteModal} onClose={() => setDeleteModal(false)} />
    </>
  );
}

/* ─── Change Password Modal ─── */
function ChangePasswordModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [current, setCurrent] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [saving, setSaving] = useState(false);

  const canSave = current.length > 0 && newPw.length >= 8 && newPw === confirm;

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => { setSaving(false); onClose(); setCurrent(""); setNewPw(""); setConfirm(""); }, 1000);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-6">
          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.2 }} className="bg-white rounded-[20px] p-8 max-w-[440px] w-full shadow-xl relative">
            <button onClick={onClose} className="absolute top-4 right-4 p-1.5 rounded-[8px] hover:bg-[#F0F4F2] transition-colors cursor-pointer"><X className="w-4 h-4 text-[#8FA69C]" /></button>
            <h3 style={{ color: "#0D1F17" }}>Change Password</h3>
            <p className="mt-1 mb-6" style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#8FA69C" }}>Enter your current password and choose a new one.</p>

            <div className="flex flex-col gap-5">
              <Field label="Current Password">
                <div className="relative">
                  <input type={showCurrent ? "text" : "password"} value={current} onChange={(e) => setCurrent(e.target.value)} className={inputClass} style={inputStyle} placeholder="••••••••" />
                  <button onClick={() => setShowCurrent(!showCurrent)} className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer p-1">{showCurrent ? <EyeOff className="w-4 h-4 text-[#8FA69C]" /> : <Eye className="w-4 h-4 text-[#8FA69C]" />}</button>
                </div>
              </Field>
              <Field label="New Password">
                <div className="relative">
                  <input type={showNew ? "text" : "password"} value={newPw} onChange={(e) => setNewPw(e.target.value)} className={inputClass} style={inputStyle} placeholder="Min. 8 characters" />
                  <button onClick={() => setShowNew(!showNew)} className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer p-1">{showNew ? <EyeOff className="w-4 h-4 text-[#8FA69C]" /> : <Eye className="w-4 h-4 text-[#8FA69C]" />}</button>
                </div>
              </Field>
              <Field label="Confirm New Password">
                <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} className={inputClass} style={inputStyle} placeholder="Re-enter new password" />
                {confirm.length > 0 && confirm !== newPw && <span style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#DC2626", marginTop: 4, display: "block" }}>Passwords do not match</span>}
              </Field>
            </div>

            <div className="mt-8 flex justify-end gap-3">
              <Button variant="ghost" onClick={onClose}>Cancel</Button>
              <Button variant="primary" disabled={!canSave} loading={saving} onClick={handleSave}>Update Password</Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── Delete Account Modal ─── */
function DeleteAccountModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [typed, setTyped] = useState("");
  const [deleting, setDeleting] = useState(false);

  const handleDelete = () => {
    setDeleting(true);
    setTimeout(() => { setDeleting(false); onClose(); setTyped(""); }, 1500);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-6">
          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.2 }} className="bg-white rounded-[20px] p-8 max-w-[440px] w-full shadow-xl relative">
            <button onClick={onClose} className="absolute top-4 right-4 p-1.5 rounded-[8px] hover:bg-[#F0F4F2] transition-colors cursor-pointer"><X className="w-4 h-4 text-[#8FA69C]" /></button>

            <div className="w-12 h-12 rounded-full bg-[#FEF2F2] flex items-center justify-center mb-4">
              <AlertTriangle className="w-6 h-6 text-[#DC2626]" />
            </div>
            <h3 style={{ color: "#0D1F17" }}>Delete your account?</h3>
            <p className="mt-2 mb-6" style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#4A6358", lineHeight: 1.7 }}>
              This will permanently delete your account, all campaigns, submissions, and earnings data. This action <strong>cannot be undone</strong>.
            </p>

            <Field label='Type "DELETE" to confirm'>
              <input type="text" value={typed} onChange={(e) => setTyped(e.target.value)} className={inputClass} style={inputStyle} placeholder="DELETE" />
            </Field>

            <div className="mt-8 flex justify-end gap-3">
              <Button variant="ghost" onClick={onClose}>Cancel</Button>
              <Button variant="danger" disabled={typed !== "DELETE"} loading={deleting} onClick={handleDelete}>Delete Account</Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
