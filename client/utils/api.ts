export const getMe = (token: any) => {
  return fetch("http://localhost:4000/api/me", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
};

export const createUser = (userData: any) => {
  return fetch("http://localhost:4000/api/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
};

export const loginUser = (userData: any) => {
  return fetch("http://localhost:4000/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
};

export const saverecipe = (recipeData: any, token: any) => {
  return fetch("http://localhost:4000/api/recipe", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(recipeData),
  });
};

export const deleterecipe = (recipeId: any, token: any) => {
  return fetch(`http://localhost:4000/api/recipe/${recipeId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
};
