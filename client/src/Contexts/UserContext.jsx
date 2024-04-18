import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const userContext = createContext();

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);

  useEffect(() => {
    console.log("useEffect");
    axios
      .get("/auth", { withCredentials: true })
      .then(({ data }) => {
        setUser(data);
        setReady(true);
      })
      .catch((error) => {
        setReady(true);
        console.log(error.message);
      });
  }, []);

  return (
    <userContext.Provider
      value={{ user, setUser, ready, lat, lon, setLat, setLon }}
    >
      {children}
    </userContext.Provider>
  );
}
