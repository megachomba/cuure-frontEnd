import { Button } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import { IConsultation } from "../types/intefaces";
import ConsultationList from "./ConsultationList";
import ConsultationsModalContent from "./ConsultationsModalContent";
import Modal from "react-modal";
import { API_ADDRESS, modalStyle } from "../types/constants";
import axios from "axios";

const ConsultationsMenu = () => {
  const [consultations, setConsultations] = useState<IConsultation[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [cpt, setCpt] = useState(0);
  const user = useContext(UserContext);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(API_ADDRESS + "/consultation/" + user.id);
      setConsultations(result.data);
    };

    fetchData();
  }, [cpt, user]);
  const handleClick = () => {
    setModalIsOpen(true);
  };
  const handleClose = () => {
    setModalIsOpen(false);
  };
  const handleCpt = () => {
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
        {"Ajouter Consultation"}
      </Button>
      {consultations && <ConsultationList consultations={consultations} />}
      <Modal ariaHideApp={false} isOpen={modalIsOpen} style={modalStyle}>
        {
          <ConsultationsModalContent
            onClose={handleClose}
            handleCpt={handleCpt}
          />
        }
      </Modal>
    </div>
  );
};

export default ConsultationsMenu;
