export const api = {

    login: async (email: string, password: string): Promise<{error: string, token?: string}> => {
        return new Promise(resolve => {
            setTimeout(()=>{
                if(email !== 'henrique@teste.com'){
                    resolve({
                        error: 'E-mail ou Senha invalidos'
                    })
                } else {
                    resolve({
                        error: '',
                        token: '123'
                    })
                }
            }, 1000)
        })
    },
    forgotPassword: async (email: string)=> {
        return new Promise(resolve =>{
            setTimeout(()=>{
                resolve({error: ''})
            }, 1000)
        })
    }
}
