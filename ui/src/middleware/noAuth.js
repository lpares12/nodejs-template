import { useUserStore } from '@/stores/user'

export default async function noAuth(to, from, next){
  const userStore = useUserStore();

  if(!localStorage.getItem('token')){
    return next();
  }

  if(userStore.isLogged){
    //TODO: redirect to dashboard
    return next({name: "profile"});
  }

  await userStore.retrieveUser(localStorage.getItem('token')).then(() => {
    //TODO: redirect to dashboard
    return next({name: "profile"});
  }).catch(() => {
    localStorage.removeItem('token');
    return next();
  });
}
