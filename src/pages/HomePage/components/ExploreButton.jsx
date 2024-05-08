import { BsFillArrowRightCircleFill } from 'react-icons/bs';


function ExploreButton({ children }) {
    return (
        <span className="content__button">
            {children} <BsFillArrowRightCircleFill style={{display: 'inline'}} />
        </span>
    )
}

export default ExploreButton;
