import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.scss";
const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    telegramID: "",
    password: "",
  });
  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/auth/register", inputs);
      navigate("/login");
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className="reg">
      <h1 className="reg__title">Register</h1>
      <form className="reg__form">
        <input
          required
          type="text"
          placeholder="username"
          name="username"
          onChange={handleChange}
        />
        <input
          required
          type="text"
          placeholder="@MustafaevN"
          name="telegramID"
          onChange={handleChange}
        />
        <input
          required
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
        />
        <button className="reg__button" onClick={handleSubmit}>
          Register
        </button>
        {err && <p className="reg__error">{err}</p>}
        <span>
          У вас уже есть аккаунт? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
