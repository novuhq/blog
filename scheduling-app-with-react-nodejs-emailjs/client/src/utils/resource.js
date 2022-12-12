import { toast } from "react-toastify";
import emailjs from "@emailjs/browser";

export const time = [
	{ id: "null", t: "Select" },
	{ id: "7", t: "7:00am" },
	{ id: "8", t: "8:00am" },
	{ id: "9", t: "9:00am" },
	{ id: "10", t: "10:00am" },
	{ id: "11", t: "11:00am" },
	{ id: "12", t: "12:00pm" },
	{ id: "13", t: "13:00pm" },
	{ id: "14", t: "14:00pm" },
	{ id: "15", t: "15:00pm" },
	{ id: "16", t: "16:00pm" },
	{ id: "17", t: "17:00pm" },
	{ id: "18", t: "18:00pm" },
	{ id: "19", t: "19:00pm" },
];

export async function handleLogin(username, password, navigate) {
	try {
		const request = await fetch("http://localhost:4000/login", {
			method: "POST",
			body: JSON.stringify({
				username,
				password,
			}),
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		});
		const data = await request.json();
		if (data.error_message) {
			toast.error(data.error_message);
		} else {
			toast.success(data.message);
			localStorage.setItem("_id", data.data._id);
			localStorage.setItem("_myEmail", data.data._email);
			navigate("/dashboard");
		}
	} catch (err) {
		console.error(err);
	}
}
export async function handleRegister(email, username, password, navigate) {
	try {
		const request = await fetch("http://localhost:4000/register", {
			method: "POST",
			body: JSON.stringify({
				email,
				username,
				password,
			}),
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		});
		const data = await request.json();
		if (data.error_message) {
			toast.error(data.error_message);
		} else {
			toast.success(data.message);
			navigate("/");
		}
	} catch (err) {
		console.error(err);
		toast.error("Account creation failed");
	}
}

export async function handleCreateSchedule(
	selectedTimezone,
	schedule,
	navigate
) {
	try {
		await fetch("http://localhost:4000/schedule/create", {
			method: "POST",
			body: JSON.stringify({
				userId: localStorage.getItem("_id"),
				timezone: selectedTimezone,
				schedule,
			}),
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		});
		navigate(`/profile/${localStorage.getItem("_id")}`);
	} catch (err) {
		console.error(err);
	}
}
export function fetchBookingDetails(
	user,
	setError,
	setTimezone,
	setSchedules,
	setReceiverEmail
) {
	fetch(`http://localhost:4000/schedules/${user}`, {
		method: "POST",
		body: JSON.stringify({
			username: user,
		}),
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
	})
		.then((res) => res.json())
		.then((data) => {
			if (data.error_message) {
				toast.error(data.error_message);
				setError(true);
			} else {
				setTimezone(data.timezone.label);
				setSchedules(data.schedules);
				setReceiverEmail(data.receiverEmail);
			}
		})
		.catch((err) => console.error(err));
}

export const sendEmail = (
	receiverEmail,
	email,
	fullName,
	message,
	duration
) => {
	emailjs
		.send(
			"YOUR_SERVICE_ID",
                "YOUR_TEMPLATE_ID",
			{
				to_email: receiverEmail,
				from_email: email,
				fullName,
				message,
				duration,
			},
			"YOUR_PUBLIC_KEY"
		)
		.then(
			(result) => {
				console.log(result.text);
				toast.success("Session booked successfully!");
			},
			(error) => {
				console.log(error.text);
				toast.error(error.text);
			}
		);
};
