import Hero from "../components/Hero";
import NavBar from "../components/NavBar"
import aboutImg from "../assets/about.png"
import Footer from "../components/Footer";
import AboutUs from "../components/AboutUs";

function About (){
    return(
        <>
       <NavBar/>
        <Hero
        cName="hero-mid"
        heroImg={aboutImg}
        title="About"
        />
        <AboutUs/>
        <Footer/>
        </>
    )
}

export default About;