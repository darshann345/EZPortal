import React, { useState } from "react";
import './App.css';
import EZLogo from './assets/EZLogo.jpeg';
import DataProcessing from './assets/Data Processing.jpg';
import PresentationDesign from './assets/Presentation Design.jpg';
import TransulationService from './assets/Transulation Services.jpg';
import ResearchAndAnalatics from './assets/Research & Analatics.jpg';
import GraphicDesign from './assets/Graphic Design.jpg';
import AudioVideoProduction from './assets/Audio Video Production.jpg';
import Card from "../src/Card";

function App() {
  const [cardData] = useState([
    { id: 1, img: PresentationDesign, title: "Presentation Design", description: "Lorem ipsum dolar sit amet, lorem ipsum dolar sit amet. Lorem ipsum dolar sit amet" },
    { id: 2, img: AudioVideoProduction, title: "Audio - Visual Production", description: "Lorem ipsum dolar sit amet, lorem ipsum dolar sit amet. Lorem ipsum dolar sit amet" },
    { id: 3, img: TransulationService, title: "Transulation Service", description: "Lorem ipsum dolar sit amet, lorem ipsum dolar sit amet. Lorem ipsum dolar sit amet" },
    { id: 4, img: GraphicDesign, title: "Graphic Design", description: "Lorem ipsum dolar sit amet, lorem ipsum dolar sit amet. Lorem ipsum dolar sit amet" },
    { id: 5, img: ResearchAndAnalatics, title: "Research & Analytics", description: "Lorem ipsum dolar sit amet, lorem ipsum dolar sit amet. Lorem ipsum dolar sit amet" },
    { id: 6, img: DataProcessing, title: "Data Processing", description: "Lorem ipsum dolar sit amet, lorem ipsum dolar sit amet. Lorem ipsum dolar sit amet" },
  ]);
  
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState('');


  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setError('Email is required');
      return;
    }

    if (!validateEmail(email)) {
      setError('Invalid email format');
      return;
    }

    try {
      const response = await fetch('https://test.ezworks.ai/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setSuccessMessage('Form Submitted');
        setEmail('');
        setError('');

      } else if (response.status === 422) {
        const data = await response.json();
        if (data.detail && Array.isArray(data.detail)) {
          setError(data.detail[0].msg || 'An error occurred');
        } else {
          setError('An error occurred');
        }
      } else {
        setError('An unexpected error occurred');
      }
    } catch (error) {
      setError('An error occurred while submitting the form');
    }
  };


  return (
    <>
      <div className="container">
        <div>
          <div className="logo">
            <img src={EZLogo} className="logo-img" alt="EZ Logo" height="50px" />
            <h1 className="logo-txt">Works</h1>
            <h3 className="tag-line">A Suite Of Business Support Services</h3>
            <br/>
          </div>
          <p className="description">
            Lorem ipsum dolar sit amet, consectetur adipiscing<br />
            elit, sed do eiusmod tempor incididunt... Lorem<br />
            ipsum dolar sit amet, consectetur adipiscing elit, sed
          </p>
          <br/><br/><br/>
          <div className="input">
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email Address"
                height="20px"
                value={email}
                onChange={handleEmailChange}
              />
              <button className="button" type="submit">
                Contact Me
              </button>
              {error && <p>{error}</p>}
              {successMessage && <p>{successMessage}</p> }
            </form>
          </div>
        </div>

        <div className="cards">
          {cardData.map((card) => (
            <Card
              key={card.id}
              id={card.id}
              img={card.img}
              title={card.title}
              description={card.description}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;