const baseUrl = 'http://localhost:3000/api/v1'

const takeAwayApi = {
    getAllOrders: async (restaurant_code) => {
        const response = await fetch(`${baseUrl}/restaurants/${restaurant_code}/orders`)
        return await response.json()
    },
    getOrdersByStatus: async (restaurant_code, status) => {
        const URL = `${baseUrl}/restaurants/${restaurant_code}/orders?status=${status}`
        const response = await fetch(URL)
        return await response.json()
    },
    getOrderDetails: async (restaurant_code, order_code) => {
        const URL = `${baseUrl}/restaurants/${restaurant_code}/orders/${order_code}`
        const response = await fetch(URL)
        return await response.json()
    },
    updateOrderStatus: async (restaurant_code, order_code) => {
        const URL = `${baseUrl}/restaurants/${restaurant_code}/orders/${order_code}`
        const response = await fetch(URL, {
            method: 'PATCH'
        })
        return await response.json()
    }
}

export default takeAwayApi
