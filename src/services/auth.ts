import axios from 'axios';
import { api } from './api';

type SignInRequestData = {
  email: string;
  password: string;
};

export async function signInRequest(data: SignInRequestData): Promise<any> {
  return await axios.post('http://localhost:3001/auth/login', {
    email: data.email,
    password: data.password
  }).then(response => {
    return {
      token: response.data.access_token,
      user: response.data.user
    };
  }).catch(err => {
    console.log(err);
  });
  /* 
    return {
      token: uuid(),
      user: {
        name: 'Diego Fernandes',
        email: 'diego@rocketseat.com.br',
        avatar_url: 'https://github.com/diego3g.png'
      }
    } */
}

export async function recoverUserInformation(): Promise<any> {
  return await api.get('users/me').then(response => {
    return response.data;
  }).catch(err => {
    console.log(err);
  });
}