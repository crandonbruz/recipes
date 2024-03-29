"use strict";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Recipe } from "../../utils/types";
import { styles } from "./styles";

export const FormComp = () => {
  const {
    root,
    map,
    ingredients,
    instructions,
    servings,
    title,
    button,
    data,
  } = styles;
  const [searchInput, setSearchInput] = useState("");
  const [searchedRecipies, setSearchedRecipies] = useState<Recipe[]>([]);
  const backendUrl =
    process.env.REACT_APP_BACKEND_URL || "https://recipies.vercel.app";

  const handleFormSubmit = async () => {
    if (!searchInput) {
      return false;
    }
    try {
      const response = await fetch(
        `${backendUrl}/api/recipes?query=${searchInput}`
      );
      console.log(response);

      if (!response.ok) {
        throw new Error("No data found");
      }
      const data = await response.json();
      console.log(data);
      if (!data) {
        throw new Error("Recipies not found in response");
      }
      setSearchedRecipies(data);
      setSearchInput("");
    } catch (error) {
      console.error(error);
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleFormSubmit();
    }
  };
  return (
    <>
      <Box sx={root}>
        <TextField
          sx={{ color: "#edede9" }}
          label="Type your recipie here"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button sx={button} onClick={handleFormSubmit}>
          Search
        </Button>
      </Box>

      <Box sx={map}>
        {searchedRecipies.map((recipie, index) => (
          <Box key={index} sx={data}>
            <Box>
              <Typography variant="h4" sx={title}>
                {recipie.title}
              </Typography>
            </Box>
            <Box>
              <Typography variant="h5">Ingredients: </Typography>
              <Typography sx={ingredients}>{recipie.ingredients}</Typography>
            </Box>
            <Box>
              <Typography variant="h5">Servings: </Typography>
              <Typography sx={servings}>{recipie.servings}</Typography>
            </Box>
            <Box>
              <Typography variant="h5">Instructions: </Typography>
              <Typography sx={instructions}>{recipie.instructions}</Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </>
  );
};
