import styles from './style.module.css'
import {Product} from '../../types/Product'
import Link from "next/link";
import { useAppContext } from "../../contexts/app";
import { useFormatter } from '../../libs/useFormatter';

type Props = {
    data: Product
}

export const ProductItem = ({data}:Props) =>{
    const {tenant} = useAppContext()
    const formatter = useFormatter()

    return(
        <Link href={`/${tenant?.slug}/product/${data.id}`}>
            <a  className={styles.container}>
                <div className={styles.head} style={{backgroundColor: tenant?.secondColor}}></div>
                <div className={styles.info}>
                    <div className={styles.img}>
                        <img src={data.image}/>
                    </div>
                    <div className={styles.catName}>{data.categoryName}</div>
                    <div className={styles.name}>{data.name}</div>
                    <div 
                        className={styles.price}
                        style={{color: tenant?.mainColor}}>
                            {formatter.formatPrice(data.price)}
                    </div>
                </div>
            </a>
        </Link>
    )
}
