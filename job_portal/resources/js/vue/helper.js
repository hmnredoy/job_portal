import store from "./store";
import router from './router';

let helper = {
    setToLocal(key, value, ttl = 1800000) { // 30 Minutes
        console.log('in setToLocal')

        const now = new Date()
        const item = {
            value: value,
            expiry: now.getTime() + ttl,
        }
        localStorage.setItem(key, JSON.stringify(item))
    },
    getFromLocal(key) {
        console.log('in getFromLocal')

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
    async checkAuth(config) {
        console.log('in checkauth')
        let redirectPath = config.redirectPath ?? '/'
        let logout = config.logout ?? true
        let preventRedirect = config.preventRedirect ?? false
        let returnVal = false

        let token = localStorage.getItem('token')
        if (token) {
            await axios.get('/verify')
                .then((res) => {
                    if (res.data.verified !== true) {
                        logout ? helper.logout(redirectPath) : ''
                    }
                    returnVal = res.data.verified;
                })
                .catch((e) => {
                    logout ? helper.logout(redirectPath) : ''
                })
        } else {
            !preventRedirect ? router.push({path: redirectPath}) : ''
        }
        return returnVal
    },
    logout(redirectPath = '/'){
        console.log('in logout')

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
