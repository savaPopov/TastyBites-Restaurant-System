import { api } from "./requester";

const BASE_URL = 'http://localhost:8080/api/admin/users'


export async function getUsers(page = 0, size = 10, search = '') {
    const params = new URLSearchParams();
    params.append('page', page)
    params.append('size', size)
    if (search) {
        params.append('search', search)
    }
    const result = await api.get(`${BASE_URL}?${params.toString()}`)
    return result
}

export async function deleteUser(userId) {
    const result = await api.del(`${BASE_URL}/${userId}`)
}

export async function updateUserRole(userId, newRole) {
    const result = await api.put(`${BASE_URL}/${userId}/role`, { role: newRole })

    return result
}

