import "./FooterStyles.css"

const Footer = () =>{
    return(
        <div className="footer">
            <div className="top">
                <div>
                    <h1>CogniCare</h1>
                    <p>Ready to listen to what your speech is saying? Sign up for CogniCare and empower yourself with early Alzheimer's detection.</p>
                </div>
                <div>
                    <a href="/">
                        <i className="fa-brands fa-facebook-square"></i>
                    </a>
                    <a href="/">
                        <i className="fa-brands fa-instagram-square"></i>
                    </a>
                    <a href="/">
                        <i className="fa-brands fa-behance-square"></i>
                    </a>
                    <a href="/">
                        <i className="fa-brands fa-whatsapp-square"></i>
                    </a>
                </div>
            </div>
            
            <div className="bottom">
                <div>
                    <h4>Community</h4>
                    <a href="/">Github</a>
                    <a href="/">Issues</a>
                    <a href="/">Project</a>
                </div>
                <div>
                    <h4>Help</h4>
                    <a href="/">Support</a>
                    <a href="/">Troubleshooting</a>
                    <a href="/contact">Contact Us</a>
                </div>
                <div>
                    <h4>Others</h4>
                    <a href="/">Terms Of Service</a>
                    <a href="/">Privacy Policy</a>
                    <a href="/">License</a>
                </div>
            </div>
        </div>
    )
}

export default Footer;