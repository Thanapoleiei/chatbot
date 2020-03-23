export const login = (data) => {
    return { type: "T", payload: data }
}

export const logout = () => {
    return { type: "L" }
}