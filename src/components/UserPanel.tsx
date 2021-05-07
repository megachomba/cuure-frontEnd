import {
  Button,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { API_ADDRESS } from "../types/constants";
import { IUser } from "../types/intefaces";
interface InterfaceUserPanelProps {
  value: IUser;
  users: IUser[];
  setCurrentUser: (user: IUser) => void;
  handleSetCpt: () => void;
}
const useStyle = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    marginRight: "20px",
  },
});
export const UserPanelProps = (props: InterfaceUserPanelProps) => {
  const [localValue, setLocalValue] = useState(props.value.id);
  const [newUser, setNewUser] = useState("");
  useEffect(() => setLocalValue(props.value.id), [props.value.id]);
  const s = useStyle();
  const handleChange = (e: any) => {
    const value = e.target.value;
    setLocalValue(value);
    if (props.setCurrentUser) {
      const matchingUser = props.users.find((user: IUser) => user.id === value);
      matchingUser && props.setCurrentUser(matchingUser);
    }
  };
  const handleClick = async () => {
    const data = { nom: newUser };

    await axios.post(API_ADDRESS + "/user", data);
    props.handleSetCpt();
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        backgroundColor: "lightgrey",
      }}
    >
      <Paper style={{ display: "flex", marginLeft: "75px", padding: "10px" }}>
        <div className={s.root}>{"Veuillez Selectionner un utilisateur"}</div>
        <Select value={localValue} onChange={handleChange}>
          {props.users?.map((item) => {
            return (
              <MenuItem key={item.id} value={item.id}>
                {item.nom}
              </MenuItem>
            );
          })}
        </Select>
      </Paper>
      <Paper style={{ display: "flex", marginLeft: "75px", padding: "10px" }}>
        <div className={s.root}>{"Creer un utilisateur"}</div>
        <TextField
          style={{ marginBottom: "10px" }}
          label="utilisateur"
          value={newUser}
          onChange={(e) => setNewUser(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: "10px", marginRight: "10px" }}
          onClick={() => handleClick()}
        >
          {"Creer"}
        </Button>
      </Paper>
    </div>
  );
};

export default UserPanelProps;
