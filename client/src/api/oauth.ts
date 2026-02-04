import { ApiErrorCode } from "./errors";

type OAuthResponse = {
  accessToken: string;
  expiresIn: number;
};

export async function exchangeCodeForToken(
  code: string
): Promise<OAuthResponse> {
  await delay();

  // Simulated failures
  if (code === "invalid_client") {
    throwApiError("INVALID_CLIENT");
  }

  if (code === "missing_scope") {
    throwApiError("MISSING_SCOPE");
  }

  if (code === "revoked") {
    throwApiError("TOKEN_REVOKED");
  }

  // Success
  return {
    accessToken: "mock_access_token_" + Date.now(),
    expiresIn: 3600,
  };
}

function throwApiError(code: ApiErrorCode): never {
  throw { code };
}

function delay(ms = 500) {
  return new Promise((res) => setTimeout(res, ms));
}
