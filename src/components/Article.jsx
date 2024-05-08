import { Link, useParams } from "react-router-dom";
import ArticleSocialInfo from "./ArticleSocialInfo";
import { useEffect, useState } from "react";

import 'react-loading-skeleton/dist/skeleton.css';
import BlogCardSkeleton from "./uis/BlogCardSkeleton";
import AvatarImg from "./../assets/images/pngs/avatar.png";
import { getInitials } from "../utils/helper";


function Article({ image, articleComments }) {
	const [isLoading, setIsLoading] = useState(false);
	const [trendingBlogs, setTrendingBlogs] = useState([]);

	// BLOG RANDOM SHUFFLE FUNCTION
	function shuffleArray(array) {
		for (let i = array?.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
		return array;
	}

	async function handleFetchTrendingBlog() {
		try {
			setIsLoading(true);
			const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/blogs`, {
				method: 'GET',
				headers: {
					"Content-Type": 'application/json',
				}
			});
			if (!res.ok) throw new Error('Something went wrong!');
			const data = await res.json();
			if (data.status !== 'success') {
				throw new Error(data.message);
			}
			const shuffledBlogs = shuffleArray(data.data.blogs);
			setTrendingBlogs(shuffledBlogs);
		} catch (err) {
			console.log(err.message)
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		handleFetchTrendingBlog();
	}, []);


	return (
		<>
			{(isLoading) && (
				<>
					<BlogCardSkeleton />
					<BlogCardSkeleton />
					<BlogCardSkeleton />
				</>
			)}

			{(trendingBlogs?.length > 0 && !isLoading) && trendingBlogs?.slice(0, 3).map(post => (
				<figure className="article__figure">
					<Link to={`/blogs/${post?.slug}`}>
						<div className="article__image--box">
							<img
								src={`${import.meta.env.VITE_SERVER_ASSET_URL}/blogs/${post.image}`}
								alt={`article on ${image}`}
								className="article__image"
							/>
						</div>
					</Link>

					<div className="article__content--box">
						<div className="article__author-info">
							<Link to={`/${post?.creator?._id}/blogs`}>
								{(post?.creator?.image) ? (
									<img
										src={post?.creator?.image}
										alt="author image"
										className="article-author__image"
									/>
								) : (
									<span className="article__initials img-initials">
										{getInitials(post?.creator?.fullname)}
									</span>
								)}
							</Link>

							<span className="author">
								<Link to={`/${post.creator._id}/blogs`}>
									<h4 className="article__author">{post.creator.username}</h4>
								</Link>

								<p className="article__time">{post.time}</p>
							</span>
							<span className="author__others">
							</span>

						</div>

						<Link to={`/details/${post._id}`}>
							<h3 className="article__heading">{post.title}</h3>
						</Link>
						<div className="article__text">
							{post.preview}
						</div>

						<ArticleSocialInfo
							avatarImg={AvatarImg}
							articleComments={articleComments}
							postId={post._id}
							totalLikes={post.likesCounts}
						/>
					</div>
				</figure>
			))}


		</>
	);
}

export default Article;
