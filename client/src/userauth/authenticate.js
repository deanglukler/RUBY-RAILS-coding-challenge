import axios from 'axios';
export default async ({ email, password }) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  try {
    const res = await axios.post(
      '/api/authenticate',
      {
        email,
        password,
      },
      { headers }
    );
    return res.data.auth_token;
  } catch {
    return null;
  }
};
