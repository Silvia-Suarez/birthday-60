const Rsvp = () => {
  return (
    <section className="bg-soft-pink py-16 font-montserrat text-center">
      <h2 className="text-5xl font-bold text-deep-blue mb-6">
        ¡Te esperamos!
        <p className="text-base pt-2">Haz clic en el botón para confirmar:</p>
      </h2>
      <a
        href="https://wa.me/+573147105676?text=Confirmo%20mi%20asistencia%20al%20cumpleaños"
        target="_blank"
        className="px-6 py-3 bg-gold text-deep-blue font-bold text-lg rounded-full shadow-md hover:bg-deep-blue hover:text-gold transition"
      >
        👉 ¡Allá estaré!
      </a>
    </section>
  );
};

export default Rsvp;
