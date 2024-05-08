import { useEffect } from "react";

import SectionContainerCard from "./components/SectionContainerCard";
import ProfileBio from "./components/ProfileBio";
import AvailiableSkills from "./components/AvailiableSkills";
import UpcomingTicket from "./components/UpcomingTicket";

import AdsSm from "./components/AdsSm";
import QuickContainer from "./components/QuickContainer";
import PostedNewsFeed from "./components/PostedNewsFeed";
import TopProfiles from "./components/TopProfiles";
import ComponentCard from "./components/ComponentCard";
import FeaturedMarketProduct from "./components/FeaturedMarketProduct";
import TopGigs from "./components/TopGigs";
import Articles from "./components/Articles";

import ExploreChannels from "./components/ExploreChannels";
import TrendingNews from "./components/TrendingNews";
import TopJobs from "./components/TopJobs";
import PostFeed from "./components/PostFeed";

import User1 from "../../assets/images/pngs/user1.png";
import User2 from "../../assets/images/pngs/user2.png";
import SpinToWin from "../../assets/images/pngs/SpinToWin.png";

import { useAuthContext } from '../../context/AuthContext';
import Header from "../../components/Header";
import "./style.css";
import Video from "./components/Video";
import LeftSideBar from "./components/LeftSideBar";
import TopSideBar from "./components/TopSideBar";

function index() {
	const { user } = useAuthContext();

	useEffect(function() {
        function handleScroll() {

			const allVideos = document.querySelectorAll(".video--player");
			const video = (entries, observer) => {
				entries.forEach((entry) => {
					// console.log(entry);

					if (entry.isIntersecting) {
						playVideo(entry.target)
						observer.unobserve(entry.target);
					}
				});
			};
			const videoObserver = new IntersectionObserver(video, {
				root: null,
				threshold: 0.5,
			});

			// Observer multiple targets!
			allVideos.forEach((video) => {
				pauseVideo(video)
				videoObserver.observe(video);
			});
		}

		function playVideo(video) {
            if (video.paused) {
                video.play().catch(error => {
                    console.error('Autoplay error:', error);
                });
            }
        };

        function pauseVideo(video) {
            if (!video.paused) {
                video.pause();
            }
        };

        // Add scroll event listener
        document.querySelector('.videos--container')?.addEventListener('scroll', handleScroll);

		// Call function on load
		handleScroll();

        // Clean up event listener
        return () => {
            document.querySelector('.videos--container')?.removeEventListener('scroll', handleScroll);
        };
    }, []);

	

	return (
		<>
			<Header />
			{/* <SectionContainerCard>
				<aside className="left__aside">
					{user && <ProfileBio user={user} /> }
					<AvailiableSkills />
					<UpcomingTicket />
				</aside>

				<main className="center__container">
					{user && <PostFeed user={user} /> }
					<AdsSm />
					<ComponentCard componentClassName={`quicks`}>
						<h3>Quicks</h3>
						<QuickContainer />
					</ComponentCard>
					<PostedNewsFeed userImage={User2} />
					<TopProfiles />
					<PostedNewsFeed userImage={User1} />
					<FeaturedMarketProduct />
					<TopGigs />
					<AdsSm />
					<PostedNewsFeed userImage={User1} />
					<Articles />
				</main>

				<aside className="right__aside">
					<TrendingNews />
					<ExploreChannels />
					<TopJobs />
					<div className="section_four">
						<img src={SpinToWin} alt={SpinToWin} />
					</div>
				</aside>
			</SectionContainerCard> */}

			<section className="channels--container">
				<LeftSideBar />
				<TopSideBar />
				<div className="videos--container">
					<Video />
					<Video />
					<Video />
					<Video />
					<Video />
				</div>
			</section>
		</>
	);
}

export default index;
