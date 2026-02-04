import { useState } from "react";
import OAuthButton from "../components/OAuthButton";
import ErrorBanner from "../components/ErrorBanner";
import InputField from "../components/InputField";
import MusicSelector from "../components/MusicSelector";
import { createAd } from "../api/ads";
import { mapApiError } from "../api/errors";
import { useAuth } from "../auth/useAuth";

export default function CreateAd() {
  const { accessToken, isAuthenticated, logout } = useAuth();

  const [campaignName, setCampaignName] = useState("");
  const [objective, setObjective] = useState<"TRAFFIC" | "CONVERSIONS">(
    "TRAFFIC",
  );
  const [adText, setAdText] = useState("");
  const [cta, setCta] = useState("");
  const [musicId, setMusicId] = useState<string | null>(null);

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function validateForm() {
    const errors: Record<string, string> = {};

    if (campaignName.trim().length < 3) {
      errors.campaignName =
        "Campaign name minimum 3 characters ka hona chahiye.";
    }

    if (!adText || adText.length > 100) {
      errors.adText = "Ad text required hai (max 100 characters).";
    }

    if (!cta) {
      errors.cta = "CTA required hai.";
    }

    if (objective === "CONVERSIONS" && !musicId) {
      errors.music = "Conversions ke liye music mandatory hai.";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit() {
    setGlobalError(null);
    setSuccess(null);

    if (!isAuthenticated()) {
      setGlobalError("Please connect TikTok Ads account first.");
      return;
    }

    if (!validateForm()) return;

    try {
      setSubmitting(true);

      const res = await createAd(
        {
          campaignName,
          objective,
          adText,
          cta,
          musicId: musicId || undefined,
        },
        accessToken,
      );

      setSuccess(`Ad successfully created. Ad ID: ${res.adId}`);

      // RESET FORM AFTER SUCCESS
      setCampaignName("");
      setCta("");
      setAdText("");
      setMusicId(null);
    } catch (err: any) {
      setGlobalError(mapApiError(err.code));
      if (err.code === "TOKEN_EXPIRED") {
        logout();
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div style={{ maxWidth: 500 }}>
      <h2>Create TikTok Ad</h2>

      {!isAuthenticated() && <OAuthButton />}

      <ErrorBanner message={globalError} />

      {success && <div style={{ color: "green" }}>{success}</div>}

      {/* ✅ Campaign Name (MISSING EARLIER) */}
      <InputField
        label="Campaign Name"
        value={campaignName}
        onChange={setCampaignName}
        error={fieldErrors.campaignName}
      />

      {/* CTA */}
      <InputField
        label="CTA"
        value={cta}
        onChange={setCta}
        error={fieldErrors.cta}
      />

      <div>
        <label>Objective</label>
        <br />
        <select
          value={objective}
          onChange={(e) => setObjective(e.target.value as any)}
        >
          <option value="TRAFFIC">Traffic</option>
          <option value="CONVERSIONS">Conversions</option>
        </select>
      </div>

      <InputField
        label="Ad Text"
        value={adText}
        onChange={setAdText}
        error={fieldErrors.adText}
      />

      <MusicSelector
        objective={objective}
        onValidMusic={(id) => setMusicId(id)}
      />

      {fieldErrors.music && (
        <div style={{ color: "red" }}>{fieldErrors.music}</div>
      )}

      <button disabled={submitting || !!success} onClick={handleSubmit}>
        {submitting ? "Submitting..." : "Submit Ad"}
      </button>
    </div>
  );
}
