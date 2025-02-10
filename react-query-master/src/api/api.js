import axios from 'axios';

const api = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getPosts = ()  => {
   return api.get('/posts');  
}


export const fetchPosts = async () => {
    try {
      const response = await api.get('/posts');
      if (response.status === 200) {
        // console.log(response.data);
        return response.data;  
      } else {
        console.log('Error fetching data');
      } 
    } catch (error) {
      console.error(error);
    }   
}