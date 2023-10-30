import React, { createContext, useEffect, useState } from "react";
import RouteConfig from "./components/Routes";
import { refreshLogin } from "./api/authApi";

export const AuthContext = createContext();

function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      getData(); // Set dataFetched to true after the initial data fetch
    }
  }, []); // Add dataFetched to the dependency array

  const getData = async () => {
    await refreshLogin()
      .then((res) => {
        setUser(res);
        localStorage.setItem("accessToken", res.accessToken);
      })
      .catch((error) => {
        setUser();
        localStorage.removeItem("accessToken");
      });
  };
  return (
    <>
      <AuthContext.Provider value={{ user, setUser }}>
        <RouteConfig />
      </AuthContext.Provider>
    </>
  );
}

export default App;
