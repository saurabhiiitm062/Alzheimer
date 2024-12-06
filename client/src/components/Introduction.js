import Mountain1 from "../assets/1.jpg"
import Mountain2 from "../assets/2.jpg"
import Mountain3 from "../assets/5.jpg"
import Mountain4 from "../assets/8.jpg"
import IntroductionData from "./IntroductionData"
import "./IntroductionStyles.css"

const Introduction = () => {
  return (
    <div className="Introduction">
      <h1>What is Alzheimer's? </h1>
      <p></p>
      
      <IntroductionData
        className="first-des"
        heading="Capturing the Essence:"
        text="What is Alzheimer's? Alzheimer's disease is a progressive neurological disorder that affects memory, thinking skills, and behavior. It is the most common cause of dementia, a general term for a decline in cognitive function severe enough to interfere with daily life."
        img1={Mountain1}
        img2={Mountain2}
      />
      <IntroductionData
        className="first-des-reverse"
        heading="Understanding the impact"
        text="Alzheimer's not only affects individuals but also their loved ones, caregivers, and communities. It's a journey marked by resilience, compassion, and the unwavering commitment to support those affected by the disease."
        img1={Mountain3}
        img2={Mountain4}
      />
    </div>
  );
};

export default Introduction;
