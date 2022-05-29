import { Swiper, SwiperSlide} from 'swiper/react'
import 'swiper/css'

import styles from './styles.module.css'

export const Banner = () => {
    return (
        <div className={styles.container}>
            <Swiper
                slidesPerView={1}
            >
                <SwiperSlide>Slide 1</SwiperSlide>
                <SwiperSlide>Slide 2</SwiperSlide>
            </Swiper>
        </div>
    )
}
