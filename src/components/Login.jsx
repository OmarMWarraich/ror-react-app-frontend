import { useRef } from "react";
import { login } from "../services/authService";
import "./Login.css";

const Login = ({ setCurrUser, setShow }) => {
  const formRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData);
    const userInfo = {
      user: {
        email: data.email,
        password: data.password,
      },
    };
    login(userInfo, setCurrUser);
    e.target.reset();
  };
  const handleClick = (e) => {
    e.preventDefault();
    setShow(false);
  };
  return (
    <div className="login-container">
      <form ref={formRef} onSubmit={handleSubmit} className="login-form">
        Email:{" "}
        <input type="email" name="email" placeholder="Enter your email" />
        <br />
        Password:{" "}
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
        />
        <br />
        <input type="submit" value="Login" />
      </form>
      <br />
      <div>
        Not registered yet,{" "}
        <a href="#signup" onClick={handleClick}>
          Signup
        </a>{" "}
      </div>
    </div>
  );
};
export default Login;
