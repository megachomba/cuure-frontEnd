import { Button, TextField } from "@material-ui/core";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import { API_ADDRESS } from "../types/constants";
import { IConsultationDetail, INote } from "../types/intefaces";
interface IPropsConsultationDetail {
  id: number;
  onClose: () => void;
}

const ConsultationDetail = (props: IPropsConsultationDetail) => {
  const user = useContext(UserContext);
  const [details, setDetails] = useState<IConsultationDetail>();
  const [notes, setNotes] = useState<INote[]>([]);
  const [currentNote, setCurrentNote] = useState("");
  const [cpt, setCpt] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        API_ADDRESS + "/consultation/" + user.id + "/details/" + props.id
      );
      setDetails(result.data);
    };

    fetchData();
  }, [user.id, props.id]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(API_ADDRESS + "/note/" + props.id);
      setNotes(result.data);
    };

    fetchData();
  }, [user.id, props.id, cpt]);

  const sendNote = async () => {
    const noteData = {
      consultationId: props.id,
      content: currentNote,
      userId: user.id,
    };
    await axios.post(API_ADDRESS + "/note", noteData);
    setCpt(cpt + 1);
  };
  if (details) {
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div
            style={{ display: "flex", flexDirection: "column", width: "50%" }}
          >
            <h2>{"Consultation"}</h2>
            <h3>{details.details.title}</h3>
            <p>{`Date : ${new Date(
              details.details.date
            ).toLocaleDateString()}`}</p>
            <p>{`Commentaires: ${details.details.commentaire}`}</p>
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", width: "50%" }}
          >
            <h2>{"Patient"}</h2>
            <p> {`Nom: ${details.patient.nom}`}</p>
            <p> {`Prenom: ${details.patient.prenom}`}</p>
            <p> {`Age: ${details.patient.age}`}</p>
            <p> {`Sexe: ${details.patient.sexe}`}</p>
            <p> {`Adresse: ${details.patient.adresse}`}</p>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <TextField
            style={{ marginBottom: "10px" }}
            label="Ajouter Note"
            value={currentNote}
            onChange={(e) => setCurrentNote(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={{ marginTop: "10px", marginLeft: "10px" }}
            onClick={() => sendNote()}
          >
            {"Ajouter note"}
          </Button>
        </div>

        {notes && (
          <div
            style={{ display: "flex", flexDirection: "column", width: "100%" }}
          >
            <h2>{"Notes"}</h2>
            {notes.map((note) => {
              return (
                <p
                  key={note.id}
                  style={{
                    width: "100%",
                    border: "solid 1px",
                    marginBlockStart: "3px",
                    marginBlockEnd: "3px",
                  }}
                >
                  {note.content}
                </p>
              );
            })}
          </div>
        )}
        <Button
          variant="contained"
          color="secondary"
          style={{ marginTop: "10px" }}
          onClick={() => props.onClose()}
        >
          {"Fermer"}
        </Button>
      </div>
    );
  } else {
    return <>{"Loading consultation details..."}</>;
  }
};

export default ConsultationDetail;
