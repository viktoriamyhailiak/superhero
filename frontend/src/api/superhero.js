import axios from "axios";

const API_URL = "http://localhost:3001/superheroes";

export const fetchSuperheroes = (page = 1, limit = 5) =>
  axios.get(`${API_URL}?page=${page}&limit=${limit}`).then((res) => res.data);

export const fetchSuperheroById = (id) =>
  axios.get(`${API_URL}/${id}`).then((res) => res.data);

export const createSuperhero = (data) =>
  axios.post(API_URL, data).then((res) => res.data);

export const updateSuperhero = (id, data) =>
  axios.put(`${API_URL}/${id}`, data).then((res) => res.data);

export const deleteSuperhero = (id) =>
  axios.delete(`${API_URL}/${id}`).then((res) => res.data);

export const uploadImages = (id, files) => {
  const formData = new FormData();
  files.forEach((file) => formData.append("images", file));
  return axios
    .post(`${API_URL}/${id}/images`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => res.data);
};

export const deleteImage = (heroId, imageId) =>
  axios.delete(`${API_URL}/${heroId}/images/${imageId}`).then((res) => res.data);
