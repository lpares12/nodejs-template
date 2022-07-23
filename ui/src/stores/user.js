import { defineStore } from 'pinia'
import axios from "axios";

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    user: null,
  }),
  getters: {
    isLogged(){
      return (this.user !== null) && (localStorage.getItem('token'));
    },
    getUser: (state) => state.user,
  },
  actions: {
    async login(username, password){
      return new Promise((resolve, reject) => {
        axios({ method: "POST",
          "url": "http://localhost:5656/user/login",
          data: {user: username, pass: password},
          headers: { "content-type": "application/json" },
          //Do not send the credentials when logging in
          withCredentials: false,
        }).then(result => {
          this.user = result.data.user;
          localStorage.setItem('token', result.data.token);
          resolve(this.user);
        }).catch(error => {
          reject(error);
        });
      })
    },

    async register(user, email, password){
      return new Promise((resolve, reject) => {
        axios({ method: "POST",
          "url": "http://localhost:5656/user/register",
          data: {user: user, email: email, pass: password},
          headers: { "content-type": "application/json" },
          withCredentials: false,
        }).then(result => {
          this.user = result.data.user;
          localStorage.setItem('token', result.data.token);
          resolve(this.user);
        }).catch(error => {
          reject(error);
        });
      })
    },

    async logout(){
      return new Promise((resolve, reject) => {
        axios({ method: "POST",
          "url": "http://localhost:5656/user/logout",
          headers: {'auth': localStorage.getItem('token')},
        }).then(result => {
          this.user = null;
          localStorage.removeItem('token');
          resolve(result);
        }).catch(error => {
          //Let's force the user out anyways
          this.user = null;
          localStorage.removeItem('token');
          reject(error);
        });
      })
    },

    async retrieveUser(token){
      return new Promise((resolve, reject) => {
        axios({ method: "GET",
          "url": "http://localhost:5656/user/profile",
          headers: {'auth': token},
        }).then(result => {
          this.user = result.data;
          resolve(this.user);
        }).catch(error => {
          this.user = null;
          reject(error);
        });
      })
    },
  },
})
