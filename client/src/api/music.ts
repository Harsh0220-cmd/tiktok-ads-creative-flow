import { ApiErrorCode } from "./errors";

export async function validateMusicId(musicId: string): Promise<void> {
  await delay();

  if (!musicId) {
    throwApiError("INVALID_MUSIC");
  }

  if (musicId.startsWith("bad")) {
    throwApiError("INVALID_MUSIC");
  }

  if (musicId.startsWith("geo")) {
    throwApiError("GEO_BLOCKED");
  }

  // otherwise valid
  return;
}

function throwApiError(code: ApiErrorCode): never {
  throw { code };
}

function delay(ms = 400) {
  return new Promise((res) => setTimeout(res, ms));
}
