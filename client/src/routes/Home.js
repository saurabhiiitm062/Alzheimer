import Hero from "../components/Hero";
import NavBar from "../components/NavBar"
import homeImg from "../assets/image.png"
import Footer from "../components/Footer";

function Home (){
    return(
        <>
        <NavBar/>
        <Hero
        cName="hero"
        heroImg={homeImg}
        title="Welcome to CogniCare"
        text="Catch Alzheimer's in Its Track! A platform that monitors your cognitive health"
        buttonText="Start"
        url="/assessment"
        btnClass="show"
        />
        {/* <Introduction/> */}
        <Footer/>
        </>
    )
}

export default Home;