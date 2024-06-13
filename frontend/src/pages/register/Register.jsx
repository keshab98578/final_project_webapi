import React, { useState } from 'react';
import { registerUserApi } from '../../apis/Api';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const handleFirstname = (e) => {
    setFirstName(e.target.value);
    setFirstNameError('');
  };

  const handleLastname = (e) => {
    setLastName(e.target.value);
    setLastNameError('');
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailError('');
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setPasswordError('');
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
    setConfirmPasswordError('');
  };

  const validate = () => {
    let isValid = true;

    if (firstName.trim() === '') {
      setFirstNameError('Firstname is required!');
      isValid = false;
    }

    if (lastName.trim() === '') {
      setLastNameError('Lastname is required!');
      isValid = false;
    }

    if (email.trim() === '') {
      setEmailError('Email is required!');
      isValid = false;
    }

    if (password.trim() === '') {
      setPasswordError('Password is required!');
      isValid = false;
    }

    if (confirmPassword.trim() === '') {
      setConfirmPasswordError('Confirm Password is required!');
      isValid = false;
    }

    if (confirmPassword.trim() !== password.trim()) {
      setConfirmPasswordError("Password and Confirm Password don't match!");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValidated = validate();
    if (!isValidated) return;

    const data = {
      firstName,
      lastName,
      email,
      password,
    };

    registerUserApi(data).then((res) => {
      if (res.data.success === false) {
        toast.error(res.data.message);
      } else {
        toast.success(res.data.message);
      }
    });
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card shadow-sm p-4">
            <h1 className="text-center mb-4">Create an Account</h1>
            <form>
              <div className="form-group">
                <label htmlFor="firstName">Firstname</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  placeholder="Enter your firstname"
                  value={firstName}
                  onChange={handleFirstname}
                />
                {firstNameError && <div className="text-danger">{firstNameError}</div>}
              </div>
              <div className="form-group mt-3">
                <label htmlFor="lastName">Lastname</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  placeholder="Enter your lastname"
                  value={lastName}
                  onChange={handleLastname}
                />
                {lastNameError && <div className="text-danger">{lastNameError}</div>}
              </div>
              <div className="form-group mt-3">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={handleEmail}
                />
                {emailError && <div className="text-danger">{emailError}</div>}
              </div>
              <div className="form-group mt-3">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={handlePassword}
                />
                {passwordError && <div className="text-danger">{passwordError}</div>}
              </div>
              <div className="form-group mt-3">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="confirmPassword"
                  placeholder="Enter your confirm password"
                  value={confirmPassword}
                  onChange={handleConfirmPassword}
                />
                {confirmPasswordError && <div className="text-danger">{confirmPasswordError}</div>}
              </div>
              <button onClick={handleSubmit} className="btn btn-primary w-100 mt-4">
                Create an Account
              </button>
            </form>
            <div className="mt-3 text-center">
              <label>Already have an account?</label>
              <Link to="/login" className="btn btn-outline-primary w-100 mt-2">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
