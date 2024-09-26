import { Box, Button, TextField } from "@mui/material";
import { styles } from "./styles";
import { useEffect, useState } from "react";
import { loginUser } from "@/utils/api";
import { AuthService } from "@/utils/auth";
import React from "react";
import { LoginCompProps } from "@/utils/types";

export const LoginComp: React.FC<LoginCompProps> = ({ onLogin }) => {
  const { root, button } = styles;
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleFormSubmit = async () => {
    if (!formData.email || !formData.password) {
      return false;
    }
    try {
      const response = await loginUser({
        email: formData.email,
        password: formData.password,
      });

      if (!response.token) {
        throw new Error("Token not found in response");
      }

      AuthService.login(response.token, response.userData.username);
      // check if the token is saved in local storage
      // const token = AuthService.getToken();
      // console.log("token after save", token);

      onLogin(response.userData.username);
      // for testing purposes only
      console.log(response);

      setFormData({ email: "", password: "" });
    } catch (error) {
      console.error(error);
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleFormSubmit();
    }
  };
  useEffect(() => {
    const token = AuthService.getToken();
    if (token) {
      const userData = AuthService.getProfile();
      if (userData) {
        onLogin(userData.username as string);
      }
    }
  }, [onLogin]);

  return (
    <Box sx={root}>
      <TextField
        label="Email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <Button onClick={handleFormSubmit} sx={button}>
        Login
      </Button>
    </Box>
  );
};
