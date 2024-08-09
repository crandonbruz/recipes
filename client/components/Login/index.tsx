import { Box, Button, TextField } from "@mui/material";
import { styles } from "./styles";
import { useState } from "react";
import { loginUser } from "@/utils/api";
import { AuthService } from "@/utils/auth";
import React from "react";
import { LoginCompProps } from "@/utils/types";

export const LoginComp: React.FC<LoginCompProps> = ({ onLogin }) => {
  const { root } = styles;
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

      if (!(response as Response).ok) {
        throw new Error("Login failed");
      }

      const responseData = await (response as Response).json();

      if (!responseData.token) {
        throw new Error("Token not found in response");
      }
      AuthService.login(responseData.token);

      console.log("Login successful");
      onLogin(responseData.token);
      setFormData({ email: "", password: "" });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box sx={root}>
      <TextField
        label="Email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleInputChange}
      />
      <Button onClick={handleFormSubmit}>Login</Button>
    </Box>
  );
};
