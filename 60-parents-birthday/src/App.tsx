import Hero from "./components/Hero";
import Countdown from "./components/Countdown";
import Timeline from "./components/Timeline";
import PartyDetails from "./components/PartyDetails";
import Rsvp from "./components/Rsvp";
import Footer from "./components/Footer";
import FunFacts from "./components/FunFacts";
import "./App.css";
import FunFactsMobile from "./components/FunFactsMobile";

function App() {
  return (
    <>
      <Hero />
      <Countdown />
      <FunFacts></FunFacts>
      <FunFactsMobile></FunFactsMobile>
      <Timeline />
      <PartyDetails />
      <Rsvp />
      <Footer />
    </>
  );
}

export default App;
