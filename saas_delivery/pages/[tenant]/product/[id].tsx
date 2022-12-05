import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { UseApi } from "../../../libs/useApi";
import { Tenant } from "../../../types/Tenant";
import { useAppContext } from "../../../contexts/app";
import styles from '../../../styles/Product-id.module.css'
import { Product } from "../../../types/Product";
import Head from "next/head";
import { Header } from "../../../components/Header";
import { Button } from "../../../components/Button";
import { useFormatter } from "../../../libs/useFormatter";
import { Quantity } from "../../../components/Quantity";
import { CartCookie } from "../../../types/CartCookie";
import { getCookie, hasCookie, setCookie } from "cookies-next";
import { useRouter } from "next/router";

const Product = (data: Props) =>{

    const {tenant, setTenant} = useAppContext()
    const formatter = useFormatter()
    const router = useRouter()

    const [qtCount, setQtCount] = useState(1)

    useEffect(()=>{
        setTenant(data.tenant)
    }, [])

    const handleAddToCart = () => {

        let cart: CartCookie[] = []

        // verifico se ja existe um carrinho de compras
        // se nao crio um
        if(hasCookie('cart')){
            const cartCookie = getCookie('cart')
            const cartJson: CartCookie[] = JSON.parse(cartCookie as string)

            for(let i in cartJson){
                if(cartJson[i].qt && cartJson[i].id){
                    cart.push(cartJson[i])
                }
            }
        }

        // busco um item no carrinho
        const cartIndex = cart.findIndex(item => item.id === data.product.id)

        if(cartIndex > -1){
            cart[cartIndex].qt += qtCount
        } else {
            cart.push({id: data.product.id, qt: qtCount})
        }

        console.log('cart ->', cart)
        // settar cookie
        setCookie('cart', JSON.stringify(cart))

        // redireciona para a pagina do carrinho
        router.push(`/${data.tenant.slug}/cart`)
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
                    max={30}
                    small
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
    const product = await api.getProduct(parseInt(id as string))

    return {
        props:{
            tenant,
            product
        }
    }
    console.log('TENANT ->', tenantSlug)
}
