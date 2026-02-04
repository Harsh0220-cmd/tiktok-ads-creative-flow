import { ApiErrorCode } from "./errors";

type CreateAdPayload = {
  campaignName: string;
  objective: "TRAFFIC" | "CONVERSIONS";
  adText: string;
  cta: string;
  musicId?: string;
};

export async function createAd(
  payload: CreateAdPayload,
  accessToken: string | null
): Promise<{ adId: string }> {
  await delay();

  if (!accessToken) {
    throwApiError("TOKEN_EXPIRED");
  }

  if (accessToken.startsWith("expired")) {
    throwApiError("TOKEN_EXPIRED");
  }

  // Simulate geo restriction at submit time
  if (payload.campaignName.toLowerCase().includes("geo")) {
    throwApiError("GEO_BLOCKED");
  }

  return {
    adId: "ad_" + Math.floor(Math.random() * 100000),
  };
}

function throwApiError(code: ApiErrorCode): never {
  throw { code };
}

function delay(ms = 600) {
  return new Promise((res) => setTimeout(res, ms));
}
