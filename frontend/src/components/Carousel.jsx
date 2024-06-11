import React from 'react';
import { useState } from 'react';
import image5 from '../images/image5.jpg';
import image17 from '../images/image17.jpg';
import image18 from '../images/image18.jpg';
import '../css/carousel/carousel.css';





export default function Carousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSlide = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="carousel-wrapper">
      <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            className={activeIndex === 0 ? 'active' : ''}
            onClick={() => handleSlide(0)}
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
            className={activeIndex === 1 ? 'active' : ''}
            onClick={() => handleSlide(1)}
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="2"
            className={activeIndex === 2 ? 'active' : ''}
            onClick={() => handleSlide(2)}
          ></button>
        </div>
        <div className="carousel-inner">
          <div className={`carousel-item ${activeIndex === 0 ? 'active' : ''}`}>
            <img src={image5} className="d-block w-100" alt="..." />
          </div>
          <div className={`carousel-item ${activeIndex === 1 ? 'active' : ''}`}>
            <img src={image17} className="d-block w-100" alt="..." />
          </div>
          <div className={`carousel-item ${activeIndex === 2 ? 'active' : ''}`}>
            <img src={image18} className="d-block w-100" alt="..." />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <div className="search-box">
  <input type="text" className="form-control"  placeholder="Search" style={{width:'800px',borderRadius: '20px' }} />
  <button className="btn btn-secondary search-btn" >Search</button>
</div>
    </div>
  );
}
