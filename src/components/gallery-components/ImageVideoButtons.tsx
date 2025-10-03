import { useState } from "react";
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
  onUploadSuccess,
}: {
  tab: MemoryType;
  setResultUrl: (url: string | null) => void;
  setIsUploading: (isUploading: boolean) => void;
  onUploadSuccess?: () => void;
}) => {
  const [uploadProgress, setUploadProgress] = useState<{[key: string]: number}>({});
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const handleUpload = async (files: FileList, type: MemoryType) => {
    setIsUploading(true);
    setResultUrl(null);
    setUploadedFiles([]);
    setUploadProgress({});
    
    const fileArray = Array.from(files);
    const uploadPromises = fileArray.map(async (file, index) => {
      const fileId = `${file.name}-${index}`;
      
      try {
        setUploadProgress(prev => ({ ...prev, [fileId]: 0 }));
        
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
        
        setUploadProgress(prev => ({ ...prev, [fileId]: 100 }));
        
        return { success: true, url: data.secure_url, fileId };
      } catch (e) {
        setUploadProgress(prev => ({ ...prev, [fileId]: -1 })); // -1 indicates error
        return { success: false, error: e, fileId };
      }
    });

    try {
      const results = await Promise.all(uploadPromises);
      const successfulUploads = results.filter(r => r.success).map(r => r.url);
      
      if (successfulUploads.length > 0) {
        setUploadedFiles(successfulUploads);
        // Set the first uploaded file as the main result URL for backward compatibility
        setResultUrl(successfulUploads[0]);
        
        // Trigger refresh after successful upload
        if (onUploadSuccess) {
          setTimeout(() => {
            onUploadSuccess();
          }, 1000);
        }
      }
      
      const failedUploads = results.filter(r => !r.success);
      if (failedUploads.length > 0) {
        alert(`Hubo un error subiendo ${failedUploads.length} archivo(s). Los demás se subieron correctamente.`);
      }
    } catch (e) {
      alert("Hubo un error subiendo algunos archivos. Revisa los archivos que fallaron e intenta de nuevo.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="mt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label className="flex items-center gap-3 p-4 rounded-xl border border-deep-blue/10 bg-white hover:bg-white/90 cursor-pointer transition">
          <ImagePlus className="text-gold" />
          <div>
            <div className="font-semibold text-gold">Subir imágenes</div>
            <div className="text-xs text-deep-blue/70">JPG, PNG, WebP (múltiples)</div>
          </div>
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => {
              const files = e.target.files;
              if (files && files.length > 0) handleUpload(files, tab);
            }}
          />
        </label>

        <label className="flex items-center gap-3 p-4 rounded-xl border border-deep-blue/10 bg-white hover:bg-white/90 cursor-pointer transition">
          <Video className="text-gold" />
          <div>
            <div className="font-semibold text-gold">Subir videos</div>
            <div className="text-xs text-deep-blue/70">MP4, MOV, HEVC (múltiples)</div>
          </div>
          <input
            type="file"
            accept="video/*"
            multiple
            className="hidden"
            onChange={(e) => {
              const files = e.target.files;
              if (files && files.length > 0) handleUpload(files, tab);
            }}
          />
        </label>
      </div>

      {/* Upload Progress */}
      {Object.keys(uploadProgress).length > 0 && (
        <div className="mt-4 space-y-2">
          <div className="text-sm font-semibold text-deep-blue">
            Subiendo archivos...
          </div>
          {Object.entries(uploadProgress).map(([fileId, progress]) => {
            const fileName = fileId.split('-').slice(0, -1).join('-');
            const isError = progress === -1;
            const isComplete = progress === 100;
            
            return (
              <div key={fileId} className="space-y-1">
                <div className="flex justify-between text-xs text-deep-blue/70">
                  <span className="truncate">{fileName}</span>
                  <span>
                    {isError ? 'Error' : isComplete ? 'Completado' : `${progress}%`}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      isError 
                        ? 'bg-red-500' 
                        : isComplete 
                        ? 'bg-green-500' 
                        : 'bg-gold'
                    }`}
                    style={{ width: isError ? '100%' : `${Math.max(progress, 0)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Uploaded Files Summary */}
      {uploadedFiles.length > 0 && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="text-sm font-semibold text-green-800">
            ✅ {uploadedFiles.length} archivo{uploadedFiles.length > 1 ? 's' : ''} subido{uploadedFiles.length > 1 ? 's' : ''} exitosamente
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageVideoButtons;
