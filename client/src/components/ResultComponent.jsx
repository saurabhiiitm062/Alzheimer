import { useLocation } from 'react-router-dom';
import './ResultsStyles.css'


const ResultComponent = () => {
    const { state } = useLocation();
    const { Confidence, Prediction } = state?.result;

    const positive = <p>We regret to inform you that the assessment indicates a positive diagnosis for Alzheimer's disease. This is undoubtedly distressing news, and we understand that it may bring about a range of emotions. Please know that you are not alone, and support is available. It's essential to consult with a healthcare professional to discuss next steps, treatment options, and to receive personalized support and guidance. Remember, early detection and intervention can make a significant difference in managing Alzheimer's disease and improving quality of life. Please take the time you need to process this information and reach out to loved ones or support groups for emotional support.</p>

    const negative = <p>The assessment indicates a negative diagnosis for Alzheimer's disease. This is positive news, indicating that there are currently no signs of Alzheimer's disease detected in the assessment. While this is reassuring, it's essential to continue practicing healthy lifestyle habits to support brain health and overall well-being. Consider incorporating activities such as regular physical exercise, mental stimulation, a balanced diet, social engagement, and adequate sleep into your routine. Additionally, it's important to monitor any changes in cognitive function and seek medical attention if you or your loved ones notice any concerning symptoms. Remember to prioritize your health and well-being, and continue to stay informed about Alzheimer's disease and related conditions.</p>
    
    return (
        <div className="assess-container">
            <h1>Prediction Analysis</h1>
            <div className="analysis">
                <p>Prediction : { Prediction ? "Positive" : "Negative" }</p>
                <p>Confidence : { Prediction ? Confidence*100 : (1-Confidence)*100 }%</p>
            </div>
            <div className="result">
                { Prediction ? positive : negative }
            </div>
            <div className="button-container">
                <a className='start-button' href='/'>Back to Home</a>
                <a className='start-button' href='/assessment'>Back to Test</a>
            </div>
        </div>
    )
}

export default ResultComponent

