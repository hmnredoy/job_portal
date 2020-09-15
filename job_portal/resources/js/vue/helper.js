import store from "./store";
import router from './router';

let helper = {
    setToLocal(key, value, ttl = 1800000) { // 30 Minutes
        const now = new Date()
        const item = {
            value: value,
            expiry: now.getTime() + ttl,
        }
        localStorage.setItem(key, JSON.stringify(item))
    },
    getFromLocal(key) {
        const itemStr = localStorage.getItem(key)
        // if the item doesn't exist, return null
        if (!itemStr) {
            return null
        }
        const item = JSON.parse(itemStr)

        const now = new Date()
        // compare the expiry time of the item with the current time

        if (now.getTime() > item.expiry) {
            // If the item is expired, delete the item from storage
            // and return null
            localStorage.removeItem(key)
            return null
        }
        return item.value
    },
    checkAuth(config){
        let redirectPath = config.redirectPath ?? '/'
        let logout = config.logout ?? true
        let preventRedirect = config.preventRedirect ?? false

        let token = localStorage.getItem('token')
        if(token){
            axios.get('/verify')
            .then((res) => {
                if(res.data.verified !== true){
                    logout ? helper.logout(redirectPath) : ''
                }
                return res.data.verified;
            })
            .catch((e) => {
                logout ? helper.logout(redirectPath) : ''
                return false;
            })
        }else{
            !preventRedirect ? router.push({path: redirectPath}) : ''
            return false
        }
    },
    logout(redirectPath = '/'){
        axios.get('/logout').then(() => {
            store.commit("setLogin", false)
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            router.push({ path: redirectPath})
        }).catch((e) => {
            console.log(e)
            alert('Something went wrong!')
        })
    }
}

export {helper}
