import { useEffect, useState } from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";
import {SearchInput} from "../../components/SearchInput";
import { UseApi } from "../../libs/useApi";
import { Tenant } from "../../types/Tenant";
import { useAppContext } from "../../contexts/app";
import styles from '../../styles/Home.module.css'
import {Banner} from "../../components/Banner";
import {ProductItem} from "../../components/ProductItem";
import { Product } from "../../types/Product";
import { Sidebar } from "../../components/SideBar";
import { getCookie } from "cookies-next";
import { User } from "../../types/User";
import { useAuthContext } from "../../contexts/auth";
import NoProductsIcon from '../../public/assets/noProducts.svg'

const Home = (data: Props) =>{

    const {setToken, setUser} = useAuthContext()
    const {tenant, setTenant} = useAppContext()

    const [products, setProducts] = useState<Product[]>(data.products)
    const [sidebarOpen, setSidebarOpen] = useState(false)

    useEffect(()=>{
        setTenant(data.tenant)
        setToken(data.token)
        if(data.user) setUser(data.user)
    }, [])

    //SEARCH
    const [searchText, setSearchText] = useState('')
    const [filterProducts, setFilterProducts] = useState<Product[]>([])

    const handleSearch = (value: string) =>{
        setSearchText(value)
    }

    useEffect(()=>{
        let newFilteredProducts: Product[] = []

        for(let product of data.products){
            if(product.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1){
                newFilteredProducts.push(product)
            }
        }
        setFilterProducts(newFilteredProducts)
    }, [searchText])
    // -------------------------------

    return (
        <div className={styles.container}>
            <Head>
                <title>Cardapio |{data.tenant.name}</title>
            </Head>
            <header className={styles.header}>
                <div className={styles.headerTop}>
                    <div className={styles.headerTopLeft}>
                        <div className={styles.headerTitle}>
                            Seja Bem Vindo 👋
                        </div>
                        <div className={styles.headerSubTitle}>
                            O que deseja para hoje?
                        </div>
                    </div>
                    <div className={styles.headerTopRight}>
                        <div 
                            className={styles.menuButton}
                            onClick={()=> setSidebarOpen(true)}
                            >
                            <div className={styles.menuButtonLine} style={{backgroundColor: tenant?.mainColor}}></div>
                            <div className={styles.menuButtonLine} style={{backgroundColor: tenant?.mainColor}}></div>
                            <div className={styles.menuButtonLine} style={{backgroundColor: tenant?.mainColor}}></div>
                        </div>
                        <Sidebar
                            tenant={data.tenant}
                            open={sidebarOpen}
                            onClose={()=> setSidebarOpen(false)}
                        />
                    </div>
                </div>
                <div className={styles.headerBottom}>
                    <SearchInput
                        onSearch={handleSearch}
                    />
                </div>
            </header>

            {searchText &&
                <>
                    <div className={styles.searchText}>
                        Procurando por: <strong style={{color: data.tenant.mainColor}}>{searchText}</strong>
                    </div>

                    {filterProducts.length > 0 &&
                        <div className={styles.grid}>
                            {filterProducts.map((item, index) => (
                                <ProductItem key={index} data={item}/>
                            ))}
                        </div>
                    }

                    {filterProducts.length === 0 &&
                        <div className={styles.noProducts}>
                            <NoProductsIcon color={data.tenant.mainColor}/>
                            <div className={styles.noProductsText}>
                                <p style={{color: data.tenant.mainColor}}>
                                    Ops! Não há items com esse nome.
                                </p>
                            </div>
                        </div>
                    }
                </>
            }


            {!searchText &&
                <>
                    <Banner/>

                    <div className={styles.grid}>
                    {products.map((item, index) => (
                        <ProductItem key={index} data={item}/>
                    ))}
                    </div>
                </>
            }
        </div>
    )
}

export default Home

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
