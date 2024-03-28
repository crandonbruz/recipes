import { Box, Button, TextField } from "@mui/material";
import { styles } from "./styles";
import { useState } from "react";
import { loginUser } from "@/utils/api";
import Auth from "@/utils/auth";

export const LoginComp = () => {
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

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const responseData = await response.json();

      if (!responseData.token) {
        throw new Error("Token not found in response");
      }
      Auth.login(responseData.token);

      console.log("Login successful");
      setFormData({ email: "", password: "" });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Box sx={root}>
      <TextField
        label="Username"
        value={formData.email}
        onChange={handleInputChange}
      />
      <TextField
        label="Password"
        value={formData.password}
        onChange={handleInputChange}
      />
      <Button onClick={handleFormSubmit}>Login</Button>
    </Box>
  );
};
