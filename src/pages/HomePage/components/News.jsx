import React from "react";
import { AiOutlineCalendar } from "react-icons/ai";
import { LiaComments } from "react-icons/lia";
import { Link } from "react-router-dom";
import { truncateText } from "../../../utils/helper";

function News({ posts }) {
	return (
		<div className="news__cards">
			{posts.map((post) => (
				<div key={post._id} className="news__item">
					<div className="news__figure">
						<Link to={`/blogs/${post?.slug}`}>
							<div className="news__image--box">
								<img src={`${import.meta.env.VITE_SERVER_ASSET_URL}/blogs/${post?.image}`} alt="title" className="news__image" />
							</div>
						</Link>
						<div className="news__content--box">
							<Link to={`/blogs/${post?.slug}`}>
								<h4 className="news__title">{post.title}</h4>
							</Link>
							<span className="news__date--box">
								<span>
									<AiOutlineCalendar />
									<p>
										{new Date(post.date).toLocaleString("en-US", {
											year: "numeric",
											month: "long",
											day: "numeric",
										})}
									</p>
								</span>
								<span>
									<LiaComments />
									<p>{post.comments}</p>
								</span>
							</span>
							<p className="news__text">{truncateText(post?.preview, 20)}</p>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}

export default News;
