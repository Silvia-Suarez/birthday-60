import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ImageVideoButtons from "../components/gallery-components/ImageVideoButtons";
import GalleryViewModal from "../components/gallery-components/GalleryViewModal";

type MemoryType = "old" | "party";

const Gallery = () => {
  const [tab, setTab] = useState<MemoryType>("old");
  const [isUploading, setIsUploading] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [items, setItems] = useState<
    Array<{ url: string; thumb: string; type: "image" | "video" }>
  >([]);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const key = tab === "old" ? "old_memories" : "party";
        const res = await fetch(`/api/media/${key}`);
        if (!res.ok) throw new Error("failed");
        const data = await res.json();
        const mapped = (data.resources || []).map((r: any) => ({
          url: r.secure_url as string,
          thumb: r.thumbnail_url as string,
          type: (r.resource_type === "video" ? "video" : "image") as
            | "image"
            | "video",
        }));
        setItems(mapped);
      } catch {
        setItems([]);
      }
    };
    load();
  }, [tab]);

  return (
    <section className="min-h-screen bg-gradient-to-b from-soft-pink via-white/40 to-soft-pink pt-6 pb-16 px-4 font-montserrat">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="rounded-full p-2 bg-white/70 backdrop-blur border border-white/60 shadow hover:bg-white transition"
            aria-label="Volver"
          >
            <ArrowLeft />
          </button>
          <h1 className="text-3xl md:text-4xl font-bold font-dancing text-gold">
            Galería
          </h1>
        </div>

        <div className="mt-6 grid grid-cols-2 bg-white/60 border border-white/60 rounded-xl ">
          <button
            onClick={() => setTab("old")}
            className={`py-3 text-center font-semibold ${
              tab === "old" ? "bg-white text-coral" : "text-coral/70"
            }`}
          >
            Recuerdos antiguos
          </button>
          <button
            onClick={() => setTab("party")}
            className={`py-3 text-center font-semibold ${
              tab === "party" ? "bg-white text-coral" : "text-coral/70"
            }`}
          >
            Recuerdos de la fiesta
          </button>
        </div>

        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="mt-8 bg-white/60 backdrop-blur border border-white/60 rounded-2xl p-6 shadow"
        >
          <h2 className="text-xl font-semibold text-coral">
            {tab === "old"
              ? "Sube un recuerdo que tengas con los cumpleañeros"
              : "Aún no puedes subir recuerdos"}
          </h2>
          {tab !== "old" && (
            <p className="mt-2 text-deep-blue/70 text-sm">
              Pero cuando llegue el momento, podrás subir todos los mejores de
              la fiesta.
            </p>
          )}
          {tab === "old" && (
            <ImageVideoButtons
              tab={tab}
              setResultUrl={setResultUrl}
              setIsUploading={setIsUploading}
            />
          )}

          {isUploading && <p className="mt-6 text-deep-blue">Subiendo…</p>}

          {resultUrl && (
            <div className="mt-6">
              <a
                href={resultUrl}
                target="_blank"
                rel="noreferrer"
                className="text-deep-blue underline"
              >
                Ver archivo subido
              </a>
            </div>
          )}

          <GalleryViewModal items={items}></GalleryViewModal>
          {!items.length && tab === "old" && (
            <p className="col-span-full text-deep-blue/70">
              Aún no hay recuerdos aquí… ¡Sé el primero en subir uno!
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Gallery;
