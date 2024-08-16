import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserProfile = () => {
  const [favorites, setFavorites] = useState({
    movies: ['', '', ''],
    music: ['', '', ''],
    books: ['', '', ''],
  });

  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleFavoriteChange = (type, index, value) => {
    setFavorites({ 
      ...favorites, 
      [type]: favorites[type].map((fav, i) => (i === index ? value : fav))
    });
  };

  const handleUserInfoChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/favts', userInfo)
      .then(result => console.log(result.data))
      .catch(err => console.log(err));
    navigate('/login');
  };

  return (
    <motion.div
      className="max-w-4xl mx-auto py-10 px-4 space-y-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="p-6 bg-white rounded-lg shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h1 className="text-2xl font-bold mb-4">Your Top 3 Favorites</h1>
        {['movies', 'music', 'books'].map((type) => (
          <div key={type} className="mb-6">
            <h3 className="text-lg font-medium text-gray-700 capitalize">{`Favorite ${type}`}</h3>
            {favorites[type].map((fav, index) => (
              <input
                key={index}
                type="text"
                value={fav}
                onChange={(e) => handleFavoriteChange(type, index, e.target.value)}
                placeholder={`Enter your #${index + 1} ${type}`}
                className="w-full p-2 mb-2 border-b border-gray-300 focus:outline-none focus:border-blue-500"
              />
            ))}
          </div>
        ))}
        <form onSubmit={handleSubmit}>
        </form>
        <Link to="/login">
          <button className="login-button mt-4">
            Next
          </button>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default UserProfile;
