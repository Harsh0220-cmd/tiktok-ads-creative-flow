import { useState } from "react";
import { validateMusicId } from "../api/music";
import { mapApiError } from "../api/errors";

type Props = {
  objective: "TRAFFIC" | "CONVERSIONS";
  onValidMusic: (musicId: string | null) => void;
};

export default function MusicSelector({ objective, onValidMusic }: Props) {
  const [option, setOption] = useState<"EXISTING" | "UPLOAD" | "NONE">("EXISTING");
  const [musicId, setMusicId] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function handleValidate(id: string) {
    try {
      await validateMusicId(id);
      setError(null);
      onValidMusic(id);
    } catch (err: any) {
      setError(mapApiError(err.code));
      onValidMusic(null);
    }
  }

  function handleOptionChange(value: typeof option) {
    setOption(value);
    setError(null);

    if (value === "NONE") {
      if (objective === "CONVERSIONS") {
        setError("Conversions objective ke liye music mandatory hai.");
        onValidMusic(null);
      } else {
        onValidMusic(null);
      }
    }
  }

  return (
    <div>
      <h4>Music Selection</h4>

      <select value={option} onChange={(e) => handleOptionChange(e.target.value as any)}>
        <option value="EXISTING">Existing Music ID</option>
        <option value="UPLOAD">Upload / Custom Music</option>
        <option value="NONE">No Music</option>
      </select>

      {option !== "NONE" && (
        <>
          <input
            placeholder="Enter Music ID"
            value={musicId}
            onChange={(e) => setMusicId(e.target.value)}
          />
          <button onClick={() => handleValidate(musicId)}>
            Validate Music
          </button>
        </>
      )}

      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
}
