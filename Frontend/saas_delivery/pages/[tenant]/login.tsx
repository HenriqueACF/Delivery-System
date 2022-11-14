import styles from '../../styles/Login.module.css'
import { UseApi } from "../../libs/useApi";
import { GetServerSideProps } from "next";
import { Tenant } from "../../types/Tenant";
import { useAppContext } from "../../contexts/AppContext";
import { useEffect, useState } from "react";
import Head from "next/head";
import { Header } from '../../components/Header';
import { InputField } from '../../components/InputField';

const Login = (data: Props) =>{

    const {tenant, setTenant} = useAppContext()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(()=>{
        setTenant(data.tenant)
    }, [])

    return (
        <div className={styles.container}>
            <Head>
                <title>Login | {data.tenant.name}</title>
            </Head>

            <Header color={data.tenant.mainColor} backHref={`/${data.tenant.slug}`}/>
            
            <InputField
                color={data.tenant.mainColor}
                placeholder="Digite seu e-mail"
                value={email}
                onChange={setEmail}
            />

            <InputField
                color={data.tenant.mainColor}
                placeholder="Digite sua senha"
                value={password}
                onChange={setPassword}
                password
            />
        </div>
    )
}

export default Login

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
