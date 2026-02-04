import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import ErrorBanner from "../components/ErrorBanner";

export default function OAuthCallback() {
  const navigate = useNavigate();
  const { handleOAuthCallback, loading, authError } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (code) {
      handleOAuthCallback(code).then(() => {
        navigate("/");
      });
    }
  }, []);

  return (
    <div>
      <h3>Connecting TikTok Ads Account...</h3>
      {loading && <p>Please wait...</p>}
      <ErrorBanner message={authError} />
    </div>
  );
}
