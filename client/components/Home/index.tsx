import { Box, Typography } from "@mui/material";
import { styles } from "./styles";

export const Home: React.FC = () => {
  const { title, description, root } = styles;
  return (
    <Box sx={root}>
      <Typography variant="h2" sx={title}>
        Welcome to the recipe finder.
      </Typography>
      <Typography variant="h5" sx={description}>
        Search for your favorite recipes here.
      </Typography>
    </Box>
  );
};
