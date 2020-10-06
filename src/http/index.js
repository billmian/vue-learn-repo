import axios from "axios";

//这里还可以进行缓存
let http = {};
let localhost = ""; //还没部署到服务器上，这里先不进行baseUrl封装
// axios.get('/user', {
//     params: {
//       ID: 12345
//     }
//   })
http.get = function(url, params) {
  return axios.get(url, params);
};
http.post = function(url, params) {
  return axios.post(url, params);
};

export default http;
