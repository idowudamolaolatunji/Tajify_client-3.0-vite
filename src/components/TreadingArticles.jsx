import React, { useEffect, useState } from "react";
import Article from "./Article";



const TreadingArticles = () => {
    return (
        <section className="section trending-article__section">
            <div className="section__container">
                <h2 className="heading__tetariary">Trending Articles</h2>

                <div className="article__cards">
                    <Article />
                </div>
                
            </div>
        </section>
    );
};

export default TreadingArticles;
