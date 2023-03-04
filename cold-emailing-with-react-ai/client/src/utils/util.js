import emailjs from "@emailjs/browser";
import axios from "axios";

const sendResume = (formData, setLoading, navigate) => {
	setLoading(true);

	axios
		.post("http://localhost:4000/resume/send", formData, {})
		.then((res) => {
			if (res.data.message) {
				const {
					cover_letter,
					recruiter_email,
					my_email,
					applicant_name,
					resume,
				} = res.data.data;
				emailjs
					.send(
						"service_david",
						"template_w4olgwm",
						{
							cover_letter,
							applicant_name,
							recruiter_email,
							my_email,
							resume,
						},
						"user_emwhAtdfUc9GKCk1hhf89"
					)
					.then((res) => {
						if (res.status === 200) {
							setLoading(false);
							alert("Message sent!");
							navigate("/");
						}
					})
					.catch((err) => console.error(err));
			}
		})
		.catch((err) => console.error(err));
};
export default sendResume;
