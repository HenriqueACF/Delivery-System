import { useEffect, useState } from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { UseApi } from "../../libs/useApi";
import { Tenant } from "../../types/Tenant";
import { useAppContext } from "../../contexts/app";
import styles from '../../styles/Cart.module.css'
import { getCookie } from "cookies-next";
import { User } from "../../types/User";
import { useAuthContext } from "../../contexts/auth";
import { Header } from "../../components/Header";
import { InputField } from "../../components/InputField";
import { Button } from "../../components/Button";
import { useFormatter } from "../../libs/useFormatter";
import { CartItem } from "../../types/CartItem";
import { useRouter } from "next/router";

const Cart = (data: Props) =>{

    const {setToken, setUser} = useAuthContext()
    const {tenant, setTenant} = useAppContext()
    const formater = useFormatter()
    const router = useRouter()

    // product control
    const [cart, setCart] = useState<CartItem[]>(data.cart)

    //shipping
    const [shippingInput, setShippingInput] = useState('')
    const [shippingAddress, setShippingAddress] = useState('')
    const [shippingPrice, setShippingPrice] = useState(0)
    const [shippingTime, setShippingTime] = useState(0)

    const handleShippingCalc = () => {
        setShippingAddress('Rua Blá Blá Blá')
        setShippingPrice(9.5)
        setShippingTime(45)
    }

    //resume
    const [subTotal, setSubTotal] = useState(5)

    useEffect(()=>{
        let sub = 0
        for(let i in cart){
            sub += cart[i].product.price * cart[i].qt
        }
        setSubTotal(sub)
    }, [cart])
    
    const handleFinish = () => {
        router.push(`/${data.tenant.slug}/checkout`)
    }

    useEffect(()=>{
        setTenant(data.tenant)
        setToken(data.token)
        if(data.user) setUser(data.user)
    })

    // useEffect(()=>{
    //     setTenant(data.tenant)
    //     setToken(data.token)
    //     if(data.user) setUser(data.user)
    // }, [])

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
                {cart.length} {cart.length === 1 ? 'Item' : 'Itens'}
            </div>

            <div className={styles.productList}>

            </div>

            <div className={styles.shippingArea}>
                <div className={styles.shippingTitle}>Calcular frete e prazo</div>

                <div className={styles.shippingForm}>
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

                {shippingTime > 0 &&
                    <div className={styles.shippingInfo}>
                    <div className={styles.shippingAddress}>{shippingAddress}</div>
                    <div className={styles.shippingTime}>
                        <div className={styles.shippingTimeText}>Receba em até {shippingTime} minutos</div>
                        <div
                            style={{color: data.tenant.mainColor}} 
                            className={styles.shippingPrice}
                        >
                            {formater.formatPrice(shippingPrice)}
                        </div>
                    </div>
                </div>}
            </div>

            <div className={styles.resumeArea}>
                <div className={styles.resumeItem}>
                    <div className={styles.resumeLeft}>Subtotal</div>
                    <div className={styles.resumeRight}>{formater.formatPrice(subTotal)}</div>
                </div>

                <div className={styles.resumeItem}>
                    <div className={styles.resumeLeft}>Frete</div>
                    <div className={styles.resumeRight}>{shippingPrice > 0 ? formater.formatPrice(shippingPrice) : '--'}</div>
                </div>

                <div className={styles.resumeLine}></div>

                <div className={styles.resumeItem}>
                    <div className={styles.resumeLeft}>Total</div>
                    <div 
                        className={styles.resumeRightBig}
                        style={{color:data.tenant.mainColor}}
                        >{shippingPrice > 0 ? formater.formatPrice(shippingPrice + subTotal) : '--'}</div>
                </div>

                <div className={styles.resumeBtn}>
                    <Button
                        color={data.tenant.mainColor}
                        label="Continuar"
                        onClick={handleFinish}
                        fill
                    />
                </div>
            </div>
        </div>
    )
}

export default Cart

type Props = {
    tenant: Tenant,
    token: string,
    user: User | null,
    cart: CartItem[]
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

    // get cart product
    const cartCookie = getCookie('cart', context)
    const cart = await api.getCartProducts(cartCookie as string)
    
    return {
        props:{
            tenant,
            user,
            token,
            cart
        }
    }
}
