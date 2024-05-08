import React, { useEffect, useRef, useState } from "react";
import MostSearched from "./MostSearched";
import FeaturedArticles from "./FeaturedArticles";
// import Jobs from "./Jobs";

function MostSearchedAndFeaturedArticles() {
  const [adLoaded, setAdLoaded] = useState(false);

  const handleScriptLoad = () => {
    setAdLoaded(true);
    if (typeof window.adsbygoogle !== "undefined") {
      window.adsbygoogle.push({});
    }
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.crossOrigin = "anonymous";
    script.async = true;
    script.onload = handleScriptLoad;
    document.head.appendChild(script);
  }, []);

  console.log(adLoaded)

  return (
    <div>
      <MostSearched />
      {/* <div className="ads__box--big">&nbsp;</div> */}
      <div className="ads__box--big">
        <div>
          {adLoaded && (
            <ins
              className="adsbygoogle"
              style={{ display: "block" }}
              data-ad-client="ca-pub-3834887523835766"
              data-ad-slot="9801346744"
              data-ad-format="auto"
              data-full-width-responsive="true"
            ></ins>
          )}
        </div>
      </div>
      <FeaturedArticles />
      {/* <Jobs /> */}
    </div>
  );
}

export default MostSearchedAndFeaturedArticles;
