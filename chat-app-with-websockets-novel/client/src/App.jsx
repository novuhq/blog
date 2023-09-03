import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import socketIO from "socket.io-client";
import {
	ClerkProvider,
	SignedIn,
	SignedOut,
	SignIn,
	SignUp,
	RedirectToSignIn,
} from "@clerk/clerk-react";

if (!import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY) {
	throw new Error("Missing Publishable Key");
}
const socket = socketIO.connect("http://localhost:4000");
const clerkPubKey = import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY;

const App = () => {
	return (
		<Router>
			<ClerkProvider publishableKey={clerkPubKey}>
				<Routes>
					<Route
						path='/*'
						element={
							<div className='login'>
								<SignIn
									path='/'
									routing='path'
									signUpUrl='/register'
									afterSignInUrl='/chat'
								/>{" "}
							</div>
						}
					/>

					<Route
						path='/register/*'
						element={
							<div className='login'>
								<SignUp afterSignUpUrl='/chat' />
							</div>
						}
					/>

					<Route
						path='/chat'
						element={
							<>
								<SignedIn>
									<Home socket={socket} />
								</SignedIn>
								<SignedOut>
									<RedirectToSignIn />
								</SignedOut>
							</>
						}
					/>
				</Routes>
			</ClerkProvider>
		</Router>
	);
};

export default App;
