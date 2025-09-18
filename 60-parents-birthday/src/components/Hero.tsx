import reactLogo from "../assets/images/padres.jpg";
import Confetti from "./Confetti";

const NAME1 = "Olga Lucia Gomez Plata";
const NAME2 = "Ismar Rosendo Suarez Perez";

const Hero = () => {
  return (
    <>
      <section
        className="relative h-screen flex flex-col items-center justify-center text-center text-white-ivory"
        style={{
          backgroundImage: `url(${reactLogo})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-40" />
        <Confetti></Confetti>
        <div className="relative z-10 h-full w-full">
          <h1 className="text-5xl md:text-8xl w-full lg:text-9xl mt-4 font-dancing text-white text-center drop-shadow-2xl drop-shadow-white-ivory">
            ¡Doble cumpleaños, doble alegría!
          </h1>
          <p className="text-white-ivory text-4xl lg:text-6xl mt-52 lg:mt-64 w-3/4 mx-auto font-montserrat font-normal">
            {NAME2}{" "}
            <span className="text-3xl font-playfair">
              {" "}
              <br />&<br />
            </span>{" "}
            {NAME1}
          </p>
          <p className="absolute w-full text-xl bottom-5 md:text-4xl lg:text-5xl font-dancing px-8">
            ¡Llegan al club de los
            <span className="text-amber-300 drop-shadow-amber-300 drop-shadow-md text-6xl font-semibold">
              {" "}
              60's{" "}
            </span>
            !
          </p>
        </div>
      </section>
    </>
  );
};

export default Hero;
