import React from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';



const Home = () => {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate('/login');
  };

  return (

    <div className='homepic'>
        <div>
        <h4>Why Compare Cars?</h4>
        <p><b>Comparing cars is essential for making an informed purchase decision. It helps you identify the best value for your budget, ensuring you get the most features and performance for your money. By evaluating different models, you can choose a vehicle that meets your specific needs and preferences, and avoid potential pitfalls of owning a less suitable car. Additionally, comparing cars can help you find options with better long-term reliability and resale value.</b></p>
        <h1>Car Comparison Site</h1>
    <div className="home-container">
      {/* <h1>Welcome to the Quiz App!</h1>
      <p>Get started by clicking the button below.</p> */}
      
      <button className="btnn btn-primaryy" onClick={handleStartClick}>
       <b>Let's Compare Cars</b> 
      </button>
    </div>
    </div>
    </div>
    
  );
};

export default Home;
