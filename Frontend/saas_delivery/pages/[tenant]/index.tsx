import {SearchInput} from "../../components/SearchInput";

import styles from '../../styles/Home.module.css'
import {Banner} from "../../components/Banner";
import {ProductItem} from "../../components/ProductItem";
import { UseApi } from "../../libs/useApi";
import { GetServerSideProps } from "next";
import { Tenant } from "../../types/Tenant";
import { useAppContext } from "../../contexts/AppContext";
import { useEffect } from "react";

const Home = (data: Props) =>{

    // const api = UseApi()
    // const tenant = api.getTenant('BurgerLanches')
    // if(tenant){
    //     // redirect
    // }

    const {tenant, setTenant} = useAppContext()

    useEffect(()=>{
        setTenant(data.tenant)
    }, [])

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
                            <div className={styles.menuButtonLine} style={{backgroundColor: tenant?.mainColor}}></div>
                            <div className={styles.menuButtonLine} style={{backgroundColor: tenant?.mainColor}}></div>
                            <div className={styles.menuButtonLine} style={{backgroundColor: tenant?.mainColor}}></div>
                        </div>
                    </div>
                </div>
                <div className={styles.headerBottom}>
                    <SearchInput
                        onSearch={handleSearch}
                    />
                </div>
            </header>

            <Banner/>

            <div className={styles.grid}>
                <ProductItem
                    data={{id:1, image:'/temp/burger.png', categoryName:'Tradicional', name:'Texas Burger', price:'R$ 25,50'}}
                />
                <ProductItem
                    data={{id:2 ,image:'/temp/burger.png', categoryName:'Tradicional', name:'Texas Burger', price:'R$ 25,50'}}
                />
                <ProductItem
                    data={{id:3, image:'/temp/burger.png', categoryName:'Tradicional', name:'Texas Burger', price:'R$ 25,50'}}
                />
                <ProductItem
                    data={{id:4, image:'/temp/burger.png', categoryName:'Tradicional', name:'Texas Burger', price:'R$ 25,50'}}
                />
                <ProductItem
                    data={{id:5, image:'/temp/burger.png', categoryName:'Tradicional', name:'Texas Burger', price:'R$ 25,50'}}
                />
                <ProductItem
                    data={{id:6, image:'/temp/burger.png', categoryName:'Tradicional', name:'Texas Burger', price:'R$ 25,50'}}
                />
                <ProductItem
                    data={{id:7, image:'/temp/burger.png', categoryName:'Tradicional', name:'Texas Burger', price:'R$ 25,50'}}
                />
                 <ProductItem
                    data={{id:7, image:'/temp/burger.png', categoryName:'Tradicional', name:'Texas Burger', price:'R$ 25,50'}}
                />
            </div>
        </div>
    )
}

export default Home

type Props = {
    tenant: Tenant
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
