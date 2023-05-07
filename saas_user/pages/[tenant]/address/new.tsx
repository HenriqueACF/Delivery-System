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
import {InputField} from "../../../components/InputField";
import {string} from "prop-types";
import {width} from "dom7";

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
    //STATES
    const [addressCep, setAddressCep] = useState<string>('')
    const [addressStreet, setAddressStreet] = useState<string>('')
    const [addressNumber, setAddressNumber] = useState<string>('')
    const [addressNeighborhood, setAddressNeighborhood] = useState<string>('')
    const [addressCity, setAddressCity] = useState<string>('')
    const [addressState, setAddressState] = useState<string>('')
    const [addressComplement, setAddressComplement] = useState<string>('')
    const [errorFields, setErrorFields] = useState<string[]>([])

    //VALIDATIONS
    const verifyAddress = () => {
        let newErrorFields = []
        let approved = true

        if(addressCep.replaceAll(/[^0-9]/g, '').length !== 8){
            newErrorFields.push('cep')
            approved = false
        }

        if(addressStreet.length <=2){
            newErrorFields.push('street')
            approved = false
        }

        // if (addressNumber.length < 1 ){
        //
        // }

        if(addressNeighborhood.length <=2){
            newErrorFields.push('neigh')
            approved = false
        }

        if(addressCity.length <=2){
            newErrorFields.push('city')
            approved = false
        }

        if(addressState.length !== 2){
            newErrorFields.push('state')
            approved = false
        }

        setErrorFields(newErrorFields)
        return approved
    }

    const handleNewAddress = async () => {
        if(verifyAddress()){
            let address: Address = {
                id: 0,
                cep: addressCep,
                street: addressStreet,
                number: addressNumber,
                neighborhood: addressNeighborhood,
                city: addressCity,
                state: addressState,
                complement: addressComplement
            }

            let newAddress = await api.addUserAddress(address)
            if(newAddress.id > 0){
                router.push(`/${data.tenant.slug}/myaddress`)
                alert('Endereço adicionado com sucesso!')
            } else{
                alert('ocorreu um erro! tente mais tarde')
            }
        }
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Novo Endereço | {data.tenant.name} </title>
            </Head>

            <Header
                backHref={`/${data.tenant.slug}/myaddress`}
                color={data.tenant.mainColor}
                title="Novo Endereço"
            />

            <div className={styles.inputs}>

                <div className={styles.row}>
                    <div className={styles.column}>
                        <div className={styles.label}>CEP</div>
                        <InputField
                            color={data.tenant.mainColor}
                            placeholder="Digite o CEP"
                            value={addressCep}
                            onChange={value => setAddressCep(value)}
                            warning={errorFields.includes('cep')}
                        />
                    </div>
                </div>

                <div className={styles.row}>
                    <div className={styles.column}>
                        <div className={styles.label}>Rua</div>
                        <InputField
                            color={data.tenant.mainColor}
                            placeholder="Digite o nome da Rua"
                            value={addressStreet}
                            onChange={value => setAddressStreet(value)}
                            warning={errorFields.includes('street')}
                        />
                    </div>
                    <div className={styles.column}>
                        <div className={styles.label}>Número</div>
                        <InputField
                            color={data.tenant.mainColor}
                            placeholder="Digite o Numero"
                            value={addressNumber}
                            onChange={value => setAddressNumber(value)}
                            // warning={errorFields.includes('cep')}
                        />
                    </div>
                </div>

                <div className={styles.row}>
                    <div className={styles.column}>
                        <div className={styles.label}>Bairro</div>
                        <InputField
                            color={data.tenant.mainColor}
                            placeholder="Digite o Bairro"
                            value={addressNeighborhood}
                            onChange={value => setAddressNeighborhood(value)}
                            warning={errorFields.includes('neigh')}
                        />
                    </div>
                </div>

                <div className={styles.row}>
                    <div className={styles.column}>
                        <div className={styles.label}>Cidade</div>
                        <InputField
                            color={data.tenant.mainColor}
                            placeholder="Digite a Cidade"
                            value={addressCity}
                            onChange={value => setAddressCity(value)}
                            warning={errorFields.includes('city')}
                        />
                    </div>
                </div>

                <div className={styles.row}>
                    <div className={styles.column}>
                        <div className={styles.label}>Estado</div>
                        <InputField
                            color={data.tenant.mainColor}
                            placeholder="Digite o Estado"
                            value={addressState}
                            onChange={value => setAddressState(value)}
                            warning={errorFields.includes('state')}
                        />
                    </div>
                </div>

                <div className={styles.row}>
                    <div className={styles.column}>
                        <div className={styles.label}>Complemento</div>
                        <InputField
                            color={data.tenant.mainColor}
                            placeholder="Digite o Complemento"
                            value={addressComplement}
                            onChange={value => setAddressComplement(value)}/>
                    </div>
                </div>

            </div>

            <div className={styles.btnArea}>
                <Button
                    color={data.tenant.mainColor}
                    label="Adicionar"
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
