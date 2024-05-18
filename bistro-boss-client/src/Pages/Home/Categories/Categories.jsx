import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import slide1 from '../../../assets/asset/home/slide1.jpg'
import slide2 from '../../../assets/asset/home/slide2.jpg'
import slide3 from '../../../assets/asset/home/slide3.jpg'
import slide4 from '../../../assets/asset/home/slide4.jpg'
import slide5 from '../../../assets/asset/home/slide5.jpg'
import SectionTitle from '../../../components/SectionTitle/SectionTitle';


const Categories = () => {
    return (
        <section>
            <SectionTitle subHeading={"From 11:00am to 10:00pm"}  heading={"ORDER ONLINE"}>
               
            </SectionTitle>
        <Swiper
          slidesPerView={4}
          spaceBetween={30}
          centeredSlides={true}
          pagination={{
            clickable: true,
          }}
          loop={true}
          modules={[Pagination]}
          className="mySwiper mb-16"
        >
          <SwiperSlide>
            <img src={slide1} alt="" />
            <h3 className='font-cinzel uppercase text-4xl text-white -mt-14 text-center'>Salads</h3>
          </SwiperSlide>
          <SwiperSlide> <img src={slide2} alt="" />
            <h3 className='font-cinzel text-4xl uppercase text-white -mt-14 text-center'>Soups</h3></SwiperSlide>
          <SwiperSlide>
          <img src={slide3} alt="" />
            <h3 className='font-cinzel uppercase text-4xl text-white -mt-14 text-center'>Pizzas</h3>
          </SwiperSlide>
          <SwiperSlide>
          <img src={slide4} alt="" />
            <h3 className='font-cinzel uppercase text-4xl text-white -mt-14 text-center'>Deserts</h3>
          </SwiperSlide>
          <SwiperSlide>
          <img src={slide5} alt="" />
            <h3 className='font-cinzel uppercase text-4xl text-white -mt-14 text-center'>Salads</h3>
          </SwiperSlide>
          
          
        </Swiper>
      </section>
    );
};

export default Categories;