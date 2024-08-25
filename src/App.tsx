import { Box, Button, Typography } from "@mui/material";
import Header from "./Header";

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
      <Button variant="contained" color="secondary" size="large">
        <Typography color="primary">refer</Typography>
      </Button>
    </Box>
  );
}

export default App;
