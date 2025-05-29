// src/services/okrService.js
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/okrs";

export const getAllOKRs = (token) =>
  axios.get(BASE_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getOKRById = (id, token) =>
  axios.get(`${BASE_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const updateOKR = (id, data, token) =>
  axios.put(`${BASE_URL}/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteOKR = (id, token) =>
  axios.delete(`${BASE_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
