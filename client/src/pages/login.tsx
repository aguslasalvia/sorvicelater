import "styles/login.css";

import { useState } from "react";
import { useNavigate } from "react-router";
import { User, LockKeyhole } from "lucide-react";
import { loginForm } from "@/lib/forms";
import { fetchLogin } from "@/lib/fetch";
import faviconUrl from "@/assets/favicon.png";

export default function Login() {
  const [formLogin, setFormLogin] = useState(loginForm);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetchLogin(formLogin);
    if (response !== 404 && response !== 500) {
      localStorage.setItem("username", formLogin.username);
      localStorage.setItem("token", response?.token);
      navigate("/backlog");
    }
  };

  return (
    <div className="page-login">
      <form className="loginCard" onSubmit={handleSubmit}>
        <div className="logoMark">
          <img src={faviconUrl} alt="SorvisLater" />
        </div>
        <p className="title">
          Sorvis<span>Later</span>
        </p>
        <p className="subtitle">
          Log in now, or<span> later!</span>
        </p>

        <div className="field">
          <label htmlFor="username">Username</label>
          <div className="inputWrap">
            <User size={18} className="fieldIcon" />
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Enter your username"
              autoComplete="username"
              onChange={(e) => {
                setFormLogin({ ...formLogin, username: e.target.value });
              }}
            />
          </div>
        </div>

        <div className="field">
          <label htmlFor="password">Password</label>
          <div className="inputWrap">
            <LockKeyhole size={18} className="fieldIcon" />
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              autoComplete="current-password"
              onChange={(e) => {
                setFormLogin({ ...formLogin, password: e.target.value });
              }}
            />
          </div>
        </div>

        <button className="loginBtn" id="btnLogin" type="submit">
          Log in
        </button>
      </form>
    </div>
  );
}
