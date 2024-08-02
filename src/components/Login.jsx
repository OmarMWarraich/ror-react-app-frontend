import { useRef } from "react";
import "./Login.css";

const Login = ({ setCurrUser, setShow }) => {
  const formRef = useRef();
  const login = async (userInfo, setCurrUser) => {
    const url = "http://localhost:3000/api/v1/login";
    try {
      const response = await fetch(url, {
        method: "post",
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify(userInfo),
      });
      const data = await response.json();
      console.log(data.data);
      if (!response.ok) throw data.error;

      localStorage.setItem("token", response.headers.get("Authorization"));
      localStorage.setItem("user", JSON.stringify(data.data));
      window.location.reload();
    } catch (error) {
      console.log("error", error);
    }
  };
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
