import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PropTypes from "prop-types";
import Products from "../Products/Products";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useEffect, useState } from "react";
import api from "../../services/Api";
import { Link } from "react-router-dom";

function Home() {
  const [sliderData, setSliderData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    getSliderData();
    getCategoryData();
  }, []);

  const getSliderData = async () => {
    try {
      const response = await api.get("/sliders");
      setSliderData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCategoryData = async () => {
    try {
      const response = await api.get("/category");
      setCategoryData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const bannerSettings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    dots: true,
    appendDots: (dots) => (
      <div style={{ position: "absolute", right: "490px", bottom: "-40px" }}>
        <ul style={{ margin: "0" }}>{dots}</ul>
      </div>
    ),
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const categorySettings = {
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <CustomNextArrowCategory />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  function CustomPrevArrow(props) {
    const { onClick } = props;
    return (
      <div style={{ position: "absolute", top: "50%", left: "37px", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px", borderRadius: "50%", zIndex: 1, cursor: "pointer", transform: "translateY(-50%)" }} onClick={onClick}>
        <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "white", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <FaChevronLeft color="#666" size={20} />
        </div>
      </div>
    );
  }

  function CustomNextArrow(props) {
    const { onClick } = props;
    return (
      <div style={{ position: "absolute", top: "50%", right: "37px", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px", borderRadius: "50%", zIndex: 1, cursor: "pointer", transform: "translateY(-50%)" }} onClick={onClick}>
        <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "white", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <FaChevronRight color="#666" size={20} />
        </div>
      </div>
    );
  }

  function CustomNextArrowCategory(props) {
    const { onClick } = props;
    return (
      <div style={{ position: "absolute", top: "50%", right: "-10px", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px", borderRadius: "50%", zIndex: 1, cursor: "pointer", transform: "translateY(-50%)" }} onClick={onClick}>
        <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "white", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <FaChevronRight color="#666" size={20} />
        </div>
      </div>
    );
  }
  CustomPrevArrow.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    onClick: PropTypes.func,
  };

  CustomNextArrow.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    onClick: PropTypes.func,
  };

  CustomNextArrowCategory.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    onClick: PropTypes.func,
  };

  // Fungsi untuk menghasilkan warna acak
  const getRandomColor = () => {
    const colors = ["#CC0B04", "#1C3391", "#F67B02", "#E31F51", "#57CD9E"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <>
      <div className="w-4/5 container mx-auto mt-10">
        <div className="slider-container">
          <Slider {...bannerSettings}>
            {sliderData.map((slider) => (
              <div key={slider.id} className="px-2">
                <div className="relative">
                  <img className="w-full rounded-md" src={slider.photo} alt={slider.title} />
                  <div className="absolute inset-0 flex justify-center items-center">
                    <h3 className="text-white text-lg md:text-2xl font-bold mb-2 md:mb-0">{slider.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      <div className="w-4/5 container mx-auto mt-10 md:mt-20">
        <h1 className="text-4xl font-bold mb-4">Category</h1>
        <p className="text-gray-700 mb-8">What are you currently looking for</p>
        <div className="slider-container">
          <Slider {...categorySettings}>
            {categoryData.map((category) => (
              <div key={category.id} className="px-2">
                <Link to={`/products/category/${category.id}`} className="block relative">
                  <div className="w-full h-48 rounded-md overflow-hidden flex justify-center items-center" style={{ backgroundColor: getRandomColor() }}>
                    <img className="w-36 h-36" src={category.photo} alt={category.name} />
                  </div>
                  <div className="absolute inset-0 flex justify-center items-center rounded-md">
                    <h3 className="text-white text-2xl font-bold md:text-lg">{category.name}</h3>
                  </div>
                </Link>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      {/* Products */}

      <Products />
    </>
  );
}

export default Home;
