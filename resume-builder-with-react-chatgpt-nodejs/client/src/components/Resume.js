import React from "react";
import ErrorPage from "./ErrorPage";

const Resume = ({ result }) => {
	if (JSON.stringify(result) === "{}") {
		return <ErrorPage />;
	}

	const replaceWithBr = (string) => {
		return string.replace(/\n/g, "<br />");
	};

	return (
		<main className='container'>
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
	);
};

export default Resume;
