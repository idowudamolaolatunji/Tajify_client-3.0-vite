import { Link } from "react-router-dom";
import ExploreImg from "../../../assets/images/pngs/explore-skill-img.png";
import ExploreButton from "./ExploreButton";

function ExploreSkills() {
    return (
        <section className="section explore-skills__section">
            <div className="section__container explore-skills">
                <div className="explore-skills--text">
                    <h2 className="explore-skills__heading">
                        Explore your <span className="explore__extra">writing skills</span>
                    </h2>
                    <div className="explore-skills__content">
                        <span className="content--box">
                            <h3 className="content__heading">Read</h3>
                            <p className="content__text">
                                Spend time on the platform reading articles and also earn while
                                reading.
                            </p>
                        </span>
                        <span className="content--box">
                            <h3 className="content__heading">Write</h3>
                            <p className="content__text">
                                Publish your first content and share your thoughts with various
                                individuals through writing..
                            </p>
                        </span>
                        <span className="content--box">
                            <h3 className="content__heading">Monetize</h3>
                            <p className="content__text">Earn as a creator or as a user</p>
                        </span>

                        <Link to="/writer">
                            <ExploreButton><Link to='/category'>Explore blog</Link></ExploreButton>
                        </Link>
                    </div>
                </div>
                <div className="explore-skills--image">
                    <img
                        src={ExploreImg}
                        alt="explore skills image"
                        className="explore__image"
                    />
                </div>
            </div>
        </section>
    );
}

export default ExploreSkills;
