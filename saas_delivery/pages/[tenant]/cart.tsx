import { useEffect, useState } from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { UseApi } from "../../libs/useApi";
import { Tenant } from "../../types/Tenant";
import { useAppContext } from "../../contexts/app";
import styles from '../../styles/Cart.module.css'
import { Product } from "../../types/Product";
import { getCookie } from "cookies-next";
import { User } from "../../types/User";
import { useAuthContext } from "../../contexts/auth";
import { Header } from "../../components/Header";
import { InputField } from "../../components/InputField";
import { Button } from "../../components/Button";
import { useFormatter } from "../../libs/useFormatter";

const Cart = (data: Props) =>{

    const {setToken, setUser} = useAuthContext()
    const {tenant, setTenant} = useAppContext()
    const formater = useFormatter()

    const [shippingInput, setShippingInput] = useState('')
    const [shippingPrice, setShippingPrice] = useState(0)

    useEffect(()=>{
        setTenant(data.tenant)
        setToken(data.token)
        if(data.user) setUser(data.user)
    }, [])

    const handleShippingCalc = () => {

    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Sacola | {data.tenant.name} </title>
            </Head>

            <Header
                backHref={`/${data.tenant.slug}`}
                color={data.tenant.mainColor}
                title="Sacola"
            />

            <div className={styles.productquantity}>
                X itens
            </div>

            <div className={styles.productList}>

            </div>

            <div className={styles.shippingArea}>
                <div className={styles.shippingTitle}>Calcular frete e prazo</div>

                <div className={styles.shippingFrom}>
                    <InputField
                        color={data.tenant.mainColor}
                        placeholder="Digite seu CEP"
                        value={shippingInput}
                        onChange={newValue => setShippingInput(newValue)}
                        />

                        <Button
                            color={data.tenant.mainColor}
                            label="OK"
                            onClick={handleShippingCalc}
                        />
                </div>

                <div className={styles.shippingInfo}>
                    <div className={styles.shippingAddress}></div>
                    <div className={styles.shippingTime}>
                        <div className={styles.shippingTimeText}>Receba</div>
                        <div
                            style={{color: data.tenant.mainColor}} 
                            className={styles.shippingPrice}
                        >
                            {formater.formatPrice(shippingPrice)}
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.resumeArea}>
                
            </div>
        </div>
    )
}

export default Cart

type Props = {
    tenant: Tenant,
    products: Product[],
    token: string,
    user: User | null
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

    // get logged user
    const token = getCookie('token', context) ?? null
    const user = await api.authorizeToken(token as string)

    //get products
    const products = await api.getAllProducts()
    
    return {
        props:{
            tenant,
            products,
            user,
            token
        }
    }
}
