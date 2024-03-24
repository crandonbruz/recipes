"use strict";
import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { Recipie } from "@/utils/tyoes";
import { styles } from "./styles";

export const FormComp = () => {
  const { root, map } = styles;
  const [searchInput, setSearchInput] = useState("");
  const [searchedRecipies, setSearchedRecipies] = useState<Recipie[]>([]);
  const backendUrl =
    process.env.REACT_APP_BACKEND_URL || "http://localhost:4000";

  const handleFormSubmit = async () => {
    if (!searchInput) {
      return false;
    }
    try {
      const response = await fetch(
        `${backendUrl}/api/recipies?query=${searchInput}`
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
  return (
    <>
      <Box sx={root}>
        <TextField
          label="Search For A Recipie"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <Button onClick={handleFormSubmit}>Search</Button>
      </Box>

      <Box sx={map}>
        {searchedRecipies.map((recipie, index) => (
          <Box key={index}>
            <h2>{recipie.title}</h2>
            <p>{recipie.ingredients}</p>
            <p>{recipie.servings}</p>
            <p>{recipie.instructions}</p>
          </Box>
        ))}
      </Box>
    </>
  );
};
