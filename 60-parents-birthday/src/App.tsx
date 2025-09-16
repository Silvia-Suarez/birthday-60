// import { useState } from "react";
// import reactLogo from "./assets/images/main-warm.jpg";
// import viteLogo from "/vite.svg";
// import "./App.css";

// function App() {
//   // const [count, setCount] = useState(0)

//   return (
//     <>
//       <div className="bg-white-ivory min-h-screen w-full text-deep-blue font-sans">
//         {/* Hero */}
//         <section className="text-center py-20 bg-gradient-to-b from-white-ivory to-coral/10">
//           <h1 className="text-5xl font-bold font-poppins mb-4 text-coral">
//             ¡Están invitados!
//           </h1>
//           <p className="text-6xl mb-6 px-12 font-raleway">
//             60 años de <p className="font-playfair text-3xl">Ismar Rosendo Suarez Perez</p> <p className="text-2xl">&</p>
//             <p className="font-playfair text-3xl">Olga Lucía Gómez Plata</p> 🎉
//           </p>
//           <div className="flex justify-center">
//             <img
//               src={reactLogo}
//               alt="Foto de los cumpleañeros"
//               className="w-50 h-full rounded-full border-4 border-gold shadow-lg"
//             />
//           </div>
//         </section>

//         {/* Detalles */}
//         <section className="py-16 max-w-3xl mx-auto text-center">
//           <h2 className="text-3xl font-semibold mb-6">Detalles del evento</h2>
//           <ul className="space-y-4 text-lg">
//             <li>📍 Lugar: [Dirección]</li>
//             <li>📅 Fecha: [Día/Mes/Año]</li>
//             <li>⏰ Hora: [Hora]</li>
//           </ul>
//         </section>

//         {/* Mensaje */}
//         <section className="bg-deep-blue text-white-ivory py-16 text-center">
//           <p className="text-2xl italic mb-4">
//             “60 años de vida, amor y memorias. Y apenas comienza la fiesta 🎊”
//           </p>
//         </section>

//         {/* Confirmación */}
//         <section className="py-16 text-center">
//           <a
//             href="https://wa.me/+573147105676?text=Confirmo%20mi%20asistencia%20al%20cumpleaños"
//             target="_blank"
//             className="bg-coral text-white px-8 py-4 rounded-full text-xl font-bold shadow-lg hover:bg-gold hover:text-deep-blue transition"
//           >
//             Confirmar asistencia
//           </a>
//         </section>

//         {/* Footer */}
//         <footer className="text-center py-6 text-sm text-deep-blue/70">
//           Con mucho amor 💖 – Silvia Natalia Suarez Gomez © 2025
//         </footer>
//       </div>
//     </>
//   );
// }
import Hero from "./components/Hero";
import Countdown from "./components/Countdown";
import Timeline from "./components/Timeline";
import PartyDetails from "./components/PartyDetails";
import Rsvp from "./components/Rsvp";
import Extras from "./components/Extras";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Hero />
      <Countdown />
      <Timeline />
      <PartyDetails />
      <Rsvp />
      <Extras />
      <Footer />
    </>
  );
}

// export default App;

export default App;
