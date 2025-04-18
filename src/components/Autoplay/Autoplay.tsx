import "./Autoplay.css";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

import bannerComputaria from "../../assets/Banners/BannerComputaria.jpg";
import BannerBancodeDados from "../../assets/Banners/BannerBancodeDados.jpg";
import BannerCommit from "../../assets/Banners/BannerCommit.jpg";
import BannerDeletesemWhere from "../../assets/Banners/BannerDeletesemWhere.jpg";

// foi utilizado o componente do site https://keen-slider.io/

const animation = { duration: 5000, easing: (t: number) => t };

export default function Autoplay() {
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    renderMode: "performance",
    drag: false,
    created(s) {
      s.moveToIdx(1, true, animation);
    },
    updated(s) {
      s.moveToIdx(s.track.details.abs + 1, true, animation);
    },
    animationEnded(s) {
      s.moveToIdx(s.track.details.abs + 1, true, animation);
    },
  });
  return (
    <div ref={sliderRef} className="keen-slider">
      <div className="keen-slider__slide number-slide1">
        <img src={bannerComputaria} className="banner-image" alt="1" />
      </div>
      <div className="keen-slider__slide number-slide2">
        <img src={BannerBancodeDados} className="banner-image" alt="2" />
      </div>
      <div className="keen-slider__slide number-slide3">
        <img src={BannerCommit} className="banner-image" alt="3" />
      </div>
      <div className="keen-slider__slide number-slide4">
        <img
          src={BannerDeletesemWhere}
          className="banner-image"
          alt="4
        "
        />
      </div>
    </div>
  );
}
