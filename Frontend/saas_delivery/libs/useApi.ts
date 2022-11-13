import { Tenant } from "../types/Tenant"

export const UseApi = () =>({
    getTenant: (tenantSlug:  string): boolean | Tenant => {
        switch(tenantSlug){
            case 'BurgerLanches':
            return{
                slug: 'BurgerLanches',
                name:  'Burgerlanches',
                mainColor: '#ff0000',
                secondColor: '#00ff00'
            }
            break;
            case 'PizzaLanches':
            return{
                slug: 'PizzaLanches',
                name:  'PizzaLanches',
                mainColor: '#00ff00',
                secondColor: '#0000ff'
            }
            break;

            default: return false;
        }     
    }
})