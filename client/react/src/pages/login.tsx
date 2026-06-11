import "styles/login.css";

import { useState } from "react";
import { useNavigate } from "react-router";
import { Clock5, User, LockKeyhole } from "lucide-react";
import { loginForm } from "@/lib/forms";
import { fetchLogin } from "@/lib/fetch";

export default function Login() {
	const [formLogin, setFormLogin] = useState(loginForm);
	const [error, setError] = useState("")
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const response = await fetchLogin(formLogin)
		response == 404 ? setError("User Not Found")
			: response == 500 ? setError("Server Error")
				: navigate(`/backlog?username=${formLogin.username}`)
	};

	return (
		<div className="page-login">
			<form className="loginCard" onSubmit={handleSubmit}>
				<div className="logoMark">
					<Clock5 size={28} />
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

				{error != "" ? <p className="errortext">{error}</p> : <></>}
			</form>
		</div>
	);
}
