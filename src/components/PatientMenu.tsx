import { Button } from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import { IPatient } from "../types/intefaces";
import PatientList from "./PatientList";
import PatientModalContent from "./PatientModalContent";
import Modal from "react-modal";
import { API_ADDRESS, modalStyle } from "../types/constants";
import axios from "axios";

const PatientMenu = () => {
  const [patients, setPatients] = useState<IPatient[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [cpt, setCpt] = useState(0);
  const user = useContext(UserContext);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(API_ADDRESS + "/patient/" + user.id);
      setPatients(result.data);
    };

    fetchData();
  }, [cpt, user]);

  const handleClick = async () => {
    setModalIsOpen(true);
  };
  const handleClose = () => {
    setModalIsOpen(false);
  };
  const setCptCallBack = () => {
    setCpt(cpt + 1);
  };
  return (
    <div>
      <Button
        color="primary"
        variant="contained"
        style={{ float: "right", margin: "10px" }}
        onClick={() => handleClick()}
      >
        {"Ajouter Patient"}
      </Button>
      <PatientList patients={patients} />
      <Modal ariaHideApp={false} isOpen={modalIsOpen} style={modalStyle}>
        <PatientModalContent
          setCptCallBack={setCptCallBack}
          onClose={handleClose}
        />
      </Modal>
    </div>
  );
};

export default PatientMenu;
