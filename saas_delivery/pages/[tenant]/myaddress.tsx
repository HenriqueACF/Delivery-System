import { useEffect, useState } from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { UseApi } from "../../libs/useApi";
import { Tenant } from "../../types/Tenant";
import { useAppContext } from "../../contexts/app";
import { getCookie } from "cookies-next";
import { User } from "../../types/User";
import styles from '../../styles/MyAddress.module.css'
import { useAuthContext } from "../../contexts/auth";
import { Header } from "../../components/Header";
import { useFormatter } from "../../libs/useFormatter";
import { useRouter } from "next/router";
import {Button} from "../../components/Button";
import {Address} from "../../types/Address";

const MyAddress = (data: Props) =>{

    const {setToken, setUser} = useAuthContext()
    const {tenant, setTenant} = useAppContext()

    useEffect(() =>{
        setTenant(data.tenant)
        setToken(data.token)
        if(data.user) setUser(data.user)
    }, [])

    const formater = useFormatter()
    const router = useRouter()

    const handleNewAddress = () => {
        router.push(`/${data.tenant.slug}/newaddress`)
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Meus Endereços | {data.tenant.name} </title>
            </Head>

            <Header
                backHref={`/${data.tenant.slug}/checkout`}
                color={data.tenant.mainColor}
                title="Meus Endereços"
            />

            <div className={styles.list}>
                {data.addresses.map((item, index)=>(
                    <div key={index}>{item.street} - {item.number}</div>
                ))}
            </div>

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

export default MyAddress

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
