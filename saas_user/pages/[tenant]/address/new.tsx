import { useEffect, useState } from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { getCookie } from "cookies-next";
import styles from '../../../styles/NewAddress.module.css'
import { useRouter } from "next/router";
import {useAuthContext} from "../../../contexts/auth";
import {useAppContext} from "../../../contexts/app";
import {useFormatter} from "../../../libs/useFormatter";
import {UseApi} from "../../../libs/useApi";
import {Tenant} from "../../../types/Tenant";
import {User} from "../../../types/User";
import {Button} from "../../../components/Button";
import {Header} from "../../../components/Header";
import {Address} from "../../../types/Address";

const NewAddress = (data: Props) =>{

    const {setToken, setUser} = useAuthContext()
    const {tenant, setTenant, setShippingAddress, setShippingPrice} = useAppContext()

    useEffect(() =>{
        setTenant(data.tenant)
        setToken(data.token)
        if(data.user) setUser(data.user)
    }, [])

    const formater = useFormatter()
    const router = useRouter()
    const api = UseApi(data.tenant.slug)

    const handleNewAddress = () => {
        router.push(`/${data.tenant.slug}/address/new`)
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Novo Endereço | {data.tenant.name} </title>
            </Head>

            <Header
                backHref={`/${data.tenant.slug}/checkout`}
                color={data.tenant.mainColor}
                title="Novo Endereço"
            />

            <div className={styles.btnArea}>
                <Button
                    color={data.tenant.mainColor}
                    label="Novo Endereço"
                    onClick={handleNewAddress}
                    fill
                />
            </div>

        </div>
    )
}

export default NewAddress

type Props = {
    tenant: Tenant,
    token: string,
    user: User | null,
    addresses: Address[]
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

    if(!user){
        return {
            redirect:{
                destination: '/login',
                permanent: false
            }
        }
    }

    //get address from logged user
    const addresses = await api.getUserAddresses(user.email)


    return {
        props:{
            tenant,
            user,
            token,
            addresses
        }
    }
}
