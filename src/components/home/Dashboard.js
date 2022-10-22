import { useEffect } from 'react';
import styles from './Dashboard.module.css';
import { data } from './CarouselData';
import Item from './Item';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Autoplay, Scrollbar } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
function Dashboard() {
  useEffect(() => {
    SwiperCore.use([Autoplay]);
  }, []);

  return (
    <div className={styles.container}>
      <Swiper
        className={styles.swiperSlide}
        modules={[Scrollbar, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        loop={true}
        autoplay={{
          delay: 4000,
        }}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => {
          console.log(swiper);
        }}
        onSlideChange={() => console.log('slide change')}
      >
        {data
          ? data.map((item, index) => {
              return (
                <SwiperSlide className={styles.swiperSlide} key={index}>
                  <Item item={item} />
                </SwiperSlide>
              );
            })
          : ''}
      </Swiper>
    </div>
  );
}

export default Dashboard;
