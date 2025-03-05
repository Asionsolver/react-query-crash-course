import axios from 'axios';

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getPosts = () => {
  return api.get('/posts?_start=0&_limit=10');
}

export const deletePost = (id) => {
  return api.delete(`/posts/${id}`);
}




export const fetchPosts = async () => {
  try {
    const response = await api.get('/posts?_start=0&_limit=10');
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

export const fetchUsers = async () => {
  try {
    const response = await api.get('/users');
    if (response.status === 200) {
      return response.data;
    } else {
      console.log('Error fetching data');
    }
  } catch (error) {
    console.error(error);
  }
};

export const fetchUserDetails = async (id) => {
  try {
    const response = await api.get(`/users/${id}`);
    if (response.status === 200) {
      return response.data;
    } else {
      console.log('Error fetching data');
    }
  } catch (error) {
    console.error(error);
  }
}

export const fetchComments = async (page) => {
  try {
    const response = await api.get(`/comments?_page=${page}&_limit=5`);
    if (response.status === 200) {
      return response.data;
    } else {
      console.log('Error fetching data');
    }
  } catch (error) {
    console.error(error);
  }
}

export const updateComment = async (id) => {
  try {
    const response = await api.patch(`/comments/${id}`, { name: "updated" });
    if (response.status === 200) {
      return response.data;
    } else {
      console.log('Error fetching data');
    }
  } catch (error) {
    console.error(error);
  }
}



const storeApi = axios.create({
  baseURL: 'https://fakestoreapi.com',
  headers: {
    'Content-Type': 'application/json',
  },
});


export const fetchProducts = async () => {
  try {
    const response = await storeApi.get('/products');
    if (response.status === 200) {
      return response.data;
    } else {
      console.log('Error fetching data');
    }
  } catch (error) {
    console.error(error);
  }
}

export const fetchProductDetails = async (id) => {
  try {
    const response = await storeApi.get(`/products/${id}`);
    if (response.status === 200) {
      return response.data;
    } else {
      console.log('Error fetching data');
    }
  } catch (error) {
    console.error(error);
  }
}

