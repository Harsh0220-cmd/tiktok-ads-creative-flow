// Campaign name
export function validateCampaignName(name: string): string | null {
  if (!name || name.trim().length < 3) {
    return "Campaign name minimum 3 characters ka hona chahiye.";
  }
  return null;
}

// Ad text
export function validateAdText(text: string): string | null {
  if (!text) {
    return "Ad text required hai.";
  }
  if (text.length > 100) {
    return "Ad text 100 characters se zyada nahi ho sakta.";
  }
  return null;
}

// CTA
export function validateCTA(cta: string): string | null {
  if (!cta) {
    return "CTA required hai.";
  }
  return null;
}

// Music vs Objective rule (IMPORTANT)
export function validateMusicRule(
  objective: "TRAFFIC" | "CONVERSIONS",
  musicId: string | null
): string | null {
  if (objective === "CONVERSIONS" && !musicId) {
    return "Conversions objective ke liye music mandatory hai.";
  }
  return null;
}
