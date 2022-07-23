import { useUserStore } from '@/stores/user'

export default async function auth(to, from, next){
  const userStore = useUserStore();

  if(!localStorage.getItem('token')){
    return next({name: "index"});
  }

  if(userStore.isLogged){
    return next();
  }

  await userStore.retrieveUser(localStorage.getItem('token')).then(() => {
    return next();
  }).catch(() => {
    //TODO: Do not remove the token if it was a network error!
    localStorage.removeItem('token');
    return next({name: "index"});
  });
}
