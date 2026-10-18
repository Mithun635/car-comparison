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
      <h1 className="custom-h1">Car Comparison Site</h1>
      <div className="home-container">
    
      <button className="btnn btn-primaryy m-3" onClick={handleStartClick}>
       <b>Let's Compare Cars</b> 
      </button>
    </div>
    </div>
   
    
  );
};

export default Home;
