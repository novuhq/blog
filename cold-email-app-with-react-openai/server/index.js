const { Configuration, OpenAIApi } = require("openai");
const express = require("express");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const fs = require("fs");
const app = express();
const PORT = 4000;

app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use(cors());

const generateID = () => Math.random().toString(36).substring(2, 10);

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "uploads");
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + path.extname(file.originalname));
	},
});

const upload = multer({
	storage: storage,
	limits: { fileSize: 1024 * 1024 * 5 },
});

const configuration = new Configuration({
	apiKey: "<OPENAI_API_KEY>",
});

const openai = new OpenAIApi(configuration);

const database = [];

let workArray = [];
let applicantName = "";
let technologies = "";

const GPTFunction = async (text) => {
	const response = await openai.createCompletion({
		model: "text-davinci-003",
		prompt: text,
		temperature: 0.6,
		max_tokens: 350,
		top_p: 1,
		frequency_penalty: 1,
		presence_penalty: 1,
	});
	return response.data.choices[0].text;
};

const remainderText = () => {
	let stringText = "";
	for (let i = 0; i < workArray.length; i++) {
		stringText += ` ${workArray[i].name} as a ${workArray[i].position}.`;
	}
	return stringText;
};

app.post("/resume/create", upload.single("headshotImage"), async (req, res) => {
	const {
		fullName,
		currentPosition,
		currentLength,
		currentTechnologies,
		workHistory,
	} = req.body;

	workArray = JSON.parse(workHistory);
	applicantName = fullName;
	technologies = currentTechnologies;

	const newEntry = {
		id: generateID(),
		fullName,
		image_url: `http://localhost:4000/uploads/${req.file.filename}`,
		currentPosition,
		currentLength,
		currentTechnologies,
		workHistory: workArray,
	};

	const prompt1 = `I am writing a resume, my details are \n name: ${fullName} \n role: ${currentPosition} (${currentLength} years). \n I write in the technolegies: ${currentTechnologies}. Can you write a 100 words description for the top of the resume(first person writing)?`;

	const prompt2 = `I am writing a resume, my details are \n name: ${fullName} \n role: ${currentPosition} (${currentLength} years). \n I write in the technolegies: ${currentTechnologies}. Can you write 10 points for a resume on what I am good at?`;

	const prompt3 = `I am writing a resume, my details are \n name: ${fullName} \n role: ${currentPosition} (${currentLength} years). \n During my years I worked at ${
		workArray.length
	} companies. ${remainderText()} \n Can you write me 50 words for each company seperated in numbers of my succession in the company (in first person)?`;

	const objective = await GPTFunction(prompt1);
	const keypoints = await GPTFunction(prompt2);
	const jobResponsibilities = await GPTFunction(prompt3);

	const chatgptData = { objective, keypoints, jobResponsibilities };
	const data = { ...newEntry, ...chatgptData };
	database.push(data);

	res.json({
		message: "Request successful!",
		data,
	});
});

app.post("/resume/send", async (req, res) => {
	const {
		recruiterName,
		jobTitle,
		myEmail,
		recruiterEmail,
		companyName,
		companyDescription,
	} = req.body;

	const prompt = `My name is ${applicantName}. I want to work for ${companyName}, they are ${companyDescription}
	I am applying for the job ${jobTitle}. I have been working before for: ${remainderText()}
	And I have used the technologies such ass ${technologies}
	I want to cold email ${recruiterName} my resume and write why I fit for the company.
	Can you please write me the email in a friendly voice, not offical? without subject, maximum 300 words and say in the end that my CV is attached.`;

	const coverLetter = await GPTFunction(prompt);

	res.json({
		message: "Successful",
		cover_letter: coverLetter,
		recruiter_email: recruiterEmail,
		my_email: myEmail,
		applicant_name: applicantName,
	});
});

app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});
