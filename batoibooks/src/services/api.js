import axios from "axios";
const SERVER_URL = import.meta.env.VITE_SERVER_URL;


const apiClient = axios.create({
    baseURL: SERVER_URL,
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
});
const extractData = async (promise) => {
    const response = await promise;
    return response.data;
};

const libros = {
    getAll: () => extractData(apiClient.get(`/books`)),
    getOne: (id) => extractData(apiClient.get(`/books/${id}`)),
    create: (item) => extractData(apiClient.post(`/books`, item)),
    modify: (item) => extractData(apiClient.put(`/books/${item.id}`, item)),
    delete: (id) => extractData(apiClient.delete(`/books/${id}`)),
}

const usuarios = {
    getAll: () => extractData(apiClient.get(`/users`)),
    getOne: (id) => extractData(apiClient.get(`/users/${id}`)),
    create: (item) => extractData(apiClient.post(`/users`, item)),
    modify: (item) => extractData(apiClient.put(`/users/${item.id}`, item)),
    delete: (id) => extractData(apiClient.delete(`/users/${id}`)),
}

const ventas = {
    getAll: () => extractData(apiClient.get(`/sales`)),
    getOne: (id) => extractData(apiClient.get(`/sales/${id}`)),
    create: (item) => extractData(apiClient.post(`/sales`, item)),
    modify: (item) => extractData(apiClient.put(`/sales/${item.id}`, item)),
    delete: (id) => extractData(apiClient.delete(`/sales/${id}`)),
}

const modulos = {
    getAll: () => extractData(apiClient.get(`/modules`)),
    getOne: (id) => extractData(apiClient.get(`/modules/${id}`)),
    create: (item) => extractData(apiClient.post(`/modules`, item)),
    modify: (item) => extractData(apiClient.put(`/modules/${item.id}`, item)),
    delete: (id) => extractData(apiClient.delete(`/modules/${id}`)),
}

const familias = {
    getAll: () => extractData(apiClient.get(`/families`)),
    getOne: (id) => extractData(apiClient.get(`/families/${id}`)),
    create: (item) => extractData(apiClient.post(`/families`, item)),
    modify: (item) => extractData(apiClient.put(`/families/${item.id}`, item)),
    delete: (id) => extractData(apiClient.delete(`/families/${id}`)),
}
const cursos = {
    getAll: () => extractData(apiClient.get(`/courses`)),
    getOne: (id) => extractData(apiClient.get(`/courses/${id}`)),
    create: (item) => extractData(apiClient.post(`/courses`, item)),
    modify: (item) => extractData(apiClient.put(`/courses/${item.id}`, item)),
    delete: (id) => extractData(apiClient.delete(`/courses/${id}`)),
}

export default {
    libros,
    usuarios,
    ventas,
    modulos,
    familias,
    cursos
};
