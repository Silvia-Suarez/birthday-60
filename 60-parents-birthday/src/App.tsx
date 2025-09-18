import Hero from "./components/Hero";
import Countdown from "./components/Countdown";
import Timeline from "./components/Timeline";
import PartyDetails from "./components/PartyDetails";
import Rsvp from "./components/Rsvp";
import Extras from "./components/Extras";
import Footer from "./components/Footer";
import FunFacts from "./components/FunFacts";
import "./App.css";

function App() {
  return (
    <>
      <Hero />
      <Countdown />
      <FunFacts></FunFacts>
      <Timeline />
      <PartyDetails />
      <Rsvp />
      <Extras />
      <Footer />
    </>
  );
}

export default App;
