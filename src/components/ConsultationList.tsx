import { useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Modal from "react-modal";

import { IConsultation } from "../types/intefaces";
import { modalStyle } from "../types/constants";
import ConsultationDetail from "./ConsultationDetail";

interface IConsultationListProps {
  consultations: IConsultation[];
}
const ConsultationList = (props: IConsultationListProps) => {
  const [selectedConsultationId, setSelectedConsultationId] = useState<
    number | undefined
  >(undefined);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const handleClick = (id: number) => {
    setSelectedConsultationId(id);
    setModalIsOpen(true);
  };

  const handleClose = () => {
    setModalIsOpen(false);
  };
  return (
    <Paper>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="left">
                <p style={{ fontWeight: "bold" }}>{"Titre"}</p>
              </TableCell>
              <TableCell align="left">
                <p style={{ fontWeight: "bold" }}>{"Date"}</p>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.consultations.map((consultation) => (
              <TableRow
                style={{ cursor: "pointer" }}
                key={consultation.id}
                onClick={() => handleClick(consultation.id)}
              >
                <TableCell align="left">{consultation.title}</TableCell>
                <TableCell align="left">
                  {new Date(consultation.date).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {selectedConsultationId && (
        <Modal ariaHideApp={false} isOpen={modalIsOpen} style={modalStyle}>
          <ConsultationDetail
            id={selectedConsultationId}
            onClose={handleClose}
          />
        </Modal>
      )}
    </Paper>
  );
};

export default ConsultationList;
