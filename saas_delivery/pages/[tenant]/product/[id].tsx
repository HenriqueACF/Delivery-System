import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { UseApi } from "../../../libs/useApi";
import { Tenant } from "../../../types/Tenant";
import { useAppContext } from "../../../contexts/AppContext";
import styles from '../../../styles/Product-id.module.css'
import { Product } from "../../../types/Product";
import Head from "next/head";
import { Header } from "../../../components/Header";
import { Button } from "../../../components/Button";
import { useFormatter } from "../../../libs/useFormatter";
import { Quantity } from "../../../components/Quantity";

const Product = (data: Props) =>{

    const {tenant, setTenant} = useAppContext()
    const formatter = useFormatter()

    const [qtCount, setQtCount] = useState(0)

    useEffect(()=>{
        setTenant(data.tenant)
    }, [])

    const handleAddToCart = () => {

    }

    const handleUpdateQT = (newCount: number) => {
        setQtCount(newCount)
    }

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

        <div className={styles.category}>
            {data.product.categoryName}
        </div>

        <div className={styles.title} style={{borderBottomColor: data.tenant.mainColor}}>{data.product.name}</div>

        <div className={styles.line}></div>

        <div className={styles.description}>
            {data.product.description}
        </div>

        <div className={styles.qtdTxt}>Quantidade</div>

        <div className={styles.area}>
            <div className={styles.areaLeft}>
                <Quantity
                    color={data.tenant.mainColor}
                    count={qtCount}
                    onUpdateCount={handleUpdateQT}
                    min={1}
                    max={10}
                />
            </div>
            <div 
                className={styles.areaRight}
                style={{color: data.tenant.mainColor}}
            >{formatter.formatPrice(data.product.price)}</div>
        </div>

        <div className={styles.btnArea}>
            <Button
                color={data.tenant.mainColor}
                label='Adicionar à sacola'
                onClick={handleAddToCart}
                fill
            />
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
