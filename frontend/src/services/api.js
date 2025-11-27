import axios from "axios";

const API_BASE = "http://localhost:8000/api";

export const api = axios.create({
  baseURL: API_BASE,
});

// Media CRUD
export const getMediaItems = () => api.get("/media/");
export const createMediaItem = (data) => api.post("/media/", data);
export const deleteMediaItem = (id) => api.delete(`/media/${id}/`);
export const updateMediaItem = (id, data) => api.put(`/media/${id}/`, data);

// YouTube helper
export const fetchYoutubeMeta = (url) =>
  api.post("/fetch-youtube-metadata/", { url });
