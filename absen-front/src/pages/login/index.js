import { React, useState } from "react";
import { useRouter } from "next/router";
import axios from '../../lib/axios';

const AuthForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post('/auth/signin', { email, password });
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('token', result.token);
      }

      setToken(result.token);
      router.push('/');
      console.log(result);
    } catch (error) {
      console.error(error);
      setError('Email or password is incorrect');
    }
  }

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleLogin}>
        <p className="text-center mt-5">{error}</p>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
              value={email} onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              value={password} onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          <p className="forgot-password text-right mt-5"></p>
        </div>
      </form>
    </div>
  )
}

export default AuthForm;