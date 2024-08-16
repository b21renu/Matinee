import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Card01 from '../assets/Card01.png';
import Card021 from '../assets/Card021.png';
import Card022 from '../assets/Card022.png';
import Card03 from '../assets/Card03.png';
import Card04 from '../assets/Card04.png';
import Card05 from '../assets/Card05.png';
import Card06 from '../assets/Card06.png';
import Card07 from '../assets/Card07.png';
import CardFirst from '../assets/CardFirst.jpeg';
import CardMain from '../assets/CardMain.png';
import '../HTS.css'; // Import the CSS file

const cards = [
  {
    title: 'Let’s Start the Matinee Magic!',
    description: <i>'“Movies, music, and books that vibe together, stay together. Matinee is your ticket to discovering hidden gems across all your favorite genres. Buckle up and let’s create your ultimate playlist of entertainment!”'</i>,
    image: CardFirst,
  },
  {
    title: 'Get Started With Registration',
    description: 'Click on the Get Started Button To Sign-Up Or Login',
    image: Card01,
  },
  {
    title: 'Register With Your User, email and Password',
    description: 'Click on Login After this step',
    image: Card021,
  },
  {
    title: 'Please Login To Access Our Website',
    description: 'Yay!! Have fun Exploring Your likes',
    image: Card022,
  },
  {
    title: 'Click on Learn More To Know More About What We Do',
    description: 'Platform where you might find Harry Potter reading his own novel',
    image: Card03,
  },
  {
    title: 'Understand Our Website!! Get To More About Us',
    description: 'To know more about the website read the description. To navigate back to the main page click on back to home button',
    image: Card04,
  },
  {
    title: 'Click On The Pluck Cards!! Get Your Preferred Recommendation',
    description: 'On clicking on movie pluck card you can enter movie of your liking and get similar kinds of movies, book, and music recommendation. Similarly you can enter music or book pluck accordingly',
    image: CardMain,
  },
  {
    title: 'Write Your Preferred Movie !! And See The Magic',
    description: 'Did you know? If you like Action movies you might love metal music?',
    image: Card05,
  },
  {
    title: 'Write Your Preferred Music !! And See The Magic',
    description: 'Did you Know? On average, Women who love rom-coms might be most interested in murder mystery novels?',
    image: Card06,
  },
  {
    title: 'Write Your Preferred Book !! And See The Magic',
    description: 'Reading is like cardio for your brain',
    image: Card07,
  },
];

export default function HowToUseGuide() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationDirection, setAnimationDirection] = useState(null);

  const handleNext = () => {
    setAnimationDirection('next');
    setTimeout(() => {
      setCurrentIndex((currentIndex + 1) % cards.length);
      setAnimationDirection(null);
    }, 300);
  };

  const handlePrev = () => {
    setAnimationDirection('prev');
    setTimeout(() => {
      setCurrentIndex((currentIndex - 1 + cards.length) % cards.length);
      setAnimationDirection(null);
    }, 300);
  };

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/hts', { name, email, password })
      .then(result => console.log(result.data))
      .catch(err => console.log(err));
    navigate('/favts');
  };

  return (
    <div className="how-to-use-guide">
      <div className="title-container">
        <h1>How to Use Our App</h1>
        <p><i>Slide, glide, and vibe with us! Tap those arrows and explore how Matinee makes your entertainment dreams come true.</i></p>
      </div>

      <div className="card-slider">
        <div className={`card-content ${animationDirection ? 'animate' : ''}`}>
          <div className={`card-inner ${animationDirection}`}>
            <div className="card">
              <h2>{cards[currentIndex].title}</h2>
              <p>{cards[currentIndex].description}</p>
              {cards[currentIndex].image && <img src={cards[currentIndex].image} alt="Card" />}
              <p>{cards[currentIndex].content}</p>
              <div className="navigation">
                <button onClick={handlePrev}><ChevronLeft size={24} /></button>
                <p>{currentIndex + 1} / {cards.length}</p>
                <button onClick={handleNext}><ChevronRight size={24} /></button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="next-button">
        <form onSubmit={handleSubmit}>
        </form>
        <Link to="/favts">
          <button className="login-button">Next</button>
        </Link>
      </div>
    </div>
  );
}
