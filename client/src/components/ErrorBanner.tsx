type Props = {
  message: string | null;
  onClose?: () => void;
};

export default function ErrorBanner({ message, onClose }: Props) {
  if (!message) return null;

  return (
    <div style={{ background: "#fee", padding: 12, marginBottom: 16 }}>
      <strong>Error:</strong> {message}
      {onClose && (
        <button onClick={onClose} style={{ marginLeft: 10 }}>
          ✕
        </button>
      )}
    </div>
  );
}
