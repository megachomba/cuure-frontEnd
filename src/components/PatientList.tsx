import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import { IPatient } from "../types/intefaces";

interface IPatientListProps {
  patients: IPatient[];
}
const PatientList = (props: IPatientListProps) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="left">
              <p style={{ fontWeight: "bold" }}>{"Nom"}</p>
            </TableCell>
            <TableCell align="left">
              <p style={{ fontWeight: "bold" }}>{"Prenom"}</p>
            </TableCell>
            <TableCell align="left">
              <p style={{ fontWeight: "bold" }}>{"Age"}</p>
            </TableCell>
            <TableCell align="left">
              <p style={{ fontWeight: "bold" }}>{"Sexe"}</p>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.patients.map((patient) => (
            <TableRow key={patient.id}>
              <TableCell align="left">{patient.nom}</TableCell>
              <TableCell align="left">{patient.prenom}</TableCell>
              <TableCell align="left">{patient.age}</TableCell>
              <TableCell align="left">{patient.sexe}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PatientList;
