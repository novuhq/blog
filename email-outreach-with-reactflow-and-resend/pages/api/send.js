import { Resend } from "resend";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export default async function handler(req, res) {
	try {
		const { subject, task, email } = req.body;
		const data = await resend.emails.send({
			from: "onboarding@resend.dev",
			to: [email],
			subject,
			text: task,
		});
		res.status(200).json(data);
	} catch (error) {
		res.status(400).json(error);
	}
}
