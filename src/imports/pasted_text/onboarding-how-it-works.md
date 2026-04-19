━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PASTE 2 OF 7 — HOW IT WORKS + ONBOARDING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SPREADEM PATCH v1.1 — Paste 2. Apply TOKEN BLOCK first. Do not change any tokens, colors, or untouched components.

PATCH 05 — HOW IT WORKS: CREATOR POV + CTA FIX
Affected: Public/HowItWorks/Desktop + Mobile.

A. Layout: 50/50 two columns desktop, stacked mobile (Brands first, Creators second). Column header: LABEL style 12px/500/DM Sans/uppercase/tracking 0.06em, color accent-500.

FOR BRANDS column (existing, relabeled):
1. Post your campaign — Set your brief, PPV rate, and total budget
2. Creators apply — Verified creators submit their content links
3. You approve — Only approve content that meets your brief
4. Pay for results — Budget releases only for verified views

FOR CREATORS column (NEW):
1. Browse campaigns — Discover live campaigns from verified brands
2. Submit your content — Share your content link directly with the brand
3. Get approved — Brand reviews your submission within 48 hours
4. Earn per view — Get paid for every verified view your content generates

Each step: 32px circle (bg accent-500, text white, weight 500) + H4 title + Body text (text-secondary). Both columns animate with list-stagger 80ms per step.

B. CTA FIX: Wire "Get Started Now" button → On Click → Push Left 300ms → /auth/signup frame. Must not remain unlinked.

PATCH 06 — BRAND ONBOARDING FORM FIXES
Affected: Brand/Onboarding/Desktop + Mobile (PROMPT 06 Frame A).

A. INLINE VALIDATION: If "Submit for Review" is clicked with any required field empty — empty field border changes to error #DC2626 + shadow 0 0 0 3px #FEF2F2 (Smart Animate 200ms). Error label appears below field: 12px/500/DM Sans/error color e.g. "Business name is required." Animate: translateY -4px→0 + opacity 0→1, 200ms. Toast bottom-right: "Please fill in all required fields." auto-dismiss 4s, toast-slide. Form does not navigate — stays on current frame.

B. GST NUMBER: Make optional. Remove asterisk from label. Add helper text below: "Optional — helps with faster verification." 12px, text-muted.

C. REMOVE document upload: Delete the dashed-border drag-drop file upload zone entirely from desktop and mobile. Updated field order: Business Name* | Registered Address* | Product Category* | Website URL* | Contact Person* | Phone Number* | GST Number (optional).

[BE:API] POST /api/onboarding/brand → change to application/json. Remove multipart/form-data and Supabase storage reference.

---

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PASTE 3 OF 7 — HERO + TRUST BAR + DASHBOARD CAROUSELS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SPREADEM PATCH v1.1 — Paste 3. Apply TOKEN BLOCK first. Do not change tokens, colors, or untouched components.

PATCH 07 — HERO NICHE TILES → FILTER ROUTING
Affected: Public/Landing/Desktop + Mobile — niche tile row in hero section.
Each tile prototypes to /campaigns with niche pre-applied AND lands at the TOP of the campaigns frame. Transition: Push Left 300ms.
Media & Entertainment → /campaigns?niche=media-entertainment
Fashion & Style → /campaigns?niche=fashion-style
Food & Lifestyle → /campaigns?niche=food-lifestyle
Tech & Gadgets → /campaigns?niche=tech-gadgets
Fitness & Health → /campaigns?niche=fitness-health
Beauty & Skincare → /campaigns?niche=beauty-skincare
Finance & Business → /campaigns?niche=finance-business
Travel & Adventure → /campaigns?niche=travel-adventure
On /campaigns frame: when niche param present, that niche filter pill shows active (accent-500 border, accent-50 bg) and card grid pre-filtered.
[BE:API] GET /api/campaigns?niche={slug} — filter applies on load if param exists.

PATCH 08 — TRUST BAR COPY + LANGUAGE FIX
Affected: Public/Landing/Desktop + Mobile — Trust Bar strip below hero.
Replace stats:
OLD "₹2Cr+ locked" → NEW "₹2Cr+ paid out"
OLD "847 campaigns" (with ₹ symbol) → NEW "847 live campaigns" (no ₹ symbol)
OLD "3-day creator checkout" → NEW "1,000+ verified creators"
Stat item: Lucide icon 20px accent-500 + value H4 text-primary + label Small text-secondary. Three items separated by 1px border-default vertical dividers 32px tall, vertically centered.
Also: remove all instances of the word "locked" paired with "escrow" anywhere on landing page. Replace with "secured budget" or "performance budget."

PATCH 09 — DASHBOARD HERO CAROUSELS (POST-LOGIN)
Affected: Creator/Dashboard/Desktop+Mobile, Brand/Dashboard/Desktop+Mobile.
Replace plain greeting H2 with a full-width hero banner below navbar, above stat cards.

CREATOR DASHBOARD HERO:
Left 60%: Eyebrow LABEL style accent-500 "Top campaigns this week" | H2 auto-cycling campaign title (changes every 4s, opacity 0→1 fade 300ms) | Body: brand name + niche pill + PPV rate | CTA "View Campaign →" primary.
Right 40%: Campaign cover image 16px radius, bg-tertiary, 16:9 aspect, object-fit cover. Cross-fades with title 300ms.
5 indicator dots below: active = accent-500 filled 8px circle, inactive = border-default outlined. Click dot = jump to that item.
Creator Navbar: Logo | Browse Campaigns | My Submissions | [Bell] [Avatar]

BRAND DASHBOARD HERO:
Left 60%: Eyebrow "Featured creators this week" | H2 auto-cycling creator handle (every 4s, 300ms fade) | Body: niche + platform + follower count | CTA "View Creator →" outline.
Right 40%: Creator profile image card 16px radius, cycles with handle 300ms cross-fade.
5 indicator dots, same style.
Brand Navbar: Logo | Find Creators | Live Campaigns | My Campaigns | [Bell] [+ New Campaign] [Avatar]
Stat cards + table below hero remain exactly as in PROMPT 08 / PROMPT 12.

---

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PASTE 4 OF 7 — ACCOUNT DROPDOWN + SIGN IN FIX
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SPREADEM PATCH v1.1 — Paste 4. Apply TOKEN BLOCK first. Do not change tokens, colors, or untouched components.

PATCH 10 — ACCOUNT DROPDOWN RESTRUCTURE
Affected: Brand/AccountDropdown + Creator/AccountDropdown overlays on all frames.
Remove Dashboard and Earnings from top-level navbar. Entry point moves to Avatar dropdown only. Dashboard content inside each dashboard frame stays exactly as in PROMPT 08 (Brand) and PROMPT 12 (Creator) — no changes inside dashboard frames.

CREATOR AccountDropdown (4 items only):
1. My Profile → /creator/account/profile (Push Left 300ms)
2. My Dashboard → /creator/dashboard (Push Left 300ms)
3. Settings → /creator/account/settings (Push Left 300ms)
4. Sign Out — text color error #DC2626 → /auth/login (Push Right 300ms)

BRAND AccountDropdown (4 items only):
1. My Profile → /brand/account/profile (Push Left 300ms)
2. My Dashboard → /brand/dashboard (Push Left 300ms)
3. Settings → /brand/account/settings (Push Left 300ms)
4. Sign Out — text color error #DC2626 → /auth/login (Push Right 300ms)

Dropdown style: white bg, 16px radius, border border-default, shadow-elevate, p:8px. Each item: h:44px, px:16px, 16px/400/DM Sans, hover→bg bg-tertiary. 1px border-default divider above Sign Out. Open: translateY -8px→0 + opacity 0→1, 200ms easeOut. Close: reverse 150ms easeIn.

PATCH 16 — SIGN IN → DASHBOARD ROUTING FIX
Affected: Auth/Login/Desktop + Mobile.

A. POST-LOGIN: "Sign In →" On Click → Role Router overlay (opacity 0→1, 200ms): centered "Signing you in..." 14px text-secondary + 24px spinner accent-500, 400ms → Smart Animate to Brand/Dashboard/Desktop OR Creator/Dashboard/Desktop. Wire two prototype paths from Sign In button — one per role — so both outcomes exist in prototype.

B. ERROR STATE: Wrong credentials → inline error below password field: "Incorrect password. Try again or reset it." error color #DC2626, 12px. Shake animation: translateX ±4px × 3 cycles, 300ms. "Reset password →" link inline → Push Left to /auth/forgot-password. This is a distinct frame variant connected via prototype.

[BE:API] POST /api/auth/login → 401: show error variant | 200: redirect by response.role.

---

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PASTE 5 OF 7 — PAYMENT METHOD SELECTION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SPREADEM PATCH v1.1 — Paste 5. Apply TOKEN BLOCK first. Do not change tokens, colors, or untouched components.

PATCH 11 — PAYMENT METHOD SELECTION STEP
Affected: PROMPT 09 Step 3 CTA wiring + PROMPT 11 payment flow.

Create NEW FRAME: /brand/payment/select-method — centered card max-width 560px, page-enter animation, 1440px + 390px.

H2 "Choose payment method"
Body "Your ₹[amount] will be secured as your campaign performance budget."

Four payment method tiles — vertical list, each h:64px, 16px radius, border border-default, hover→border accent-500 + bg accent-50, selected→2px border accent-500 + bg accent-50 + Lucide Check icon right-aligned in accent-500:

1. UPI (icon: Lucide Smartphone) — label "Google Pay, PhonePe, Paytm & any UPI app" — on select: UPI ID input appears below (h:44px, radius:8px, placeholder "yourname@upi")
2. Debit / Credit Card (icon: Lucide CreditCard) — label "Visa, Mastercard, RuPay" — on select: 3 sub-fields appear: Card Number | Expiry + CVV (two columns) | Cardholder Name
3. Net Banking (icon: Lucide Building2) — label "All major Indian banks" — on select: Bank select dropdown appears
4. Wallets (icon: Lucide Wallet) — label "Paytm Wallet, Mobikwik, Amazon Pay"

Sub-fields animate in: translateY -8px→0 + opacity 0→1, Smart Animate 200ms on tile select.

CTA: "Confirm & Pay ₹[amount] →" (primary, full-width). Disabled state until method selected: bg bg-tertiary, text text-muted, cursor not-allowed. Below CTA: "🔒 Secured by Razorpay" 12px text-muted centered.

WIRING UPDATE:
PROMPT 09 Step 3 — "Lock budget & go live →" → On Click → Push Left 300ms → /brand/payment/select-method (not directly to processing).
"Confirm & Pay →" → On Click → Push Left 300ms → /brand/payment/processing.

[BE:API] POST /api/payments/initiate { campaign_id, amount, payment_method, upi_id? } → returns Razorpay order_id.

---

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PASTE 6 OF 7 — NOTIFICATIONS + 404 FIXES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SPREADEM PATCH v1.1 — Paste 6. Apply TOKEN BLOCK first. Do not change tokens, colors, or untouched components.

PATCH 12 — BRAND NOTIFICATIONS (BRAND-SPECIFIC CONTENT)
Affected: Brand/Notifications/Dropdown overlay + Notifications/Centre/Desktop brand-role view.
Replace all notification items with brand-specific content:
1. New Submission (icon: Lucide Upload, accent-500) — "[@handle] submitted content for [Campaign Name]" → links to campaign submissions
2. Budget Alert (icon: Lucide AlertTriangle, warning #D97706) — "70% of your performance budget for [Campaign Name] has been utilized."
3. Campaign Live (icon: Lucide Zap, accent-500) — "[Campaign Name] is now live and accepting submissions."
4. Submission Approved (icon: Lucide CheckCircle, success #16A34A) — "You approved [@handle]'s submission. Views are being tracked."
5. Payout Processed (icon: Lucide IndianRupee, success) — "₹[amount] paid out to [N] creators for [Campaign Name]."
6. Campaign Completed (icon: Lucide Flag, text-secondary) — "[Campaign Name] has ended. View final payout report."
Filter tabs in Notification Centre (brand view): All | Submissions | Campaigns | Payments.
Item style: min-height 68px, border-bottom border-default. Unread: bg accent-50 + left border 3px accent-500. Read: bg white. Timestamp: 12px text-muted right-aligned.

PATCH 13A — CREATOR PROFILE 404 FIX
Affected: Creator/AccountDropdown — "My Profile" link.
Wire "My Profile" → Creator/AccountSettings/Desktop. Dropdown closes (reverse 150ms) then Push Left 300ms. Inside AccountSettings frame add tab switcher: Profile | Security | Notifications — default tab = Profile. Profile tab fields: Avatar 64px circle (click-to-change) | Display Name | Creator Handle | Bio | Primary Platform | Niche | Profile URL. Tab switch: Smart Animate content swap 200ms.

PATCH 13B — BRAND SUBMISSION VIEW 404 FIX
Affected: PROMPT 10 Brand Campaign Detail — Submissions table "View →" action.
Create NEW FRAME: /brand/campaigns/[id]/submissions/[submission_id] — 1440px + 390px.
Back nav: "← Back to [Campaign Name]" → Push Right 300ms. H2 "Submission Review."
Two-column 60/40:
LEFT: Creator info card — avatar 48px | handle H4 | platform + niche pills | follower count | content link (truncated, clickable) | creator notes (Body, bg-secondary card, 16px radius).
RIGHT: Review panel — white card, border, p:24px | Status badge | Verified views H3 accent-500 | Earnings H4 "₹[amount] owed" | "Approve Submission" (primary) | "Reject Submission" (danger outline) — each opens confirmation modal (modal-open 200ms) before status changes. Post-action: badge Smart Animates to new state + toast.
[BE:API] GET /api/campaigns/{id}/submissions/{submission_id}
[BE:API] PATCH /api/submissions/{id} { status: "approved" | "rejected" }

---

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PASTE 7 OF 7 — CARDS, FOOTER & ROUTING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SPREADEM PATCH v1.1 — Paste 7. Apply TOKEN BLOCK first. Do not change tokens, colors, or untouched components.

PATCH 14 — HOME CAMPAIGN CARD GRID FIX
Affected: Public/Landing/Desktop + Mobile — Live Campaign Feed section.
A. All 6 campaign cards must be identical COMP:CampaignCard instances with identical dimensions. Grid: CSS Grid, 3 columns desktop / 1 column mobile, gap 24px, align-items stretch so card heights match within each row. No card may be wider, shorter, or differently padded than its siblings.
B. "See all 847 campaigns →" link → On Click → Push Left 300ms → Public/Campaigns/Desktop. Scroll position resets to TOP of frame (hero/search bar area). Must not land at footer or any mid-page anchor.

PATCH 15 — FOOTER LINK ROUTING FIX
Affected: Footer on all frames. Fix all links currently routing to How It Works.

Platform column:
- Campaigns → Public/Campaigns/Desktop (Push Left 300ms)
- Find Creators → Public/FindCreators/Desktop (Push Left 300ms)
- How it Works → Public/HowItWorks/Desktop (Push Left 300ms)

Company column:
- About → Public/Landing/Desktop (placeholder, Push Left 300ms)
- Contact → external mailto:hello@spreadem.in

Legal column:
- Privacy Policy → System/Legal/Privacy/Desktop — if frame doesn't exist, create: centered text frame, H2 "Privacy Policy", placeholder body paragraphs, back nav "← Home."
- Terms of Service → System/Legal/Terms/Desktop — same structure.
- Refund Policy → System/Legal/Refund/Desktop — same structure.

Footer link style: 14px/400/DM Sans, text-secondary, no underline default, underline on hover, hover color text-primary, 200ms transition.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
END OF PATCH PROMPTS v1.1
Apply all 7 pastes in order. Verify checklist after all 7 are complete.