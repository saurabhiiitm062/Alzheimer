import Hero from "../components/Hero";
import NavBar from "../components/NavBar";
import aboutImg from "../assets/2.jpg";
import Footer from "../components/Footer";
import Detect from "../components/Detect";

function Assessment() {
  return (
    <>
      <NavBar />
      {/* <Hero cName="hero-mid" heroImg={aboutImg} title="CogniCare Assessment" /> */}
      <Detect />
      <Footer />
    </>
  );
}

export default Assessment;
