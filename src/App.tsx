import { Paper } from "@material-ui/core";
import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import Home from "./components/Home";
import UserPanel from "./components/UserPanel";
import { API_ADDRESS } from "./types/constants";
import { IUser } from "./types/intefaces";

export const UserContext = createContext({} as IUser);
function App() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [currentUser, setCurrentUser] = useState<IUser>();
  const [cpt, setCpt] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(API_ADDRESS + "/user");
      setUsers(result.data);
    };

    fetchData();
  }, [cpt]);

  useEffect(() => {
    setCurrentUser(users[0]);
  }, [users]);
  const handleSetCpt = () => {
    setCpt(cpt + 1);
  };
  if (currentUser) {
    return (
      <UserContext.Provider value={currentUser}>
        <Paper>
          <UserPanel
            users={users}
            value={users[0]}
            setCurrentUser={setCurrentUser}
            handleSetCpt={handleSetCpt}
          ></UserPanel>
          <Home />
        </Paper>
      </UserContext.Provider>
    );
  } else {
    return (
      <div>
        {" "}
        {`loading users.... ( if first app lauch, please add manually the first user via curl --location --request POST 'localhost:3000/user' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "nom": "first user"
    }' ) `}
      </div>
    );
  }
}

export default App;
