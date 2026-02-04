export type ApiErrorCode =
  | "INVALID_CLIENT"
  | "MISSING_SCOPE"
  | "TOKEN_EXPIRED"
  | "TOKEN_REVOKED"
  | "INVALID_MUSIC"
  | "GEO_BLOCKED"
  | "UNKNOWN";

export function mapApiError(code: ApiErrorCode): string {
  switch (code) {
    case "INVALID_CLIENT":
      return "TikTok app configuration invalid hai.";
    case "MISSING_SCOPE":
      return "Ads permission missing hai. Dobara connect karo.";
    case "TOKEN_EXPIRED":
      return "Session expire ho gaya. Please reconnect.";
    case "TOKEN_REVOKED":
      return "Access revoke ho chuka hai. Dobara login karo.";
    case "INVALID_MUSIC":
      return "Music ID invalid hai ya available nahi hai.";
    case "GEO_BLOCKED":
      return "TikTok Ads aapke region me available nahi hai.";
    default:
      return "Kuch galat ho gaya. Please try again.";
  }
}
