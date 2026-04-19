import { createBrowserRouter } from "react-router";
import { Layout } from "./Layout";
import { Home } from "./pages/Home";
import { Campaigns } from "./pages/Campaigns";
import { Creators } from "./pages/Creators";
import { HowItWorks } from "./pages/HowItWorks";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { ForgotPassword } from "./pages/ForgotPassword";
import { VerifyEmail } from "./pages/VerifyEmail";
import { SessionExpired } from "./pages/SessionExpired";
import { OnboardingBrand } from "./pages/OnboardingBrand";
import { OnboardingCreator } from "./pages/OnboardingCreator";
import { PendingStatus } from "./pages/PendingStatus";
import { BrandLayout } from "./BrandLayout";
import { BrandDashboard } from "./pages/BrandDashboard";
import { CreateCampaign } from "./pages/CreateCampaign";
import { CampaignDetail } from "./pages/CampaignDetail";
import { PaymentSelect } from "./pages/PaymentSelect";
import { PaymentProcessing } from "./pages/PaymentProcessing";
import { PaymentSuccess } from "./pages/PaymentSuccess";
import { PaymentFailed } from "./pages/PaymentFailed";
import { CreatorLayout } from "./CreatorLayout";
import { CreatorDashboard } from "./pages/CreatorDashboard";
import { CreatorBrowse } from "./pages/CreatorBrowse";
import { CreatorCampaignDetail } from "./pages/CreatorCampaignDetail";
import { CreatorSubmissions } from "./pages/CreatorSubmissions";
import { CreatorEarnings } from "./pages/CreatorEarnings";
import { BrandAccount } from "./pages/BrandAccount";
import { CreatorAccount } from "./pages/CreatorAccount";
import { BrandCreators } from "./pages/BrandCreators";
import { Notifications } from "./pages/Notifications";
import { SubmissionReview } from "./pages/SubmissionReview";
import { LegalPage } from "./pages/LegalPage";
import { CreatorProfile } from "./pages/CreatorProfile";
import { NotFound } from "./pages/NotFound";
import { Unauthorized } from "./pages/Unauthorized";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "campaigns", Component: Campaigns },
      { path: "creators", Component: Creators },
      { path: "creators/:id", Component: CreatorProfile },
      { path: "how-it-works", Component: HowItWorks },
      { path: "signup", Component: Signup },
      { path: "signin", Component: Signin },
      { path: "forgot-password", Component: ForgotPassword },
      { path: "auth/forgot-password", Component: ForgotPassword },
      { path: "auth/verify-email", Component: VerifyEmail },
      { path: "auth/session-expired", Component: SessionExpired },
      { path: "onboarding/brand", Component: OnboardingBrand },
      { path: "onboarding/creator", Component: OnboardingCreator },
      { path: "pending", Component: PendingStatus },
      { path: "unauthorized", Component: Unauthorized },
      { path: "legal/:type", Component: LegalPage },
    ],
  },
  {
    path: "/brand",
    Component: BrandLayout,
    children: [
      { path: "dashboard", Component: BrandDashboard },
      { path: "campaigns", Component: BrandDashboard },
      { path: "campaigns/new", Component: CreateCampaign },
      { path: "campaigns/:id", Component: CampaignDetail },
      { path: "campaigns/:id/submissions/:submissionId", Component: SubmissionReview },
      { path: "payment/select-method", Component: PaymentSelect },
      { path: "payment/processing", Component: PaymentProcessing },
      { path: "payment/success", Component: PaymentSuccess },
      { path: "payment/failed", Component: PaymentFailed },
      { path: "account", Component: BrandAccount },
      { path: "creators", Component: BrandCreators },
      { path: "creators/:id", Component: CreatorProfile },
      { path: "notifications", Component: Notifications },
    ],
  },
  {
    path: "/creator",
    Component: CreatorLayout,
    children: [
      { path: "dashboard", Component: CreatorDashboard },
      { path: "campaigns", Component: CreatorBrowse },
      { path: "campaigns/:id", Component: CreatorCampaignDetail },
      { path: "submissions", Component: CreatorSubmissions },
      { path: "earnings", Component: CreatorEarnings },
      { path: "account", Component: CreatorAccount },
      { path: "notifications", Component: Notifications },
    ],
  },
  {
    path: "*",
    Component: NotFound,
  },
]);