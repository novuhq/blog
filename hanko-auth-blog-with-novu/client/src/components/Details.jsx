import React, { useCallback, useEffect, useState } from "react";
import { AiTwotoneLike, AiTwotoneDislike } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { fetchPostContent, postReaction } from "../utils.js/util";

const Details = () => {
	const { slug } = useParams();
	const [post, setPost] = useState({});
	const [loading, setLoading] = useState(true);

	const fetchPostDetails = useCallback(() => {
		fetchPostContent(slug, setLoading, setPost)
	}, [slug]);

	useEffect(() => {
		fetchPostDetails();
	}, [fetchPostDetails]);

	const reactToPost = (slug, type) => {
		postReaction(slug, type)
	};

	if (loading) return <p>Loading...</p>;

	return (
		<div>
			<header className='details_header'>
				<h1 className='details_heading'>{post.title}</h1>
				<div className='post_details'>
					<div>
						<p className='details_date'>Posted on {post.published_date}</p>
					</div>
					<div className='reactions-group'>
						<button
							className='reactBtn'
							onClick={() => reactToPost(slug, "like")}
						>
							Like <AiTwotoneLike />{" "}
							<span style={{ marginLeft: 5 }}>{post.likes.length}</span>
						</button>
						<button
							className='reactBtn unlikeBtn'
							onClick={() => reactToPost(slug, "dislike")}
						>
							Dislike <AiTwotoneDislike />
							<span style={{ marginLeft: 5 }}>{post.dislikes.length}</span>
						</button>
					</div>
				</div>
			</header>
			<main className='details_body'>{post.content}</main>
		</div>
	);
};

export default Details;
