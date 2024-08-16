import React from 'react';
import poster from '../assets/movie-poster.svg'; // Adjust the path as necessary

const About = () => {
  const scrollToHeader = () => {
    const header = document.getElementById('header');
    if (header) {
      header.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="about" className="relative w-full h-screen-minus-header bg-black flex items-center justify-center">
      <div className="relative flex items-center w-full h-full bg-black overflow-hidden">
        <div className="fade-img w-full h-full">
          <img
            src={poster}
            alt="Avengers Infinity War"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 flex flex-col justify-center items-end text-white bg-gradient-to-r from-transparent to-black p-8">
          <div className="flex flex-col items-start space-y-4">
            <h1 className="text-5xl font-bold">ABOUT US</h1>
            <p className="text-lg leading-relaxed max-w-2xl">
              Finding what you love shouldn't be a challenge. Our intelligent recommender system curates personalized suggestions for movies, music, and books, making discovery effortless. Dive into a seamless experience where your next favorite movie, song, or book is just a click away, perfectly tailored to your tastes.
            </p>
          </div>
          <div className="flex items-center space-x-4 mt-4">
            <button onClick={scrollToHeader} className="animated-button">
              <span className="text">Back To Home</span>
              <div className="circle"></div>
              <svg className="arr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
