import React, { createContext, useEffect, useState } from "react";
import RouteConfig from "./routes/Routes";
import { refreshLogin } from "./api/authApi";
import SubjectWrapper from "./wrapper/addSubject";

export const AuthContext = createContext();

function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const getData = async () => {
      await refreshLogin()
        .then((res) => {
          setUser(res);
        })
        .catch((error) => {
          setUser();
          localStorage.removeItem("accessToken");
        });
    };
    if (token) {
      getData(); // Set dataFetched to true after the initial data fetch
    }
  }, []); // Add dataFetched to the dependency array

  return (
    <>
      <AuthContext.Provider value={{ user, setUser }}>
        <SubjectWrapper>
          <RouteConfig />
        </SubjectWrapper>
      </AuthContext.Provider>
    </>
  );
}

export default App;
