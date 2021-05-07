import { Button, MenuItem, Select, TextField } from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { useContext, useEffect, useState } from "react";
import { IPatient } from "../types/intefaces";
import DateFnsUtils from "@date-io/date-fns";
import axios from "axios";
import { UserContext } from "../App";
import { API_ADDRESS } from "../types/constants";

interface IPatientModalContent {
  onClose: () => void;
  handleCpt: () => void;
}

const ConsultationsModalContent = (props: IPatientModalContent) => {
  const [titre, setTitre] = useState("");
  const [patients, setPatients] = useState<IPatient[]>([]);
  const [patientId, setPatientId] = useState<number>(
    patients.length > 0 ? patients[0].id : 0
  );
  const [commentaire, setCommentaire] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const user = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(API_ADDRESS + "/patient/" + user.id);
      setPatients(result.data);
    };

    fetchData();
  }, [user]);
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const handleClick = async () => {
    await axios.post(API_ADDRESS + "/consultation", {
      title: titre,
      commentaire,
      patientId,
      date: selectedDate,
      userId: user.id,
    });
    props.handleCpt();
    props.onClose();
  };
  const handlePatientClick = (e: any) => {
    setPatientId(e.target.value);
  };
  if (patients) {
    return (
      <div
        style={{
          backgroundColor: "white",
          padding: "10px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h3>{"Nouvelle consultation"}</h3>
        <TextField
          style={{ marginBottom: "10px" }}
          label="titre"
          value={titre}
          onChange={(e) => setTitre(e.target.value)}
        />
        <Select
          value={patientId}
          label="Patient"
          onChange={(e) => handlePatientClick(e)}
        >
          {patients.map((item) => {
            return (
              <MenuItem key={item.id} value={item.id}>
                {item.nom}
              </MenuItem>
            );
          })}
        </Select>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="Choisiez une date"
            value={selectedDate}
            onChange={handleDateChange}
            autoOk={true}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
        </MuiPickersUtilsProvider>

        <TextField
          style={{ marginBottom: "10px" }}
          label="commentaire"
          value={commentaire}
          onChange={(e) => setCommentaire(e.target.value)}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: "10px", marginRight: "10px" }}
            onClick={() => handleClick()}
          >
            {"Ajouter"}
          </Button>
          <Button
            variant="contained"
            color="secondary"
            style={{ marginTop: "10px" }}
            onClick={() => props.onClose()}
          >
            {"Fermer"}
          </Button>
        </div>
      </div>
    );
  } else {
    return <div>{"loading patients..."}</div>;
  }
};

export default ConsultationsModalContent;
