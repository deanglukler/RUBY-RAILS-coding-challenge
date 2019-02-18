import axios from 'axios';

export default async token => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  try {
    const res = await axios.get('/api/me', { headers });
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};
