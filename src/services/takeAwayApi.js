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
    },
    getRestaurantName: async (restaurant_code) => {
        const URL = `${baseUrl}/restaurants/${restaurant_code}`
        const response = await fetch(URL)
        return await response.json()
    },
    cancelOrder: async (restaurant_code, order_code, reason) => {
        const URL = `${baseUrl}/restaurants/${restaurant_code}/orders/${order_code}/cancel`
        const response = await fetch(URL, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ cancel_reason: reason })
        })

        if (response.ok) {
            return await response.json()
        }
        const data = await response.json()
        alert(data.error + ': ' + data.message)
    }
}

export default takeAwayApi
