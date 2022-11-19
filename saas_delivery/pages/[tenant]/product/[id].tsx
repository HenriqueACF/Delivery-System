import { useEffect } from "react";
import { GetServerSideProps } from "next";
import { UseApi } from "../../../libs/useApi";
import { Tenant } from "../../../types/Tenant";
import { useAppContext } from "../../../contexts/AppContext";
import styles from '../../../styles/Product-id.module.css'
import { Product } from "../../../types/Product";
import Head from "next/head";
import { Header } from "../../../components/Header";

const Product = (data: Props) =>{

    const {tenant, setTenant} = useAppContext()

    useEffect(()=>{
        setTenant(data.tenant)
    }, [])

    return (
        <div className={styles.container}>
           <Head>
            <title>{data.product.name} | {data.tenant.name}</title>
           </Head>
        
        <div className={styles.headerArea}>
            <Header
                color={data.tenant.mainColor}
                backHref={`/${data.tenant.slug}`}
                title="Produto"
                invert
            />    
        </div>

        <div 
            className={styles.headerBG}
            style={{backgroundColor: data.tenant.mainColor}}
            ></div>

        <div className={styles.productIMG}>
            <img src={data.product.image} alt="imagem do produto"/>
        </div>


        </div>
    )
}

export default Product

type Props = {
    tenant: Tenant,
    product: Product
}

export const getServerSideProps: GetServerSideProps = async (context)=>{

    const {tenant: tenantSlug, id} = context.query
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

    //get product
    const product = await api.getProduct(id as string)

    return {
        props:{
            tenant,
            product
        }
    }
    console.log('TENANT ->', tenantSlug)
}
