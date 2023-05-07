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
import {AddressItem} from "../../components/AddressItem/Index";

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

    const handleAddressSelect = (address: Address) =>{

    }

    const handleAddressEdit = (id: number) => {

    }

    const handleAddressDelete = (id: number) => {

    }

    //menu events
    const [menuOpened, setMenuOpened] = useState(0)
    const handleMenuEvent = (event: MouseEvent) => {
        const tagName = (event.target as Element).tagName
        console.log(tagName)
        if(!['path', 'svg'].includes(tagName)){
            setMenuOpened(0)
        }
    }

    useEffect(()=>{
        window.removeEventListener('click', handleMenuEvent)
        window.addEventListener('click', handleMenuEvent)
        return () => window.removeEventListener('click', handleMenuEvent)
    }, [menuOpened])

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
                    <AddressItem
                        key={index}
                        color={data.tenant.mainColor}
                        address={item}
                        onSelect={handleAddressSelect}
                        onEdit={handleAddressEdit}
                        onDelete={handleAddressDelete}
                        menuOpened={menuOpened}
                        setMenuOpened={setMenuOpened}
                    />
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
