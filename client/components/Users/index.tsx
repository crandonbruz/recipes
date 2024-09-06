"use client";
import { Box, Button, Typography } from "@mui/material";
import { styles } from "./styles";
import { useEffect, useState } from "react";
import { getToken, getUser } from "@/utils/api";
import Link from "next/link";

export const UsersComp = () => {
  const [username, setUsername] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = getToken();
        if (token === undefined) {
          throw new Error("You need to be logged in");
        }
        const userRecipes = await getUser(token);
        setUsername(userRecipes.username);
        setRecipes(userRecipes.recipes);
      } catch (error) {
        setError((error as Error).message);
      }
    };
    fetchUserData();
  }, []);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }
  if (error) {
    return <Typography>{error}</Typography>;
  }

  const { root } = styles;
  return (
    <Box sx={root}>
      <Typography variant="h4">Welcome, {username}</Typography>
      <Typography variant="h6">Your recipes:</Typography>
      {recipes.map((recipe: any, index) => (
        <Box key={index}>
          <Typography key={recipe._id}>Recipe name: {recipe.title}</Typography>
          <Typography key={recipe._id}>
            Ingredients: {recipe.ingredients}
          </Typography>
          <Typography key={recipe._id}>
            Instructions: {recipe.instructions}
          </Typography>
          <Typography key={recipe._id}>Servings: {recipe.servings}</Typography>
          <Button variant="contained" color="primary">
            Delete Recipe
          </Button>
          <Button variant="contained" color="primary">
            <Link href="/" passHref>
              Continue your recipe search
            </Link>
          </Button>
        </Box>
      ))}
    </Box>
  );
};
