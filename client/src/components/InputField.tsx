type Props = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
};

export default function InputField({
  label,
  value,
  onChange,
  error,
}: Props) {
  return (
    <div style={{ marginBottom: 12 }}>
      <label>{label}</label>
      <br />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {error && (
        <div style={{ color: "red", fontSize: 12 }}>{error}</div>
      )}
    </div>
  );
}
