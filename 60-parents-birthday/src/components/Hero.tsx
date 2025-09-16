import reactLogo from "../assets/images/main-warm.jpg";
import Confetti from "./Confetti";

const NAME1 = "Olga Lucia Gomez Plata";
const NAME2 = "Ismar Rosendo Suarez Perez";

const Hero = () => {
  return (
    <>
    {/* <canvas id="canvas"></canvas> */}
      <section
        className="relative h-screen flex flex-col items-center justify-center text-center text-white-ivory"
        style={{
          backgroundImage: `url(${reactLogo})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-deep-blue opacity-80" />
        <Confetti></Confetti>
        <div className="relative z-10">
          <h1 className="text-5xl md:text-6xl font-playfair text-gold drop-shadow-lg">
            🎉 ¡Cumpleaños doble, alegría doble! 🎉
          </h1>
          <p className="mt-6 text-xl md:text-2xl font-raleway max-w-2xl mx-auto">
            Este 2025, <span className="text-coral">{NAME1}</span> y{" "}
            <span className="text-coral">{NAME2}</span> llegan al club de los
            60. Queremos que seas parte de esta gran celebración.
          </p>
        </div>
      </section>
    </>
  );
};

export default Hero;
