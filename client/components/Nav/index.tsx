import { Box, Button, Fade, Menu, MenuItem, Modal } from "@mui/material";
import React, { useEffect, useState } from "react";
import { styles } from "./styles";
import { LoginComp } from "../Login";
import { RegisterComp } from "../Register";
import Link from "next/link";
import { AuthService } from "@/utils/auth";

export const NavComp = () => {
  const { root, button, modal } = styles;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<null | "login" | "register">(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState<string>("");

  const open = Boolean(anchorEl);
  // keep the user logged in on refresh if not logged out
  useEffect(() => {
    const token = AuthService.getToken();
    const storedUsername = AuthService.getUsername();
    if (token && !AuthService.isTokenExpired(token)) {
      const userData = AuthService.getProfile();
      if (userData) {
        setUsername(storedUsername || "");
      }
      setIsLoggedIn(true);
    }
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenModal = (type: "login" | "register") => {
    setModalType(type);
    setShowModal(true);
    handleClose();
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalType(null);
  };

  const handleLogin = (username: string) => {
    setIsLoggedIn(true);
    setUsername(username);
    handleCloseModal();
  };
  const handleRegister = (username: string) => {
    setIsLoggedIn(true);
    setUsername(username);
    handleCloseModal();
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    AuthService.logout();
    setUsername("");
    handleClose();
  };

  return (
    <Box sx={root}>
      <div>
        <Button
          style={button}
          id="fade-button"
          aria-controls={open ? "fade-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          {isLoggedIn ? `Welcome ${username}` : "Recipes"}
        </Button>
        <Menu
          id="fade-menu"
          MenuListProps={{
            "aria-labelledby": "fade-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}
        >
          {isLoggedIn ? (
            <div>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
              <MenuItem onClick={handleClose}>
                <Link href="/profile" passHref>
                  Profile
                </Link>
              </MenuItem>
            </div>
          ) : (
            <div>
              <MenuItem onClick={() => handleOpenModal("login")}>
                Login
              </MenuItem>
              <MenuItem onClick={() => handleOpenModal("register")}>
                Register
              </MenuItem>
            </div>
          )}
        </Menu>
      </div>
      <Modal open={showModal} onClose={handleCloseModal}>
        <Box sx={modal}>
          {modalType === "login" && <LoginComp onLogin={handleLogin} />}
          {modalType === "register" && (
            <RegisterComp onRegister={handleRegister} />
          )}
        </Box>
      </Modal>
    </Box>
  );
};
