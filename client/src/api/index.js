import axios from 'axios';

const headers = token => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`,
});

export const getUsers = async (token = 'missing token') => {
  try {
    const res = await axios.get('/api/users', { headers: headers(token) });
    return res.data.data
  } catch (err) {
    return null
  }
};

export const getShifts = async (token = 'missing') => {
  try {
    const res = await axios.get('/api/shifts', { headers: headers(token) })
    return res.data.data
  } catch (err) {
    return null
  }
}
