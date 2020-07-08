import axios from 'axios';

function parseError (messages) {
    // error
    if (messages) {
        if (messages instanceof Array) {
          return Promise.reject({ messages: messages })
        } else {
          return Promise.reject({ messages: [messages] })
        }
    } else {
        return Promise.reject({ messages: ['エラーが発生しました'] })
    }
}

function parseBody (response) {
    if (response.status === 200 && !response.data.status_code === 0) {  
      console.log("response", response.data);  
        return response.data.body;
    } else {
        return parseError(response.data.error_msg)
    }
}

let instance = axios.create({
    baseURL: `http://18.163.241.236:5000/api/v1`
})

instance.interceptors.request.use((config) => {
  // Do something before request is sent

  // api tokenなどを利用してheaderに載せる場合
  const token = localStorage.getItem('token');
  console.log("token:: ", token);
  if(token){
    config.headers = { 'Authorization': 'Bearer ' + token }
  }
  return config
}, error => {
  return Promise.reject(error)
})

instance.interceptors.response.use((response) => {
  return parseBody(response)
}, error => {
  console.warn('Error status', error.response.status)
  // return Promise.reject(error)
  if (error.response) {
    return parseError(error.response.data)
  } else {
    return Promise.reject(error)
  }
})

export const request = instance