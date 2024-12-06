
import NavBar from "../components/NavBar"
import Footer from "../components/Footer";
import ResultComponent from "../components/ResultComponent.jsx";

function Assessment (){
    return(
        <>
       <NavBar/>
        {/* <Hero
        cName="hero-mid"
        heroImg={aboutImg}
        title="CogniCare Assessment"
        /> */}
        <ResultComponent/>
        <Footer/>
        </>
    )
}

export default Assessment;