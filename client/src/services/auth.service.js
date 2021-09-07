export const TOKEN_KEY = "user";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const login = token => {
    localStorage.setItem(TOKEN_KEY, token);
};
export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
};

////////////////////////////////////////////

// import axios from "axios";
//
// const API_URL = "http://localhost:8080/api/auth/";
//
// const register = (username, email, password) => {
//     return axios.post(API_URL + "signup", {
//         username,
//         email,
//         password,
//     });
// };
//
// const login = (username, password) => {
//     return axios
//         .post(API_URL + "signin", {
//             username,
//             password,
//         })
//         .then((response) => {
//             if (response.data.accessToken) {
//                 localStorage.setItem("user", JSON.stringify(response.data));
//             }
//
//             return response.data;
//         });
// };
//
// const logout = () => {
//     localStorage.removeItem("user");
// };
//
// const getCurrentUser = () => {
//     return JSON.parse(localStorage.getItem("user"));
// };
//
// export default {
//     register,
//     login,
//     logout,
//     getCurrentUser,
// };