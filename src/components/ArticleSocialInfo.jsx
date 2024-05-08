import { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { LiaComments } from "react-icons/lia";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { formatLikes } from "../utils/helper";

function ArticleSocialInfo({ avatarImg, articleComments, postId, totalLikes }) {
    const [likes, setLikes] = useState(totalLikes);
    const [liked, setLiked] = useState(false);
    const [showComments, setShowComments] = useState(false);

    const { user, token } = useAuthContext();

    useEffect(() => {
        async function fetchCurrPost() {
            try {
                const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/blogs/${postId}`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": 'application/json',
                    }
                });
                const data = await res.json();
                if (data.data.blog.likes.includes(user._id)) {
                    setLiked(true)
                }
            } catch (err) {
                console.error(err.message)
            }
        }
        fetchCurrPost()
    }, [])


    const toggleLike = async () => {
        // Toggle liked state
        setLiked(!liked);

        try {
            if (liked) {
                const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/blogs/unlike-post/${postId}`, {
                    method: 'PATCH',
                    headers: {
                        "Content-Type": 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                });
                if (!res.ok) throw new Error('Something went wrong!');
                const data = await res.json();
                if (data.status !== 'success') throw new Error(data.message);
                setLikes(prevLikes => prevLikes - 1);
            } else {
                const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/blogs/like-post/${postId}`, {
                    method: 'PATCH',
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                });
                if (!res.ok) throw new Error('Something went wrong!');
                const data = await res.json();
                if (data.status !== 'success') throw new Error(data.message);
                setLikes(prevLikes => prevLikes + 1);
            }

        } catch (err) {
            console.error(err.message)
        }
    };

    const toggleComments = () => {
        setShowComments(!showComments);
    };



    return (
        <div className="article__social--info">
            {avatarImg && (
                <div className="social--info">
                    <span className="views--images">
                        <img src={avatarImg} alt={"article views"} />
                        <img src={avatarImg} alt={"article views"} />
                        <img src={avatarImg} alt={"article views"} />
                        <img src={avatarImg} alt={"article views"} />
                    </span>
                    <p className="article__social--figure">+ {''} views</p>
                </div>
            )}
            <div className="social--info">
                {liked ? (
                    <AiFillHeart onClick={toggleLike} className="post--like" />
                ) : (
                    <AiOutlineHeart onClick={toggleLike} />
                )}
                <p className="article__social--figure">{formatLikes(likes)}</p>
            </div>
            <Link to={`/details/${postId}?commentBar=true`}>
                <div className="social--info">
                    <LiaComments />
                    <p className="article__social--figure">{articleComments} comments</p>
                </div>
            </Link>
        </div>
    );
}

export default ArticleSocialInfo;
