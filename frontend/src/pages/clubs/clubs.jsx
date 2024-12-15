import React, { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import MyClubs from "../../components/MyClubs";
import OtherClubs from "../../components/OtherClubs";
import TextField from "@mui/material/TextField"; // Import du champ de texte pour la recherche

const ClubsPage = () => {
  const [value, setValue] = React.useState("1");
  const [searchQuery, setSearchQuery] = useState(""); // Ajout de l'état pour la recherche

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
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
      }}
    >
      

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
              <Tab label="Mes Clubs" value="1" />
              <Tab label="Autres Clubs" value="2" />
            </TabList>
          </Box>

          <TabPanel value="1">
            <MyClubs  /> {/* Passer la recherche au composant */}
          </TabPanel>
          <TabPanel value="2">
            <OtherClubs /> {/* Passer la recherche au composant */}
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
};

export default ClubsPage;