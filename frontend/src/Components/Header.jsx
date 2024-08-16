import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import background from '../assets/background.svg';
import BookIcon from '../assets/book-icon.svg';
import Logo from '../assets/Logo.svg';
import MovieIcon from '../assets/movie-icon.svg';
import MusicIcon from '../assets/music-icon.svg';

const Header = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [response, setResponse] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const navigate = useNavigate();
  const images = [
    "https://cf-vectorizer-live.s3.amazonaws.com/vectorized/2iovUX7fBDvmkOgMqY4UaUdjx5h/2ip3h1kTPv9TVRsoaYO097WdZJr.svg",
    "https://cf-vectorizer-live.s3.amazonaws.com/vectorized/2iovUX7fBDvmkOgMqY4UaUdjx5h/2ixxBNRQVfc75d6P2ZUvE2R98Wj.svg"
  ];

  const handleCategoryClick = async (category) => {
    setSelectedCategory(category);
    if (category === 'movies') {
      navigate('/movies');
    } else if (category === 'books') {
      navigate('/books');
    } else if (category === 'music') {
      navigate('/music');
    } 
  };

  useEffect(() => {
    if (selectedCategory === 'movies') {
      const query = prompt('Enter a movie name:');
      fetchRecommendations('movies', query);
    } else if (selectedCategory === 'books') {
      const query = prompt('Enter a book name:');
      fetchRecommendations('books', query);
    } else if (selectedCategory === 'music') {
      const query = prompt('Enter a music track name:');
      fetchRecommendations('music', query);
    }
  }, [selectedCategory]);

  const fetchRecommendations = async (type, query) => {
    try {
      const response = await fetch(`http://localhost:5000/recommend/${type}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });
      const data = await response.json();
      setResponse(data);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 5050); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  const scrollToAbout = () => {
    const about = document.getElementById('about');
    if (about) {
      window.scrollTo({
        top: about.offsetTop,
        behavior: 'smooth'
      });
    }
  };

  const signup = () => {
    navigate('/register');
  };

  return (
    <div className="unique-header relative w-full min-h-screen bg-cover bg-center text-white" style={{ backgroundImage: `url(${background})` }}>
      <div className="unique-header relative z-10">
        {/* Content container */}
        <div className="unique-header max-w-8xl mx-auto px-6 py-6 md:px-8">
          {/* Header */}
          <header id="header" className="unique-header flex items-center justify-between">
            <div className="unique-header flex items-center">
              <img src={Logo} alt="Logo" className="unique-header h-8 w-8 rounded-full mr-2" />
              <span className="unique-header text-white text-xl font-bold">Matinée</span>
            </div>
            <button onClick={scrollToAbout} className="unique-header learn-more">
              <span className="unique-header circle" aria-hidden="true">
                <span className="unique-header icon arrow"></span>
              </span>
              <span className="unique-header button-text">Learn More</span>
            </button>
          </header>

          <main className="unique-header mt-12 text-center">
            <h1 className="unique-header text-5xl font-bold">Welcome to Matinée</h1>
            <p className="unique-header mt-4 text-lg text-zinc-300">Find Your Next Binge-Worthy Movie, Jam, or Read!</p>
            <button onClick={signup} className="unique-header cta">
              <span>Get Started</span>
              <svg width="15px" height="10px" viewBox="0 0 13 10">
                <path d="M1,5 L11,5"></path>
                <polyline points="8 1 12 5 8 9"></polyline>
              </svg>
            </button>
          </main>

          {/* Icons section */}
          <div className="unique-header container mx-auto mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="unique-header glass" data-text="Movie" style={{ '--r': '-15' }} onClick={() => handleCategoryClick('movies')}>
              <img src={MovieIcon} alt="Movie Icon" className="unique-header w-20 h-20 mx-auto" />
            </div>
            <div className="unique-header glass" data-text="Books" style={{ '--r': '5' }} onClick={() => handleCategoryClick('books')}>
              <img src={BookIcon} alt="Book Icon" className="unique-header w-20 h-20 mx-auto" />
            </div>
            <div className="unique-header glass" data-text="Music" style={{ '--r': '25' }} onClick={() => handleCategoryClick('music')}>
              <img src={MusicIcon} alt="Music Icon" className="unique-header w-20 h-20 mx-auto" />
            </div>
          </div>

          {response && (
            <div className="recommendations">
              <h2>Recommendations:</h2>
              <pre>{JSON.stringify(response, null, 2)}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
