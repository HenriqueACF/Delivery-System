import {SearchInput} from "../../components/SearchInput";

import styles from '../../styles/Home.module.css'
import {Banner} from "../../components/Banner";
import {ProductItem} from "../../components/ProductItem";
import { getTenantResponse, UseApi } from "../../libs/useApi";
import { GetServerSideProps } from "next";

const Home = (data: Props) =>{

    // const api = UseApi()
    // const tenant = api.getTenant('BurgerLanches')
    // if(tenant){
    //     // redirect
    // }

    //FUNCTIONS
    const handleSearch = (searchValue: string) =>{
        console.log(`Você está buscando por: ${searchValue}`)
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
                            <div className={styles.menuButtonLine} style={{backgroundColor: data.tenant.mainColor}}></div>
                            <div className={styles.menuButtonLine} style={{backgroundColor: data.tenant.mainColor}}></div>
                            <div className={styles.menuButtonLine} style={{backgroundColor: data.tenant.mainColor}}></div>
                        </div>
                    </div>
                </div>
                <div className={styles.headerBottom}>
                    <SearchInput
                        mainColor={data.tenant.mainColor}
                        onSearch={handleSearch}
                    />
                </div>
            </header>

            <Banner/>

            <div className={styles.grid}>
                <ProductItem
                    data={{id:1, image:'/temp/burger.png', categoryName:'Tradicional', name:'Texas Burger', price:'R$ 25,50'}}
                    mainColor={data.tenant.mainColor}
                    secondColor={data.tenant.secondColor}
                />
                <ProductItem
                    data={{id:2 ,image:'/temp/burger.png', categoryName:'Tradicional', name:'Texas Burger', price:'R$ 25,50'}}
                    mainColor={data.tenant.mainColor}
                    secondColor={data.tenant.secondColor}
                />
                <ProductItem
                    data={{id:3, image:'/temp/burger.png', categoryName:'Tradicional', name:'Texas Burger', price:'R$ 25,50'}}
                    mainColor={data.tenant.mainColor}
                    secondColor={data.tenant.secondColor}
                />
                <ProductItem
                    data={{id:4, image:'/temp/burger.png', categoryName:'Tradicional', name:'Texas Burger', price:'R$ 25,50'}}
                    mainColor={data.tenant.mainColor}
                    secondColor={data.tenant.secondColor}
                />
                <ProductItem
                    data={{id:5, image:'/temp/burger.png', categoryName:'Tradicional', name:'Texas Burger', price:'R$ 25,50'}}
                    mainColor={data.tenant.mainColor}
                    secondColor={data.tenant.secondColor}
                />
                <ProductItem
                    data={{id:6, image:'/temp/burger.png', categoryName:'Tradicional', name:'Texas Burger', price:'R$ 25,50'}}
                    mainColor={data.tenant.mainColor}
                    secondColor={data.tenant.secondColor}
                />
                <ProductItem
                    data={{id:7, image:'/temp/burger.png', categoryName:'Tradicional', name:'Texas Burger', price:'R$ 25,50'}}
                    mainColor={data.tenant.mainColor}
                    secondColor={data.tenant.secondColor}
                />
                 <ProductItem
                    data={{id:7, image:'/temp/burger.png', categoryName:'Tradicional', name:'Texas Burger', price:'R$ 25,50'}}
                    mainColor={data.tenant.mainColor}
                    secondColor={data.tenant.secondColor}
                />
            </div>
        </div>
    )
}

export default Home

type Props = {
    tenant: getTenantResponse
}

export const getServerSideProps: GetServerSideProps = async (context)=>{
    const {tenant: tenantSlug} = context.query
    const api = UseApi()
    
    //get tenant
    const tenant = await api.getTenant(tenantSlug as string)
    if(!tenant){
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    console.log('TENANT ->', tenantSlug)
    return {
        props:{
            tenant
        }
    }
}
