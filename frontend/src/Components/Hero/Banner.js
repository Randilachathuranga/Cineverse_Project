import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './Banner.css'

import { Autoplay, Navigation, Pagination } from 'swiper/modules'; 
import { Swiper, SwiperSlide } from 'swiper/react';

import React from 'react';
import img1 from './assest/deadpool-wolverine-3840x2160-17749.jpg';
import img2 from './assest/Kalki-2898-AD.png';
import img3 from './assest/twisters-movie-qr-1920x1080.jpg';

const films= [
  {
    src: img1,
  },
  {
    src: img2,
  },
  {
    src: img3,
  },
];

function createSlide(film) {
  return (
    <SwiperSlide key={film.src}>
      <div className="banner-slide">
        <img src={film.src} alt={film.title} className="banner-img" />
        {/* Gradient Overlay */}
        <div className="banner-overlay">
          {/* Title and description overlay */}
          <div className="banner-text">
            <h1 className="banner-title">
              {film.title}
            </h1>
            <p className="banner-description">
              {film.description}
            </p>
          </div>
        </div>
      </div>
    </SwiperSlide>
  );
}

const Banner = () => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      slidesPerView={1}
      speed={1000}
      navigation
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      className="banner-swiper"
    >
      {films.map((film) => createSlide(film))}
    </Swiper>
  );
};

export default Banner;
