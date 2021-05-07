import { Button, TextField } from "@material-ui/core";
import { useContext, useState } from "react";

import axios from "axios";
import { API_ADDRESS } from "../types/constants";
import { UserContext } from "../App";

interface IPropsPatientModalContent {
  onClose: () => void;
  setCptCallBack: () => void;
}

const PatientModalContent = (props: IPropsPatientModalContent) => {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [age, setAge] = useState("");
  const [sexe, setSexe] = useState("");
  const [adresse, setAdresse] = useState("");
  const [commentaire, setCommentaire] = useState("");
  const user = useContext(UserContext);

  const handleClick = async () => {
    await axios.post(API_ADDRESS + "/patient", {
      nom,
      prenom,
      age: parseInt(age),
      commentaire,
      sexe,
      adresse,
      userId: user.id,
    });
    props.setCptCallBack();
    props.onClose();
  };
  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "10px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h3>{"Nouveu patient"}</h3>
      <TextField
        style={{ marginBottom: "10px" }}
        label="nom"
        value={nom}
        onChange={(e) => setNom(e.target.value)}
      />
      <TextField
        style={{ marginBottom: "10px" }}
        label="prenom"
        value={prenom}
        onChange={(e) => setPrenom(e.target.value)}
      />
      <TextField
        style={{ marginBottom: "10px" }}
        label="age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <TextField
        style={{ marginBottom: "10px" }}
        label="sexe"
        value={sexe}
        onChange={(e) => setSexe(e.target.value)}
      />
      <TextField
        style={{ marginBottom: "10px" }}
        label="adresse"
        value={adresse}
        onChange={(e) => setAdresse(e.target.value)}
      />
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
};
export default PatientModalContent;
