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
        variables: { email: formData.email, password: formData.password },
      });
      Auth.login(response.login.token);
      console.log(response);
      if (!response.ok) {
        throw new Error("No data found");
      }
      const data = await response.json();
      console.log(data);
      if (!data) {
        throw new Error("recipes not found in response");
      }
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
