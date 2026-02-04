type Props = {
  disabled?: boolean;
};

export default function OAuthButton({ disabled }: Props) {
  function handleConnect() {
    // Simulate successful TikTok OAuth redirect
    window.location.href = "/callback?code=mock_auth_code";
  }

  return (
    <button disabled={disabled} onClick={handleConnect}>
      Connect TikTok Ads Account
    </button>
  );
}
