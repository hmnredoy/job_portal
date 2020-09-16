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
        console.log('get from local '+key)
        const itemStr = localStorage.getItem(key)
        if (!itemStr) {
            return null
        }
        const item = JSON.parse(itemStr)
        const now = new Date()

        if (now.getTime() > item.expiry) {
            localStorage.removeItem(key)
            return null
        }
        return item.value
    },
    async checkAuth(config) {
        let redirectPath = config.redirectPath ?? '/'
        let logout = config.logout ?? true
        let preventRedirect = config.preventRedirect ?? false
        let returnVal = false

        let token = this.getFromLocal('token')
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
        axios.post('/logout').then(() => {
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
