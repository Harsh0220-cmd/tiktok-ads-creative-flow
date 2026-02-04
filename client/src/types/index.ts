// Objectives
export type Objective = "TRAFFIC" | "CONVERSIONS";

// Music selection options
export type MusicOption = "EXISTING" | "UPLOAD" | "NONE";

// OAuth / Auth
export type AuthState = {
  accessToken: string | null;
  isAuthenticated: boolean;
};

// Ad form data
export type AdPayload = {
  campaignName: string;
  objective: Objective;
  adText: string;
  cta: string;
  musicId?: string;
};

// API Error shape (mocked)
export type ApiError = {
  code: string;
};
