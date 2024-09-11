"use strict";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Recipe } from "../../utils/types";
import { styles } from "./styles";
import { getToken, saveRecipe } from "@/utils/api";

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
  // Change backend url to localhost for development
  const backendUrl = process.env.BACKEND_URL || "http://localhost:4000";

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

  // added the saving logic to the button
  const handleSaveRecipe = async (index: number) => {
    const loggedInToken = getToken();
    if (!loggedInToken) {
      alert("You must be logged in to save a recipe");
      return;
    }
    const recipeData = searchedRecipies[index];
    if (!recipeData) {
      alert("No recipe found");
      return;
    }
    try {
      const response = await saveRecipe(recipeData, loggedInToken);
      if (!response.ok) {
        throw new Error("Failed to save recipe");
      }
      alert("Recipe saved successfully");
    } catch (error) {
      console.error("Error saving recipe:", error);
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
          label="Type your recipe here"
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
            <Button
              sx={button}
              onClick={() => {
                const token = localStorage.getItem("token");
                handleSaveRecipe(index);
              }}
            >
              Save Recipe
            </Button>
          </Box>
        ))}
      </Box>
    </>
  );
};
