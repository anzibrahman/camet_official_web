import axios from 'axios'

let baseUrl;

const ENV = import.meta.env.VITE_ENV;

// console.log(ENV);
if (ENV === "development") {
  baseUrl = "http://localhost:7000/";
} else if (ENV === "production") {
  baseUrl = "https://www.test.camet.in";
} 

console.log(Base URL: ${baseUrl});


const api = axios.create({
  baseURL: baseUrl
});

export default api