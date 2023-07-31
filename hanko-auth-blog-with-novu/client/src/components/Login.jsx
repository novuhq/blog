import React, { useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { register, Hanko } from "@teamhanko/hanko-elements";
const hankoApi = "https://cb84013f-ba52-4f53-a92e-b4c9c20d9883.hanko.io";

const Login = () => {
	const navigate = useNavigate();
	const hanko = useMemo(() => new Hanko(hankoApi), []);
	
	const generateUserID = () => Math.random().toString(36).substring(2, 10);

	const redirectAfterLogin = useCallback(() => {
		localStorage.setItem("loggedIn", "true");
		if (!localStorage.getItem("u_id")) {
			localStorage.setItem("u_id", generateUserID());
		}
		navigate("/");

	}, [navigate]);

	useEffect(
		() =>
			hanko.onAuthFlowCompleted(() => {
				redirectAfterLogin();		
			}),
		[hanko, redirectAfterLogin]
	);

	useEffect(() => {
		register(hankoApi)
			.catch((error) => {
				console.log(error);
			});
	}, []);

	return (
		<div className='login_container'>
			<hanko-auth />
		</div>
	);
};

export default Login;
