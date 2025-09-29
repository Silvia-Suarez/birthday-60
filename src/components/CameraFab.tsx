import { Camera } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CameraFab = () => {
  const navigate = useNavigate();
  return (
    <button
      aria-label="Abrir galería"
      onClick={() => navigate("/gallery")}
      className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-gold text-deep-blue shadow-[0_10px_30px_rgba(255,215,0,0.4)] flex items-center justify-center active:scale-95 transition"
    >
      <Camera className="h-6 w-6" />
    </button>
  );
};

export default CameraFab;


