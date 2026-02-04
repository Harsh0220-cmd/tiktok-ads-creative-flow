import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CreateAd from "./pages/CreateAd";
import OAuthCallback from "./pages/OAuthCallback";
import { useAuth } from "./auth/useAuth";

export default function App() {
  const { isAuthenticated } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CreateAd />} />
        <Route path="/callback" element={<OAuthCallback />} />

        {/* fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
