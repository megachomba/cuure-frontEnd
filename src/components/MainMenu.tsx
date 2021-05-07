import { AppBar, Tab, Tabs } from "@material-ui/core";
import React from "react";

import ConsultationMenu from "./ConsultationsMenu";
import PatientMenu from "./PatientMenu";
interface ITabPanelProps {
  children: JSX.Element;
  value: number;
  index: number;
}
const TabPanel = (props: ITabPanelProps) => {
  const { children, value, index } = props;

  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && children}
    </div>
  );
};

const MainMenu = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  return (
    <div>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Patients" />
          <Tab label="Consultations" />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <PatientMenu />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ConsultationMenu />
      </TabPanel>
    </div>
  );
};

export default MainMenu;
