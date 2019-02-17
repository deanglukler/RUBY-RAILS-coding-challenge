export const getUserById = (id, users) => users.find(usr => usr.id === id) || {};

export const getNameById = (...args) => getUserById(...args).name;