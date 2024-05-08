import React, { useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Slide1 from "../../../assets/images/market-slide/slider-1.webp";
import Slide2 from "../../../assets/images/market-slide/slider-3.webp";
import Slide3 from "../../../assets/images/market-slide/slider.jpg";
import Slide4 from "../../../assets/images/market-slide/Desktop_Homepage_Slider__712x384.jpg";
import Slide5 from "../../../assets/images/market-slide/Beauty_shop_712x384.jpg";

const MarketHeroSlider = () => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()]);

    useEffect(() => {
        if (emblaApi) {
            console.log(emblaApi.slideNodes());
        }
    }, [emblaApi]);

    return (
        <div className="hero--carausel">
            <div className="embla" ref={emblaRef}>
                <div className="embla__container">
                    <div className="embla__slide">
                        <img src={Slide3} alt="" />
                    </div>
                    <div className="embla__slide">
                        <img src={Slide1} alt="" />
                    </div>
                    <div className="embla__slide">
                        <img src={Slide4} alt="" />
                    </div>
                    <div className="embla__slide">
                        <img src={Slide2} alt="" />
                    </div>
                    <div className="embla__slide">
                        <img src={Slide5} alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MarketHeroSlider;
