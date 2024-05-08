




import React from 'react'
import ArticleSocialInfo from './ArticleSocialInfo'
import { Link, useNavigate } from 'react-router-dom'
import { getInitials, truncateText } from '../utils/helper'

function BlogPost({ post }) {

    const navigate = useNavigate();

    return (
        // <figure className="article__figure" onClick={() => navigate(`/blogs/${post?.slug}`)}>
        <figure className="article__figure">
            <Link to={`/blogs/${post?.slug}`}>
                <div className="article__image--box">
                    <img
                        src={`${import.meta.env.VITE_SERVER_ASSET_URL}/blogs/${post?.image}`}
                        alt={`article on ${post?.image}`}
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
                        <Link to={`/${post?.creator?._id}/blogs`}>
                            <h4 className="article__author">{post?.creator?.username}</h4>
                        </Link>

                        <p className="article__time">{post?.time}</p>
                    </span>
                    <span className="author__others">
                    </span>

                </div>

                <Link to={`/blogs/${post?.slug}`}>
                    <h3 className="article__heading">{post?.title}</h3>
                </Link>

                {/* <h3 className="article__heading">{post?.title}</h3> */}
                <div className="article__text">
                    {truncateText(post?.preview, 15)}
                </div>

                <ArticleSocialInfo
                    articleComments={'3'}
                    postId={post?._id}
                    totalLikes={post?.likesCounts}
                />
            </div>
        </figure>
    )
}

export default BlogPost
