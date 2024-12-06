import "./DetectStyles.css";
import Recorder from "./Recorder";
import cookieTheft from "../assets/assessment-images/cookietheft.png"


function Detect() {
    return (
        <div className="assess-container">
            <h1>Take the Test</h1>
            <div className="test">
                <div className="assess-image">
                    <img src={cookieTheft} alt="cookie-theft" />
                </div>
                <div className="recording-container">
                    <h3>1. Look at the image</h3>
                    <ul>
                        <li>
                            2. Hit 'Start' button before you start speaking.
                        </li>
                        <li>
                            3. Describe what you see.</li>
                    </ul>
                    <Recorder />
                </div>
            </div>
        </div>
    )
}

export default Detect;