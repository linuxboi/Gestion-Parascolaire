import React, { useState } from 'react'
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import EventHistory from '../../components/EventHistory/EventHistory';
import UpcomingEvents from '../../components/upcomingEvents/UpcomingEvents';

const events = () => {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div
    style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100%", // Remplacer 100vh pour qu'il respecte le flux parent
      width: "100%",
      padding: "20px",
      paddingTop: "100px", // Ajouter cet espacement pour éviter que la navbar ne cache les onglets
      overflow: "auto", // Ajout d'un scroll si nécessaire
    }}>
      <Box sx={{ width: "100%", typography: "body1", maxWidth: "800px" }}>
        <TabContext value={value}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              display: "flex",
              justifyContent: "center",
              position: "sticky",
              top: 0,
              zIndex: 1,
              backgroundColor: "background.default", // Respecter le thème MUI
            }}
          >
            <TabList onChange={handleChange} aria-label="Clubs Tabs">
              <Tab label="HistoryEvents" value="1" />
              <Tab label="UpcomingEvents" value="2" />
            </TabList>
          </Box>

          <TabPanel value="1">
            <EventHistory  /> {/* Passer la recherche au composant */}
          </TabPanel>
          <TabPanel value="2">
            <UpcomingEvents /> {/* Passer la recherche au composant */}
          </TabPanel>
        </TabContext>
      </Box>
      
    </div>
  )
}

export default events
