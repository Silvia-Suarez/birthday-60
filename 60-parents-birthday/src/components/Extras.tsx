import { useState } from "react";

const Extras = () => {
  const [showGallery, setShowGallery] = useState(false);

  return (
    <section className="bg-white-ivory py-16 text-center">
      <h2 className="text-3xl font-playfair text-deep-blue mb-8">✨ Extras divertidos ✨</h2>
      <p className="italic mb-4">“Frase célebre de mamá”</p>
      <p className="italic mb-8">“Frase célebre de papá”</p>
      
      <button
        onClick={() => setShowGallery(!showGallery)}
        className="px-4 py-2 bg-coral text-white-ivory rounded-full hover:bg-gold hover:text-deep-blue transition"
      >
        🎁 Ver fotos sorpresa
      </button>

      {showGallery && (
        <div className="mt-6 flex flex-wrap gap-4 justify-center">
          <img src="/images/foto1.jpg" className="w-40 h-40 object-cover rounded-lg shadow-md" />
          <img src="/images/foto2.jpg" className="w-40 h-40 object-cover rounded-lg shadow-md" />
        </div>
      )}
    </section>
  );
};

export default Extras;
