import Hero from "../components/Hero";
import NavBar from "../components/NavBar"
import contactImg from "../assets/contact.png"
import Footer from "../components/Footer";
import ContactForm from "../components/ContactForm";

function Contact (){
    return(
        <>
       <NavBar/>
        <Hero
        cName="hero-mid"
        heroImg={contactImg}
        title="Contact Us"
        />
        <ContactForm/>
        <Footer/>
        </>
    )
}

export default Contact;