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

  const {
    root,
    data,
    button,
    map,
    title,
    ingredients,
    instructions,
    servings,
  } = styles;
  return (
    <Box sx={root}>
      <Typography variant="h4">Welcome, {username}</Typography>
      <Typography variant="h6">Your recipes:</Typography>
      <Box sx={map}>
        {recipes.map((recipe: any, index) => (
          <Box key={index}>
            <Typography sx={title} key={recipe._id}>
              Recipe name: {recipe.title}
            </Typography>
            <Typography sx={ingredients} key={recipe._id}>
              Ingredients: {recipe.ingredients}
            </Typography>
            <Typography sx={instructions} key={recipe._id}>
              Instructions: {recipe.instructions}
            </Typography>
            <Typography sx={servings} key={recipe._id}>
              Servings: {recipe.servings}
            </Typography>
            <Button sx={button} variant="contained">
              Delete Recipe
            </Button>
            <Button sx={button} variant="contained">
              <Link href="/" passHref>
                Continue your recipe search
              </Link>
            </Button>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
