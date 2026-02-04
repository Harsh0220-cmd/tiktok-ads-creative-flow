import { useEffect, useState } from "react";
import { exchangeCodeForToken } from "../api/oauth";
import { mapApiError } from "../api/errors";

const TOKEN_KEY = "tiktok_access_token";
const EXPIRY_KEY = "tiktok_token_expiry";

export function useAuth() {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Load token from storage on app start
  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    const expiry = localStorage.getItem(EXPIRY_KEY);

    if (token && expiry && Date.now() < Number(expiry)) {
      setAccessToken(token);
    } else {
      clearAuth();
    }
  }, []);

  // OAuth callback handler
  async function handleOAuthCallback(code: string) {
    setLoading(true);
    setAuthError(null);

    try {
      const res = await exchangeCodeForToken(code);

      const expiryTime = Date.now() + res.expiresIn * 1000;

      localStorage.setItem(TOKEN_KEY, res.accessToken);
      localStorage.setItem(EXPIRY_KEY, expiryTime.toString());

      setAccessToken(res.accessToken);
    } catch (err: any) {
      setAuthError(mapApiError(err.code));
      clearAuth();
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    clearAuth();
    setAccessToken(null);
  }

  function clearAuth() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(EXPIRY_KEY);
  }

  function isAuthenticated() {
    return Boolean(accessToken);
  }

  return {
    accessToken,
    isAuthenticated,
    loading,
    authError,
    handleOAuthCallback,
    logout,
  };
}
