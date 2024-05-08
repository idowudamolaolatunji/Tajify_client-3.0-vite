import React from "react";


const keywordsData = ['Messi', 'Endsars', 'Online money', 'dreams', 'manchester united', 'wealth', 'nigeria', 'tinubu', 'petrol price', 'election results'];
function MostSearched() {
    const data = [...keywordsData];
    return (
        <div className="mostSearched">
            <h3 className="heading__tetariary heading__underline">Most searched keywords</h3>
            <ol className="keywords__list">
                <span>
                    {data.slice(0, 5).map((el) => {
                        return <Keyword title={el} key={el}/>
                    })}
                </span>
                <span>
                    {data.slice(5).map((el) => {
                        return <Keyword title={el} key={el}/>
                    })}
                </span>
            </ol>
        </div>
    );
};

function Keyword({ title }) {
    return <li><a href="#" className="keywork__link">{title}</a></li>
}

export default MostSearched;