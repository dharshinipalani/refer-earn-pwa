import { Box } from "@mui/material";
import Header from "./Header";
import ContactPicker from "./ContactPicker";

function App() {
 
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Header />
      <img
        src="/images/banner.png"
        alt="refer a friend"
        width="100%"
        height="30%"
      />
      <ContactPicker/>
    </Box>
  );
}

export default App;
