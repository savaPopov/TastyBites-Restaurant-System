import { api } from "./requester";

const BASE_URL = 'http://localhost:8080/api/menu'


export async function getAllMenuItems() {
    const result = await api.get(BASE_URL)


    const menu_items = Object.values(result)

    return menu_items

}

export async function getMenuItemById(menuItemId) {
    const result = await api.get(`${BASE_URL}/${menuItemId}`)
    result

    return result

}

export function create(menuData) {
    return api.post(BASE_URL, menuData)
}

export function update(id, menuData) {
    return api.put(`${BASE_URL}/${id}`, menuData);
}
