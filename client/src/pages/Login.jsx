import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");


  const handleLogin = async (e) => {

    e.preventDefault();

    setMessage("");
    setError("");


    if (!email || !password) {

      setError("Please enter email and password");

      return;

    }


    try {

      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password
        }
      );


      setMessage(
        `Login Successful! Welcome ${response.data.user.name}`
      );


      setEmail("");
      setPassword("");


    } catch (error) {

      if (error.response) {

        setError(error.response.data.message);

      } else {

        setError("Unable to connect to server");

      }

    }

  };


  return (

    <div className="container">

      <div className="form-box">

        <h1>Login</h1>

        <p className="subtitle">
          Login to your account
        </p>


        <form onSubmit={handleLogin}>

          <div className="input-group">

            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

          </div>


          <div className="input-group">

            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

          </div>


          <button type="submit">
            Login
          </button>


          {message && (
            <p className="success">
              {message}
            </p>
          )}


          {error && (
            <p className="error">
              {error}
            </p>
          )}

        </form>


        <p className="bottom-text">

          Don't have an account?

          <Link to="/signup">
            Signup
          </Link>

        </p>

      </div>

    </div>

  );

}

export default Login;