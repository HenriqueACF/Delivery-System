import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay} from 'swiper'
import 'swiper/css'

import styles from './styles.module.css'

export const Banner = () => {
    return (
        <div className={styles.container}>
            <Swiper
                slidesPerView={1}
                loop={true}
                autoplay={{
                    delay:3000,
                    disableOnInteraction: false
                }}
                modules={[Autoplay]}
                className={styles.swiper}
            >
                <SwiperSlide className={styles.slide}> <div className={styles.slideImg}> <img src='/temp/banner1.png'/> </div> </SwiperSlide>
                <SwiperSlide className={styles.slide}> <div className={styles.slideImg}> <img src='/temp/banner2.png'/> </div> </SwiperSlide>
            </Swiper>
        </div>
    )
}
