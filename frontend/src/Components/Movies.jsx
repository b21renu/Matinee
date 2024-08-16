import React, { useState } from 'react';

const MovieSearch = () => {
  const [movieName, setMovieName] = useState('');
  const [recommendations, setRecommendations] = useState({
    movies: [],
    books: [],
    music: []
  });
  
  const [showMovies, setShowMovies] = useState(false);
  const [showBooks, setShowBooks] = useState(false);
  const [showMusic, setShowMusic] = useState(false);

  const handleSearch = async () => {
    try {
      const response = await fetch('http://localhost:5000/recommend/movies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: movieName }), // Passes the movieName as query
      });
      const data = await response.json();

      if (data.movies || data.books || data.music) {
        setRecommendations({
          movies: data.movies.map(movie => movie.title),
          books: data.books.map(book => book['Book-Title']),
          music: data.music.map(music => music.track_name)
        });
      } else {
        alert('No recommendations found');
      }
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      alert('Error fetching recommendations');
    }
  };

  const toggleMovies = () => {
    setShowMovies(prev => !prev); // Toggle the movies section
  };

  const toggleBooks = () => {
    setShowBooks(prev => !prev); // Toggle the books section
  };

  const toggleMusic = () => {
    setShowMusic(prev => !prev); // Toggle the music section
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-white font-sans bg-cover bg-center" style={{ backgroundImage: "url('src/assets/Mobackground.svg')" }}>
      <div className="max-w-4xl w-full flex relative bg-black bg-opacity-30 p-6 rounded-lg">
        <div className="w-1/2 bg-cover bg-center rounded-l-lg relative slide-in">
          <img src="src/assets/Movie-form.svg" alt="Movie Form" className="w-full h-full object-cover rounded-l-lg" />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-l-lg">
            <h1 className="text-white text-3xl font-bold text-left">
              Find Yourself Intertwined In Your Mood
              <br />
              Lights..Camera..Search!!!
            </h1>
          </div>
        </div>
        <div className="w-1/2 flex items-center justify-center bg-transparent shadow-lg rounded-r-lg border border-blue-400">
          <div className="max-w-md w-full p-6">
            <h2 className="text-2xl font-bold mb-4 text-center border-b border-blue-500 pb-2 text-orange-600">Movie Recommendations</h2>
            <div className="mb-4">
              <label htmlFor="movieName" className="block text-sm font-medium text-blue-400"> Enter a Movie Name: </label>
              <input
                type="text"
                id="movieName"
                name="movieName"
                placeholder="E.g. The Shawshank Redemption"
                className="w-full mt-1 p-2 border border-blue-700 rounded-md focus:outline-none focus:ring-2 focus:ring-lightBlue-500 bg-transparent text-lightBlue-300"
                value={movieName}
                onChange={(e) => setMovieName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <button
                id="submitMovie"
                onClick={handleSearch}
                className="bg-orange-600 text-white px-3 py-1 rounded-md hover:bg-transparent transition-all duration-300 transform hover:scale-105"
              >
                Submit
              </button>
            </div>
            <div className="mb-4" id="similarMovies">
              <button
                onClick={toggleMovies}
                className="bg-orange-600 text-white px-3 py-1 rounded-md hover:bg-orange-700 transition-all duration-300 transform hover:scale-105"
              >
                Similar Movies
              </button>
              {showMovies && (
                <ul className="list-disc pl-6 text-lightBlue-300 border border-blue-700 rounded-md p-2 bg-transparent">
                  {recommendations.movies.map((movie, index) => (
                    <li key={index}>{movie}</li>
                  ))}
                </ul>
              )}
            </div>
            <div className="mb-4" id="booksList">
              <button
                onClick={toggleBooks}
                className="bg-orange-600 text-white px-3 py-1 rounded-md hover:bg-orange-700 transition-all duration-300 transform hover:scale-105"
              >
                Book Recommendations
              </button>
              {showBooks && (
                <ul className="list-disc pl-6 text-lightBlue-300 border border-blue-600 rounded-md p-2 bg-transparent">
                  {recommendations.books.map((book, index) => (
                    <li key={index}>{book}</li>
                  ))}
                </ul>
              )}
            </div>
            <div className="mb-4" id="musicList">
              <button
                onClick={toggleMusic}
                className="bg-orange-600 text-white px-3 py-1 rounded-md hover:bg-orange-700 transition-all duration-300 transform hover:scale-105"
              >
                Music Recommendations
              </button>
              {showMusic && (
                <ul className="list-disc pl-6 text-lightBlue-300 border border-blue-600 rounded-md p-2 bg-transparent">
                  {recommendations.music.map((music, index) => (
                    <li key={index}>{music}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieSearch;