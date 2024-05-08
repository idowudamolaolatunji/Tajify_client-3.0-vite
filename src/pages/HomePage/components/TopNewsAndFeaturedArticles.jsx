import React, { useEffect, useState } from "react";

import MostSearchedAndFeaturedArticles from './MostSearchedAndFeaturedArticles';
import TopPosts from "./TopPost";


function TopNewsAndFeaturedArticles() {

  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);

   

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/blogs`, {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${token}`,
          },
        });

        if(!res.ok) throw new Error('Something went wrong');
        const data = await res.json();
        if(data.status !== 'success') throw new Error(data.message)

        
          // const truncatedPosts = response.data.data.blogs
          // .slice(0, 3)
          // .map((post) => ({
          //   ...post,
          //   content: truncateText(post.content, 20),
          // }));

        setPosts(data.data.blogs);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    
    window.scrollTo(0, 0); 
  }, []);

    return (
        <section className="section">
            <div className="section__container topnews-and-article">
                <TopPosts posts={posts} isLoading={isLoading} setIsLoading={setIsLoading} />
                <MostSearchedAndFeaturedArticles />
            </div>
        </section>
    )
}

export default TopNewsAndFeaturedArticles;
