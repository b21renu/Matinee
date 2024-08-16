import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


const MoodSearch = () => {
  const genres = ['Action', 'Comedy', 'Drama', 'Mystery', 'Sci-Fi', 'Romance'];
  const [preferences, setPreferences] = useState({
    Action: 50,
    Comedy: 50,
    Drama: 50,
    Mystery: 50,
    SciFi: 50,
    Romance: 50,
  });

  const [selectedMood, setSelectedMood] = useState('');

  const moods = ['Uplifting', 'Dark', 'Nostalgic', 'Adventurous', 'Calm', 'Energetic'];

  const handleSliderChange = (genre, value) => {
    setPreferences({ ...preferences, [genre]: value });
  };

  const handleMoodChange = (mood) => {
    setSelectedMood(mood);
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post('http://localhost:3001/mood', {
  //       email: userEmail,
  //       genrePreferences: preferences,
  //       selectedMood: selectedMood
  //     });
  //     console.log(response.data);
  //     navigate('/header');
  //   } catch (error) {
  //     console.error("Error updating mood data:", error);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting:', {
      email: userEmail,
      genrePreferences: preferences,
      selectedMood: selectedMood
    });
    try {
      const response = await axios.post('http://localhost:3001/mood', {
        email: userEmail,
        genrePreferences: preferences,
        selectedMood: selectedMood
      });
      console.log('Server response:', response.data);
      navigate('/header');
    } catch (error) {
      console.error("Error updating mood data:", error);
    }
  };
  
  

  return (
    <motion.div
      className="max-w-4xl mx-auto py-10 px-4 space-y-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">Personalize Your Matinee Experience</h1>
      
      {/* Genre Preferences */}
      <motion.div 
        className="p-6 bg-gray-100 rounded-lg shadow-lg"
        initial={{ x: '-100vw' }}
        animate={{ x: 0 }}
        transition={{ type: 'spring', stiffness: 120 }}
      >
        <h2 className="text-2xl font-bold mb-4">Your Genre Preferences</h2>
        {genres.map((genre) => (
          <div key={genre} className="mb-4">
            <label className="block text-lg font-medium text-gray-700">
              {genre}
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={preferences[genre]}
              onChange={(e) => handleSliderChange(genre, e.target.value)}
              className="w-full h-2 bg-blue-500 rounded-lg cursor-pointer"
            />
            <div className="text-right text-sm text-gray-600">{preferences[genre]}</div>
          </div>
        ))}
      </motion.div>

      {/* Mood & Tone Selector */}
      <motion.div 
        className="p-6 bg-gray-100 rounded-lg shadow-lg"
        initial={{ x: '100vw' }}
        animate={{ x: 0 }}
        transition={{ type: 'spring', stiffness: 120 }}>
        <h2 className="text-2xl font-bold mb-4">Select Your Preferred Mood & Tone</h2>
        <div className="flex flex-wrap gap-4">
          {moods.map((mood) => (
            <motion.button
              key={mood}
              onClick={() => handleMoodChange(mood)}
              className={`px-4 py-2 rounded-lg text-white font-semibold ${
                selectedMood === mood ? 'bg-blue-600' : 'bg-gray-400 hover:bg-gray-500'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {mood}
            </motion.button>
          ))}
        </div>
        {selectedMood && (
          <p className="mt-4 text-lg text-blue-600">Selected Mood: {selectedMood}</p>
        )}
        <button onClick={handleSubmit} className="submit-button">Submit</button>
      </motion.div>
      <Link to="/header"><button className="next-button">Next</button></Link>
    </motion.div>
  );
};

export default MoodSearch;