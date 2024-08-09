const backendUrl =
  process.env.REACT_APP_BACKEND_URL || "https://recipies.vercel.app";

export const getMe = (token: any) => {
  return fetch(`${backendUrl}/api/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
};

export const registerUser = (userData: any) => {
  return fetch(`${backendUrl}/api/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
};

export const loginUser = (userData: any) => {
  return fetch(`${backendUrl}/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
};

export const saverecipe = (recipeData: any, token: any) => {
  return fetch(`${backendUrl}/api/user/recipes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(recipeData),
  });
};

export const deleterecipe = (recipeId: any, token: any) => {
  return fetch(`${backendUrl}/api/recipe/${recipeId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
};
