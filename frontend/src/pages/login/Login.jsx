import React, { useState } from "react";
import { toast } from "react-toastify";
import { loginUserApi } from "../../apis/Api";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validation = () => {
    let isValid = true;

    if (email.trim() === "" || !email.includes("@")) {
      setEmailError("Email is empty or invalid");
      isValid = false;
    }

    if (password.trim() === "") {
      setPasswordError("Password is empty");
      isValid = false;
    }
    return isValid;
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!validation()) {
      return;
    }

    const data = {
      email: email,
      password: password,
    };

    loginUserApi(data).then((res) => {
      if (res.data.success === false) {
        toast.error(res.data.message);
      } else {
        toast.success(res.data.message);

        localStorage.setItem("token", res.data.token);
        const convertedData = JSON.stringify(res.data.userData);
        localStorage.setItem("user", convertedData);
      }
    });
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card shadow-sm p-4">
            <h1 className="text-center mb-4">Login to your Account</h1>
            <form>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  className="form-control"
                  id="email"
                  placeholder="Enter your email address"
                  value={email}
                />
                {emailError && <p className="text-danger">{emailError}</p>}
              </div>
              <div className="form-group mt-3">
                <label htmlFor="password">Password</label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                />
                {passwordError && <p className="text-danger">{passwordError}</p>}
              </div>
              <button onClick={handleLogin} className="btn btn-danger w-100 mt-4">
                Login
              </button>
            </form>
            <div className="mt-3 text-center">
              <label>Don't have an account?</label>
              <Link to="/register" className="btn btn-outline-danger w-100 mt-2">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
