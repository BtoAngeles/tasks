import axios from 'axios';

const url = "https://tasks-service.herokuapp.com/tasks/";

export const get = async (path) => {
    return axios.get(url + path);
}

export const post = async (path, body) => {
    return axios.post(url + path, body);
}
