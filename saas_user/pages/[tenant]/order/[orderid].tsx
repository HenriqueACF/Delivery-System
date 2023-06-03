import { useEffect, useState } from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { UseApi } from "../../../libs/useApi";
import { Tenant } from "../../../types/Tenant";
import { useAppContext } from "../../../contexts/app";
import styles from '../../../styles/Order-id.module.css'
import { getCookie } from "cookies-next";
import { User } from "../../../types/User";
import { useAuthContext } from "../../../contexts/auth";
import { Header } from "../../../components/Header";
import { InputField } from "../../../components/InputField";
import { Button } from "../../../components/Button";
import { useFormatter } from "../../../libs/useFormatter";
import { CartItem } from "../../../types/CartItem";
import { useRouter } from "next/router";
import { CartProductItem } from "../../../components/CartProductItem/Index";
import {ButtonWithIcon} from "../../../components/ButtonWithIcon";
import {Order} from "../../../types/Order";

const OrderId = (data: Props) =>{

    const {setToken, setUser} = useAuthContext()
    const {tenant, setTenant} = useAppContext()
    const formater = useFormatter()
    const router = useRouter()

    useEffect(()=>{
        setTenant(data.tenant)
        setToken(data.token)
        if(data.user) setUser(data.user)
    }, [])


    return (
        <div className={styles.container}>
            <Head>
                <title>Pedido #${data.order.id} | {data.tenant.name} </title>
            </Head>

            <Header
                backHref={`/${data.tenant.slug}`}
                color={data.tenant.mainColor}
                title={`Pedido #${data.order.id}`}
            />


            <div className={styles.infoGroup}>

                <div className={styles.infoArea}>
                    <div className={styles.infoTitle}>
                        Endereço
                    </div>
                    <div className={styles.infoBody}>
                        <ButtonWithIcon
                            color={data.tenant.mainColor}
                            leftIcon={"location"}
                            rightIcon={"rightArrow"}
                            value={`${data.order.shippingAddress.street} - ${data.order.shippingAddress.number} - ${data.order.shippingAddress.neighborhood} 
                            - ${data.order.shippingAddress.city} - ${data.order.shippingAddress.cep}`
                                }
                            onClick={()=>{}}
                        />
                    </div>
                </div>

                <div className={styles.infoArea}>
                    <div className={styles.infoTitle}>
                        Forma de Pagamento
                    </div>
                    <div className={styles.infoBody}>
                        <div className={styles.paymentType}>
                            <div className={styles.paymentBtn}>
                                <ButtonWithIcon
                                    color={data.tenant.mainColor}
                                    leftIcon="money"
                                    value="Dinheiro"
                                    onClick={()=>{}}
                                    fill={data.order.paymentType === 'money'}/>
                            </div>

                            <div className={styles.paymentBtn}>
                                <ButtonWithIcon
                                    color={data.tenant.mainColor}
                                    leftIcon="card"
                                    value="Cartão"
                                    onClick={()=>{}}
                                    fill={data.order.paymentType === 'card'}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {data.order.paymentType === 'money' &&
                    <div className={styles.infoArea}>
                        <div className={styles.infoTitle}>
                            Troco
                        </div>
                        <div className={styles.infoBody}>
                            <InputField
                                color={data.tenant.mainColor}
                                placeholder="Informe o valor para sabermos o troco"
                                value={data.order.paymentChange?.toString() ?? ''}
                                onChange={() => {}}/>
                        </div>
                    </div>
                }
                {data.order.cupom &&
                    <div className={styles.infoArea}>
                        <div className={styles.infoTitle}>
                            Cupom de Desconto
                        </div>
                        <div className={styles.infoBody}>
                            <ButtonWithIcon
                                color={data.tenant.mainColor}
                                value={data.order.cupom.toUpperCase()}
                                leftIcon="cupom"
                                rightIcon="checked"
                            />
                        </div>
                    </div>
                }

            </div>

            <div className={styles.productquantity}>
                {data.order.products.length} {data.order.products.length === 1 ? 'Item' : 'Itens'}
            </div>

            <div className={styles.productList}>
                {data.order.products.map((cartItem, index)=>(
                    <CartProductItem
                        key={index}
                        color={data.tenant.mainColor}
                        quantity={cartItem.qt}
                        product={cartItem.product}
                        onChange={()=>{} }
                        noEdit
                    />
                ))}
            </div>

            <div className={styles.resumeArea}>
                <div className={styles.resumeItem}>
                    <div className={styles.resumeLeft}>Subtotal</div>
                    <div className={styles.resumeRight}>{formater.formatPrice(data.order.subtotal)}</div>
                </div>
                {data.order.cupomDiscount &&
                    <div className={styles.resumeItem}>
                        <div className={styles.resumeLeft}>Desconto</div>
                        <div className={styles.resumeRight}>-{formater.formatPrice(data.order.cupomDiscount)}</div>
                    </div>
                }

                <div className={styles.resumeItem}>
                    <div className={styles.resumeLeft}>Frete</div>
                    <div className={styles.resumeRight}>{data.order.shippingPrice > 0 ? formater.formatPrice(data.order.shippingPrice) : '--'}</div>
                </div>

                <div className={styles.resumeLine}></div>

                <div className={styles.resumeItem}>
                    <div className={styles.resumeLeft}>Total</div>
                    <div
                        className={styles.resumeRightBig}
                        style={{color:data.tenant.mainColor}}
                    >{formater.formatPrice(data.order.total)}</div>
                </div>
            </div>
        </div>
    )
}

export default OrderId

type Props = {
    tenant: Tenant,
    token: string,
    user: User | null,
    order: Order
}

export const getServerSideProps: GetServerSideProps = async (context)=>{
    const {tenant: tenantSlug, orderid} = context.query
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

    //get order
    const order = await api.getOrder(parseInt(orderid as string))

    return {
        props:{
            tenant,
            user,
            token,
            order
        }
    }
}
