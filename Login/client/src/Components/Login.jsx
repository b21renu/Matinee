import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/Signupbkg.svg';
import mainBackgroundImage from '../assets/background05.svg';
import '../Login.css'; // Import the CSS file

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/login', { email, password })
      .then(result => {
        console.log(result);
        if (result.data === "Successfull!!") { // Ensure this matches the response from the server
          navigate('/mood'); // Navigates to Header component
        }
      })
      .catch(err => console.log(err));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div 
      className="login-container"
      style={{
        backgroundImage: `url(${mainBackgroundImage})`,
      }}
    >
      <div className="login-content">
        <div
          className="login-left"
          style={{
            backgroundImage: `url(${backgroundImage})`,
          }}
        >
          <h2 className="login-title"><center>Welcome Back!</center></h2>
          <p className="login-subtitle"></p>
        </div>
        <div className="login-right">
          <h2 className="login-title">Login</h2>
          <form onSubmit={handleSubmit}>
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
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
          <p className="mt-4 text-center text-purple-300">Don't Have an Account?</p>
          <Link to="/register">
            <button className="register-button">
              Register
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
