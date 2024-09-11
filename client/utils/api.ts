//remember to add the correct routes for the backend once done testing

const backendUrl =
  process.env.REACT_APP_BACKEND_URL || "https://recipies.vercel.app";

export const getUser = async (token: any) => {
  const response = await fetch(`${backendUrl}/api/user/recipes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error("Could not display the user data");
  }
  return data;
};

export const registerUser = (userData: any) => {
  return fetch(`${backendUrl}/api/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(userData),
  });
};

export const loginUser = async (userData: any) => {
  try {
    const response = await fetch(`${backendUrl}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      alert("Login failed");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const saveRecipe = (recipeData: any, token: any) => {
  console.log("recipeData", recipeData);
  // for testing purposes only
  // console.log("token", token);
  const getToken = localStorage.getItem("token");

  return fetch(`${backendUrl}/api/user/recipes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken}`,
    },
    body: JSON.stringify(recipeData),
  });
};

export const deleteRecipe = (recipeId: any, token: any) => {
  return fetch(`${backendUrl}/api/user/recipe/${recipeId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getToken = () => {
  return localStorage.getItem("token");
};
