import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

// Helper function para acceder a localStorage de forma segura
const getLocalStorageItem = (key: string): string | null => {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      return localStorage.getItem(key);
    }
  } catch (error) {
    // localStorage no está disponible (modo incógnito, restricciones de seguridad, etc.)
    console.warn("localStorage no está disponible:", error);
  }
  return null;
};

const setLocalStorageItem = (key: string, value: string): void => {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem(key, value);
    }
  } catch (error) {
    // localStorage no está disponible
    console.warn("No se pudo guardar en localStorage:", error);
  }
};

const LastMinuteModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Verificar si el usuario ya cerró el modal antes (usando localStorage)
    const hasSeenModal = getLocalStorageItem("lastMinuteModalSeen");
    if (!hasSeenModal) {
      setIsOpen(true);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    // Guardar en localStorage que el usuario vio el modal
    setLocalStorageItem("lastMinuteModalSeen", "true");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 md:p-10"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Cerrar"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>

            <div className="text-center">
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-6"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-coral mb-2 font-dancing">
                  ¡Última Hora!
                </h2>
                <div className="w-20 h-1 bg-gold mx-auto rounded-full"></div>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="space-y-4 text-deep-blue"
              >
                <p className="text-lg leading-relaxed">
                  Queremos extender la invitación a una misa en honor a los
                  homenajeados
                </p>

                <div className="mt-6 space-y-3 bg-gradient-to-br from-soft-pink/30 to-white p-6 rounded-xl border border-soft-pink/50">
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <span className="text-2xl">📍</span>
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-gold mb-1">Lugar:</div>
                      <a
                        href="https://maps.app.goo.gl/pmS1vj9G4bVgptZcA"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-deep-blue hover:text-coral underline transition-colors"
                      >
                        Templo Nuestra Señora de Chiquinquirá
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <span className="text-2xl">🕐</span>
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-gold mb-1">Hora:</div>
                      <div className="text-deep-blue text-xl font-bold">
                        5:00pm
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-8"
              >
                <button
                  onClick={handleClose}
                  className="px-8 py-3 bg-coral text-white rounded-full font-semibold hover:bg-coral/90 transition-colors shadow-lg hover:shadow-xl"
                >
                  Entendido
                </button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LastMinuteModal;

