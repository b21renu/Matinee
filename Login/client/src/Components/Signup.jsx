import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/Signupbkg.svg';
import mainBackgroundImage from '../assets/background05.svg';
import '../Signup.css';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/register', { name, email, password })
      .then(result => console.log(result.data))
      .catch(err => console.log(err));
    navigate('/hts');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div 
      className="signup-container"
      style={{
        backgroundImage: `url(${mainBackgroundImage})`,
      }}
    >
      <div className="signup-content">
        <div
          className="signup-left"
          style={{
            backgroundImage: `url(${backgroundImage})`,
          }}
        >
          <h2 className="signup-title"><center>Welcome!</center></h2>
          <p className="signup-subtitle"></p>
        </div>
        <div className="signup-right">
          <h2 className="signup-title">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="form-label" htmlFor="name">
                User Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="TechTree"
                className="form-input"
              />
            </div>
            <div className="mb-4">
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email"
                className="form-input"
              />
            </div>
            <div className="mb-4 relative">
              <label className="form-label" htmlFor="password">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                className="form-input"
              />
              <span className="eye-icon" onClick={togglePasswordVisibility}>
                {showPassword}
              </span>
            </div>
            <button type="submit" className="signup-button">
              Submit
            </button>
          </form>
          <p className="mt-4 text-center text-purple-300">Already Have an Account?</p>
          <Link to="/login">
            <button className="login-button">
              Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
