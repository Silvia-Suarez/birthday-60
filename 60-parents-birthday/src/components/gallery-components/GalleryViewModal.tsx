import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { createPortal } from "react-dom";

const GalleryViewModal = ({ items }: { items: any[] }) => {
  const [selected, setSelected] = useState<number | null>(null);
  const nextCard = () => {
    if (selected === null) return;
    setSelected((selected + 1) % items.length);
  };

  const prevCard = () => {
    if (selected === null) return;
    setSelected((selected - 1 + items.length) % items.length);
  };
  return (
    <div>
      <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((it, idx) => (
          <div
            key={idx}
            onClick={() => setSelected(idx)}
            role="button"
            tabIndex={0}
            className="block group cursor-pointer focus:outline-none"
          >
            {it.type === "image" ? (
              <img
                src={it.thumb}
                alt="memoria"
                className="w-full h-40 object-cover rounded-xl border border-white/70 shadow group-hover:opacity-90 transition"
              />
            ) : (
              <div className="relative w-full h-40 rounded-xl overflow-hidden border border-white/70 shadow">
                <video
                  src={it.url}
                  className="w-full h-full object-cover"
                  muted
                  playsInline
                />
                <div className="absolute inset-0 bg-black/20" />
              </div>
            )}
          </div>
        ))}
      </div>

      {selected !== null &&
        createPortal(
          <AnimatePresence>
            <motion.div
              className="fixed inset-0 top-0 left-0 h-screen bg-black/80 flex w-screen items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                key={selected}
                className=" bg-white rounded-2xl shadow-2xl p-6 max-w-fit w-full"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              >
                <button
                  className="absolute top-3 right-3 text-gray-600 hover:text-red-500"
                  onClick={() => setSelected(null)}
                >
                  <X size={28} />
                </button>
                {items[selected].type === "image" ? (
                  <img
                    src={items[selected].thumb}
                    alt="memoria"
                    className="w-full h-full object-contain rounded-xl border border-white/70 shadow"
                  />
                ) : (
                  <div className="relative w-full h-full rounded-xl overflow-hidden border border-white/70 shadow">
                    <video
                      src={items[selected].url}
                      className="w-full h-full object-contain"
                      muted
                      autoPlay
                    />
                    <div className="absolute inset-0 bg-black/20" />
                  </div>
                )}

                <div className="flex justify-between mt-6">
                  <button
                    onClick={prevCard}
                    className="bg-coral text-white p-2 rounded-full hover:bg-gold hover:text-deep-blue"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={nextCard}
                    className="bg-coral text-white p-2 rounded-full hover:bg-gold hover:text-deep-blue"
                  >
                    <ChevronRight size={24} />
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
};

export default GalleryViewModal;
