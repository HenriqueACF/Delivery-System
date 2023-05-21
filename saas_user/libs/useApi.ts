import { CartCookie } from './../types/CartCookie';
import { Product } from "../types/Product";
import { Tenant } from "../types/Tenant"
import { User } from "../types/User";
import { CartItem } from '../types/CartItem';
import {Address} from "../types/Address";
import {returnStatement} from "@babel/types";

const TemporaryProduct: Product = {
    id:3,
    image:'/temp/burger.png',
    categoryName:'Tradicional',
    name:'Texas Burger',
    price: 25.50,
    description: '2 Blends de carne de 150g, Queijo Cheddar, Bacon Caramelizado, Salada, Molho da casa e Pão brioche artesanal.'
}

export const UseApi = (tenantSlug: string) =>({

    getTenant: async() => {
        switch(tenantSlug){
            case 'BurgerLanches':
            return{
                slug: 'BurgerLanches',
                name:  'Burgerlanches',
                mainColor: '#fb9400',
                secondColor: '#fb9400'
            }
            break;
            case 'PizzaLanches':
            return{
                slug: 'PizzaLanches',
                name:  'PizzaLanches',
                mainColor: '#6ab70a',
                secondColor: '#6ab70a'
            }
            break;

            default: return false;
        }     
    },

    getAllProducts: async() => {
        let products = []
        for (let q = 0; q < 100; q++){
            products.push({
                ...TemporaryProduct,
                id: q + 1
            })
        }
        return products
    },

    getProduct: async(id: number) => {
        return {
            ...TemporaryProduct,
            id
        }
    },

    authorizeToken: async (token: string): Promise<User | false> => {
        if(!token) return false
        
        return {
            name: 'Henrique',
            email: 'dev_henrique.assis@proton.me'
        }
    },

    getCartProducts: async (cartCookie: string) => {
        let cart: CartItem[] = []

        if(!cartCookie) return cart

        const cartJson = JSON.parse(cartCookie)
        for(let i in cartJson){
            if(cartJson[i].id && cartJson[i].qt){
                const product = {
                    ...TemporaryProduct,
                    id: cartJson[i].id
                }
                cart.push({
                    qt: cartJson[i].qt,
                    product
                })
            }
        }

        return cart
    },

    getUserAddresses: async (email: string) => {
        const addresses: Address[] = []

        for(let i = 0; i < 4; i++){
            addresses.push({
                id: i + 1,
                street: 'Rua lalala',
                number: `${i + 1}00`,
                cep: '9999999',
                city: 'cidade teste',
                neighborhood: 'Bairro Testando',
                state: 'PA',
                complement: "ali na esquina"
            })
        }

        return addresses
    },

    getShippingPrice: async (address: Address) => {
        return 9.16
    },

    addUserAddress: async  (address: Address) => {
        console.log(address)
        return {...address, id:9 }
    },

    editUserAddress: async (newAddressData: Address) => {
        return true
    },

    deleteUserAddress: async (addressid: number) =>{
        return true
    },

    getUserAddress: async (addressid: number) => {
        let address: Address = {
            id: addressid,
            street: 'Rua lalala',
            number: `${addressid}00`,
            cep: '9999999',
            city: 'cidade teste',
            neighborhood: 'Bairro Testando',
            state: 'PA',
            complement: "ali na esquina"
        }
        return address
    }
})