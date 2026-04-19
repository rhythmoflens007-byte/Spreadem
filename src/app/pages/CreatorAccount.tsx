import React, { useState } from "react";
import { motion } from "motion/react";
import { Button } from "../components/Buttons";
import { TabBar, Field, SecurityTab, inputClass, inputStyle } from "../components/AccountShared";

const tabs = ["Profile", "Notifications", "Security"];
const platformOptions = ["Instagram", "YouTube", "Twitter", "LinkedIn"];
const nicheOptions = ["Beauty & Skincare", "Fitness & Health", "Tech & Gadgets", "Fashion & Style", "Food & Lifestyle", "Education", "Gaming", "Lifestyle"];

const handleRegex = /^[a-zA-Z0-9._]+$/;
const urlRegex = /^https?:\/\/.+\..+/;

export function CreatorAccount() {
  const [tab, setTab] = useState("Profile");

  /* Profile form */
  const [handle, setHandle] = useState("snehavibes");
  const [platforms, setPlatforms] = useState<string[]>(["Instagram", "YouTube"]);
  const [profileLink, setProfileLink] = useState("https://instagram.com/snehavibes");
  const [bio, setBio] = useState("Beauty & lifestyle creator from Mumbai. Love skincare routines and honest product reviews.");
  const [niche, setNiche] = useState("Beauty & Skincare");
  const [followers, setFollowers] = useState("48,200");
  const [saving, setSaving] = useState(false);
  const [profileErrors, setProfileErrors] = useState<Record<string, string>>({});
  const [saveSuccess, setSaveSuccess] = useState(false);

  const togglePlatform = (p: string) => {
    setPlatforms((prev) => prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]);
  };

  const handleSave = () => {
    const errs: Record<string, string> = {};
    if (!handle.trim()) errs.handle = "Handle is required.";
    else if (!handleRegex.test(handle.trim())) errs.handle = "Handle can only contain letters, numbers, dots and underscores.";
    if (profileLink.trim() && !urlRegex.test(profileLink.trim())) errs.profileLink = "Enter a valid URL starting with https://.";
    if (bio.trim().length > 0 && bio.trim().length < 10) errs.bio = "Bio must be at least 10 characters.";
    if (platforms.length === 0) errs.platforms = "Select at least one platform.";
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
        Manage your creator profile and security.
      </p>

      <div className="bg-white rounded-[16px] border border-[#E2EAE6] p-6 md:p-8">
        <TabBar tabs={tabs} active={tab} onChange={setTab} />

        {/* Profile */}
        {tab === "Profile" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }} className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
            <div>
              <Field label="Handle">
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2" style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "#8FA69C" }}>@</span>
                  <input value={handle} onChange={(e) => { setHandle(e.target.value); setProfileErrors((p) => ({...p, handle: ""})); }} className={`${inputClass} pl-8 ${profileErrors.handle ? "!border-[#DC2626]" : ""}`} style={inputStyle} />
                </div>
              </Field>
              {profileErrors.handle && <p className="mt-1" style={{ fontSize: 12, color: "#DC2626", fontFamily: "var(--font-body)" }}>{profileErrors.handle}</p>}
            </div>

            <Field label="Niche">
              <select value={niche} onChange={(e) => setNiche(e.target.value)} className={`${inputClass} appearance-none cursor-pointer`} style={inputStyle}>
                {nicheOptions.map((n) => <option key={n}>{n}</option>)}
              </select>
            </Field>

            <div className="md:col-span-2">
              <Field label="Platforms">
                <div className="flex flex-wrap gap-2">
                  {platformOptions.map((p) => {
                    const active = platforms.includes(p);
                    return (
                      <button
                        key={p}
                        onClick={() => { togglePlatform(p); setProfileErrors((pr) => ({...pr, platforms: ""})); }}
                        className={`h-9 px-4 rounded-full border cursor-pointer transition-all ${active ? "bg-[#E8F5EE] border-[#B3DFC8] text-[#0A4D32]" : "bg-white border-[#E2EAE6] text-[#4A6358] hover:bg-[#F8FAF9]"}`}
                        style={{ fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 500 }}
                      >
                        {p}
                      </button>
                    );
                  })}
                </div>
              </Field>
              {profileErrors.platforms && <p className="mt-1" style={{ fontSize: 12, color: "#DC2626", fontFamily: "var(--font-body)" }}>{profileErrors.platforms}</p>}
            </div>

            <div className="md:col-span-2">
              <Field label="Profile Link">
                <input value={profileLink} onChange={(e) => { setProfileLink(e.target.value); setProfileErrors((p) => ({...p, profileLink: ""})); }} className={`${inputClass} ${profileErrors.profileLink ? "!border-[#DC2626]" : ""}`} style={inputStyle} placeholder="https://..." />
              </Field>
              {profileErrors.profileLink && <p className="mt-1" style={{ fontSize: 12, color: "#DC2626", fontFamily: "var(--font-body)" }}>{profileErrors.profileLink}</p>}
            </div>

            <div className="md:col-span-2">
              <Field label="Bio">
                <textarea value={bio} onChange={(e) => { setBio(e.target.value); setProfileErrors((p) => ({...p, bio: ""})); }} rows={3} className={`w-full rounded-[8px] border bg-white px-4 py-3 outline-none transition-all resize-none ${profileErrors.bio ? "border-[#DC2626]" : "border-[#E2EAE6] focus:border-[#1A8A5A] focus:shadow-[0_0_0_3px_#E8F5EE]"}`} style={inputStyle} />
              </Field>
              {profileErrors.bio && <p className="mt-1" style={{ fontSize: 12, color: "#DC2626", fontFamily: "var(--font-body)" }}>{profileErrors.bio}</p>}
            </div>

            <Field label="Follower Count">
              <input value={followers} onChange={(e) => setFollowers(e.target.value)} className={inputClass} style={inputStyle} />
            </Field>

            <div className="md:col-span-2 pt-2 flex items-center gap-4">
              <Button variant="primary" loading={saving} onClick={handleSave}>Save Changes</Button>
              {saveSuccess && <span style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#1A8A5A", fontWeight: 500 }}>✓ Saved successfully</span>}
            </div>
          </motion.div>
        )}

        {/* Notifications */}
        {tab === "Notifications" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }} className="flex flex-col gap-5 max-w-xl">
            <NotifToggle label="Submission status updates" sub="Get notified when your submission is approved or rejected." defaultOn />
            <NotifToggle label="New campaign matches" sub="Campaigns matching your niche and platform." defaultOn />
            <NotifToggle label="Payout confirmations" sub="Receive alerts when payouts are processed." defaultOn />
            <NotifToggle label="Marketing & updates" sub="Product updates and SpreadEm newsletters." defaultOn={false} />
          </motion.div>
        )}

        {/* Security */}
        {tab === "Security" && <SecurityTab email="sneha@email.com" />}
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