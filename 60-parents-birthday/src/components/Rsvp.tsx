const Rsvp = () => {
  return (
    <section className="bg-soft-pink py-16 text-center">
      <h2 className="text-2xl font-montserrat text-deep-blue mb-6">
        ¡Te esperamos!
        <p className="text-base">Haz clic en el botón para confirmar:</p>
      </h2>
      <a
        href="https://forms.gle/tu-link"
        target="_blank"
        className="px-6 py-3 bg-gold text-deep-blue font-bold text-lg rounded-full shadow-md hover:bg-deep-blue hover:text-gold transition"
      >
        👉 ¡Allá estaré!
      </a>
    </section>
  );
};

export default Rsvp;
