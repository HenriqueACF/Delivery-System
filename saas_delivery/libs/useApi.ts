import { Product } from "../types/Product";
import { Tenant } from "../types/Tenant"

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
                mainColor: '#fb952a',
                secondColor: '#fb952a'
            }
            break;
            case 'PizzaLanches':
            return{
                slug: 'PizzaLanches',
                name:  'PizzaLanches',
                mainColor: '#0000ff',
                secondColor: '#0000ff'
            }
            break;

            default: return false;
        }     
    },

    getAllProducts: async() => {
        let products = []
        for (let q = 0; q < 100; q++){
            products.push(TemporaryProduct)
        }
        return products
    },

    getProduct: async(id: string) => {
        return TemporaryProduct
    }
})