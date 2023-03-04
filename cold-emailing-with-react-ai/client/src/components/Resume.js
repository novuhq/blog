import React, { useRef } from "react";
import ErrorPage from "./ErrorPage";
import { useReactToPrint } from "react-to-print";
import { Link } from "react-router-dom";

const Resume = ({ result }) => {
	const componentRef = useRef();

	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
		documentTitle: `${result.fullName} Resume`,
		onAfterPrint: () => alert("Print Successful!"),
	});

	if (JSON.stringify(result) === "{}") {
		return <ErrorPage />;
	}

	const replaceWithBr = (string) => {
		return string.replace(/\n/g, "<br />");
	};

	return (
		<>
			<div className='buttonGroup'>
				<button onClick={handlePrint}>Print Resume</button>
				<Link to='/send/resume' className='sendEmail'>
					Send via Email
				</Link>
			</div>

			<main className='container' ref={componentRef}>
				<header className='header'>
					<div>
						<h1>{result.fullName}</h1>
						<p className='resumeTitle headerTitle'>
							{result.currentPosition} ({result.currentTechnologies})
						</p>
						<p className='resumeTitle'>
							{result.currentLength}year(s) work experience
						</p>
					</div>
					<div>
						<img
							src={result.image_url}
							alt={result.fullName}
							className='resumeImage'
						/>
					</div>
				</header>
				<div className='resumeBody'>
					<div>
						<h2 className='resumeBodyTitle'>PROFILE SUMMARY</h2>
						<p
							dangerouslySetInnerHTML={{
								__html: replaceWithBr(result.objective),
							}}
							className='resumeBodyContent'
						/>
					</div>
					<div>
						<h2 className='resumeBodyTitle'>WORK HISTORY</h2>
						{result.workHistory.map((work) => (
							<p className='resumeBodyContent' key={work.name}>
								<span style={{ fontWeight: "bold" }}>{work.name}</span> -{" "}
								{work.position}
							</p>
						))}
					</div>
					<div>
						<h2 className='resumeBodyTitle'>JOB PROFILE</h2>
						<p
							dangerouslySetInnerHTML={{
								__html: replaceWithBr(result.jobResponsibilities),
							}}
							className='resumeBodyContent'
						/>
					</div>
					<div>
						<h2 className='resumeBodyTitle'>JOB RESPONSIBILITIES</h2>
						<p
							dangerouslySetInnerHTML={{
								__html: replaceWithBr(result.keypoints),
							}}
							className='resumeBodyContent'
						/>
					</div>
				</div>
			</main>
		</>
	);
};

export default Resume;
