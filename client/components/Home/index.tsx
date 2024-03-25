import { Typography } from "@mui/material";
import { styles } from "./styles";

export const Home: React.FC = () => {
  const { title, description } = styles;
  return (
    <>
      <Typography variant="h2" sx={title}>
        Welcome to the recipe finder.
      </Typography>
      <Typography variant="h5" sx={description}>
        Search for your favorite recipes here.
      </Typography>
    </>
  );
};
