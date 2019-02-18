import axios from 'axios';
import * as tok from '../utils/token'

const headers = token => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`,
});

export const getUsers = async (token = tok.get()) => {
  try {
    const res = await axios.get('/api/users', { headers: headers(token) });
    return res.data.data;
  } catch (err) {
    return null;
  }
};

export const getShifts = async (token = tok.get()) => {
  try {
    const res = await axios.get('/api/shifts', { headers: headers(token) });
    return res.data.data;
  } catch (err) {
    return null;
  }
};

export const updateShift = async ({ token = tok.get(), shiftId, data }) => {
  try {
    const res = await axios.patch(`/api/shifts/${shiftId}`, data, {
      headers: headers(token),
    });
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export const createShift = async ({ token = tok.get(), data }) => {
  try {
    const res = await axios.post(`/api/shifts`, data, {
      headers: headers(token),
    });
    return res.data;
  } catch (err) {
    return err.response.data;
  }
}

export const empUpdateShift = async ({ token = tok.get(), shiftId, data }) => {
  try {
    const res = await axios.patch(`/api/shifts/${shiftId}/employee`, data, {
      headers: headers(token),
    });
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};
