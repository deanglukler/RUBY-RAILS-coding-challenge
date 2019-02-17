export const get = () => localStorage.getItem('tokenDT')

export const set = token => localStorage.setItem('tokenDT', token)

export const clear = () => localStorage.removeItem('tokenDT')