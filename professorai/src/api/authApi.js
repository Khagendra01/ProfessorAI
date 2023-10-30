import instance from "./instance";

function register(registerInfo) {
  return instance
    .post("/api/auth/register", registerInfo)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
    });
}

function login(loginInfo) {
    return instance
      .post("/api/auth/login", loginInfo)
      .then((response) => {

        return response;
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  function refreshLogin()
  {
    return instance
    .get("/api/auth/refresh-login" )
    .then((response) => {

      return response;
    })
    .catch((error) => {
      throw new Error(error);
    });
  }

  export {register, refreshLogin, login}
