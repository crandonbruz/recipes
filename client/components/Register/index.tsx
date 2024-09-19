import { Box, Button, TextField } from "@mui/material";
import { styles } from "./styles";
import { useState } from "react";
import { registerUser } from "@/utils/api";
import { RegisterCompProps } from "@/utils/types";
import { AuthService } from "@/utils/auth";

export const RegisterComp: React.FC<RegisterCompProps> = ({ onRegister }) => {
  const { root } = styles;
  const [registerState, setRegisterState] = useState({
    email: "",
    username: "",
    password: "",
  });

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setRegisterState((prevRegisterState) => ({
      ...prevRegisterState,
      [name]: value,
    }));
  };

  const handleFormSubmit = async () => {
    if (
      !registerState.email ||
      !registerState.username ||
      !registerState.password
    ) {
      return false;
    }
    try {
      const response = await registerUser({
        username: registerState.username,
        email: registerState.email,
        password: registerState.password,
      });

      if (!(response as Response).ok) {
        throw new Error("Register failed");
      }

      const responseData = await (response as Response).json();

      if (!responseData.token) {
        throw new Error("Token not found in response");
      }

      console.log("Register successful");
      AuthService.login(responseData.token, registerState.username);
      onRegister(registerState.username);
      console.log(responseData.token);
      setRegisterState({ email: "", username: "", password: "" });
    } catch (error) {
      console.error(error);
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleFormSubmit();
    }
  };

  return (
    <Box sx={root}>
      <TextField
        label="Email"
        name="email"
        value={registerState.email}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <TextField
        label="Username"
        name="username"
        value={registerState.username}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        value={registerState.password}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <Button onClick={handleFormSubmit}>Register</Button>
    </Box>
  );
};
