import { selector } from "recoil"





const userEmail = selector({
    key: 'useEmail',
    get: ({ get }) => {
        const user = get(userState)
        return user.email
    }
})

const userRole = selector({
    key: "userRole",
    get: ({ get }) => {
        const user = get(userState)
        return user.role
    }
})

const userId = selector({
    key: "userId",
    get: ({ get }) => {
        const user = get(userState)
        return user.id
    }
})