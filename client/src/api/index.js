import FetchService from "../service/FetchService";

const api = new FetchService('/api', {headers: {'Content-Type': 'application/json'}, credentials: "include"});

export default api;
