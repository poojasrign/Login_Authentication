import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Signup() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");


  const handleSignup = async (e) => {

    e.preventDefault();

    setMessage("");
    setError("");


    if (!name || !email || !password || !confirmPassword) {

      setError("Please fill all fields");

      return;

    }


    if (password !== confirmPassword) {

      setError("Passwords do not match");

      return;

    }


    try {

      const response = await axios.post(
        "http://localhost:5000/api/auth/signup",
        {
          name,
          email,
          password,
          confirmPassword
        }
      );


      setMessage(response.data.message);


      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");


      setTimeout(() => {

        navigate("/login");

      }, 1500);


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

        <h1>Signup</h1>

        <p className="subtitle">
          Create your account
        </p>


        <form onSubmit={handleSignup}>

          <div className="input-group">

            <label>Name</label>

            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

          </div>


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


          <div className="input-group">

            <label>Confirm Password</label>

            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
            />

          </div>


          <button type="submit">
            Signup
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

          Already have an account?

          <Link to="/login">
            Login
          </Link>

        </p>

      </div>

    </div>

  );

}

export default Signup;