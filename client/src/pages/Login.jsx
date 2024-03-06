import React, { useState } from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import "./Login.scss";
const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      navigate("/");
    } catch (err) {
      setError(err.response.data);
    }
  };
  return (
    <div className="auth">
      <h1 className="auth__title">Login</h1>
      <form className="auth__form">
        <input
          className="auth__login"
          required
          type="text"
          placeholder="username"
          name="username"
          onChange={handleChange}
        />
        <input
          required
          className="auth__password"
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
        />
        <button className="auth__button" onClick={handleSubmit}>
          Login
        </button>
        {err && <p className="auth__error">{err}</p>}
        <span className="auth__register">
          У вас нет аккаунта? <Link to="/register">Register</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
