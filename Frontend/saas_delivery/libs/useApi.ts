export type getTenantResponse = {
    name: string
    mainColor: string
    secondColor: string
}

export const UseApi = () =>({
    getTenant: (tenantSlug:  string): boolean | getTenantResponse => {
        switch(tenantSlug){
            case 'BurgerLanches':
            return{
                name:  'Burgerlanches',
                mainColor: '#ff0000',
                secondColor: '#00ff00'
            }
            break;
            case 'PizzaLanches':
            return{
                name:  'PizzaLanches',
                mainColor: '#00ff00',
                secondColor: '#0000ff'
            }
            break;

            default: return false;
        }     
    }
})