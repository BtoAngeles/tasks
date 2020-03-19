import axios from 'axios';

const url = "https://tasks-service.herokuapp.com/tasks/";

export const get = async (path) => {
    return axios.get(url + path);
}

export const post = async (path, body) => {
    return axios.post(url + path, body);
}

export const deleteTask = async (path) => {
    return axios.delete(url + path);
}

export const patch = async (path, body) => {
    return axios.patch(url + path, body);
}