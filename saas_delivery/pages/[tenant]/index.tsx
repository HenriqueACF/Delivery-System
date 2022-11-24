import { useEffect, useState } from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";
import {SearchInput} from "../../components/SearchInput";
import { UseApi } from "../../libs/useApi";
import { Tenant } from "../../types/Tenant";
import { useAppContext } from "../../contexts/app";
import styles from '../../styles/Home.module.css'
import {Banner} from "../../components/Banner";
import {ProductItem} from "../../components/ProductItem";
import { Product } from "../../types/Product";
import { Sidebar } from "../../components/SideBar";

const Home = (data: Props) =>{

    const {tenant, setTenant} = useAppContext()

    const [products, setProducts] = useState<Product[]>(data.products)

    useEffect(()=>{
        setTenant(data.tenant)
    }, [])

    //FUNCTIONS
    const handleSearch = (searchValue: string) =>{
        console.log(`Você está buscando por: ${searchValue}`)
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Cardapio |{data.tenant.name}</title>
            </Head>
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
                        <Sidebar/>
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
               {products.map((item, index) => (
                <ProductItem key={index} data={item}/>
               ))}
            </div>
        </div>
    )
}

export default Home

type Props = {
    tenant: Tenant,
    products: Product[]
}

export const getServerSideProps: GetServerSideProps = async (context)=>{
    const {tenant: tenantSlug} = context.query
    const api = UseApi(tenantSlug as string)
    
    //get tenant
    const tenant = await api.getTenant()
    if(!tenant){
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    //get products
    const products = await api.getAllProducts()

    console.log('TENANT ->', tenantSlug)
    return {
        props:{
            tenant,
            products
        }
    }
}
