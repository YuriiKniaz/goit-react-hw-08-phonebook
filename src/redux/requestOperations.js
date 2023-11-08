import axios from "axios";

const requestInstance = axios.create({
    baseURL: 'https://connections-api.herokuapp.com',
    
})

export const setToken = (token) => {
    requestInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
}

// =============== AUTHORIZATION =============== //

export const signUpRequest = async (authData) => {
    const response = (await requestInstance.post('/users/signup', authData)).data;
    setToken(response.token)
    return response;
}
export const logInRequest = async (authData) => {
    const response = (await requestInstance.post('/users/login', authData)).data;
    setToken(response.token)
    return response;
}
export const logOutRequest = async () => {
    const response = (await requestInstance.post('/users/logout')).data;
    return response;
}
export const requestRefreshUser = async () => {
    const response = (await requestInstance.get('/users/current')).data;
    console.log(response);
    return response;
}
export const usersData = async () => {
    const response = (await requestInstance.get('/users/current')).data;
    return response;
}

// =============== CONTACTS =============== //

export const fetchContacts = async () => {
    const response = (await requestInstance.get('/contacts')).data;
    
    return response;
}
export const addContacts = async (contacts) => {
    const response = (await requestInstance.post('/contacts', contacts)).data;
    
    return response;
}
export const deleteContact = async (id) => {
    const response = (await requestInstance.delete(`/contacts/${id}`)).data;
    
    return response;
}
// export const updateContact = async (id) => {
//     const response = (await requestInstance.patch(`/contacts/${id}`)).data;
    
//     return response;
// }
