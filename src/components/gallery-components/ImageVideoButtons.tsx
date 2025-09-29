import { ImagePlus, Video } from "lucide-react";

type MemoryType = "old" | "party";

const CLOUD_NAME = "dfdteilro";
const PRESETS: Record<MemoryType, string> = {
  old: "old_memories",
  party: "party_photos",
};

const ImageVideoButtons = ({
  tab,
  setResultUrl,
  setIsUploading,
}: {
  tab: MemoryType;
  setResultUrl: (url: string | null) => void;
  setIsUploading: (isUploading: boolean) => void;
}) => {
  const handleUpload = async (file: File, type: MemoryType) => {
    setIsUploading(true);
    setResultUrl(null);
    try {
      const form = new FormData();
      form.append("file", file);
      form.append("upload_preset", PRESETS[type]);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`,
        {
          method: "POST",
          body: form,
        }
      );
      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      setResultUrl(data.secure_url as string);
    } catch (e) {
      alert("Hubo un error subiendo tu archivo. Intenta de nuevo.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
      <label className="flex items-center gap-3 p-4 rounded-xl border border-deep-blue/10 bg-white hover:bg-white/90 cursor-pointer transition">
        <ImagePlus className="text-gold" />
        <div>
          <div className="font-semibold text-gold">Subir imagen</div>
          <div className="text-xs text-deep-blue/70">JPG, PNG, WebP</div>
        </div>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleUpload(file, tab);
          }}
        />
      </label>

      <label className="flex items-center gap-3 p-4 rounded-xl border border-deep-blue/10 bg-white hover:bg-white/90 cursor-pointer transition">
        <Video className="text-gold" />
        <div>
          <div className="font-semibold text-gold">Subir video</div>
          <div className="text-xs text-deep-blue/70">MP4, MOV, HEVC</div>
        </div>
        <input
          type="file"
          accept="video/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleUpload(file, tab);
          }}
        />
      </label>
    </div>
  );
};

export default ImageVideoButtons;
