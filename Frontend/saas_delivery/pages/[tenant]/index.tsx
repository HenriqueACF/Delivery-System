import {SearchInput} from "../../components/SearchInput";

import styles from '../../styles/Home.module.css'
import {Banner} from "../../components/Banner";
import {ProductItem} from "../../components/ProductItem";

const Home = () =>{

    //FUNCTIONS
    const handleSearch = (searchValue: string) =>{

    }


    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.headerTop}>
                    <div className={styles.headerTopLeft}>
                        <div className={styles.headerTitle}>
                            Seja Bem Vindo 👋
                        </div>
                        <div className={styles.headerSubTitle}>
                            O que deseja para hoje?
                        </div>
                    </div>
                    <div className={styles.headerTopRight}>
                        <div className={styles.menuButton}>
                            <div className={styles.menuButtonLine}></div>
                            <div className={styles.menuButtonLine}></div>
                            <div className={styles.menuButtonLine}></div>
                        </div>
                    </div>
                </div>
                <div className={styles.headerBottom}>
                    <SearchInput
                        mainColor="#FB9400"
                        onSearch={handleSearch}
                    />
                </div>
            </header>

            <Banner/>

            <div className={styles.grid}>
                <ProductItem
                    data={{id:1, image:'/temp/burger.png', categoryName:'Tradicional', name:'Texas Burger', price:'R$ 25,50'}}
                    mainColor="#FB9400"
                    secondColor="#CCC"
                />
                <ProductItem
                    data={{id:2 ,image:'/temp/burger.png', categoryName:'Tradicional', name:'Texas Burger', price:'R$ 25,50'}}
                    mainColor="#FB9400"
                    secondColor="#CCC"
                />
                <ProductItem
                    data={{id:3, image:'/temp/burger.png', categoryName:'Tradicional', name:'Texas Burger', price:'R$ 25,50'}}
                    mainColor="#FB9400"
                    secondColor="#CCC"
                />
                <ProductItem
                    data={{id:4, image:'/temp/burger.png', categoryName:'Tradicional', name:'Texas Burger', price:'R$ 25,50'}}
                    mainColor="#FB9400"
                    secondColor="#CCC"
                />
                <ProductItem
                    data={{id:5, image:'/temp/burger.png', categoryName:'Tradicional', name:'Texas Burger', price:'R$ 25,50'}}
                    mainColor="#FB9400"
                    secondColor="#CCC"
                />
                <ProductItem
                    data={{id:6, image:'/temp/burger.png', categoryName:'Tradicional', name:'Texas Burger', price:'R$ 25,50'}}
                    mainColor="#FB9400"
                    secondColor="#CCC"
                />
                <ProductItem
                    data={{id:7, image:'/temp/burger.png', categoryName:'Tradicional', name:'Texas Burger', price:'R$ 25,50'}}
                    mainColor="#FB9400"
                    secondColor="#CCC"
                />
            </div>
        </div>
    )
}

export default Home


