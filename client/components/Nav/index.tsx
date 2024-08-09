import { Box, Button, Fade, Menu, MenuItem, Modal } from "@mui/material";
import React, { useState } from "react";
import { styles } from "./styles";
import { LoginComp } from "../Login";
import { RegisterComp } from "../Register";
import { redirect } from "next/navigation";
import { UsersComp } from "../Users";
import { renderToString } from "react-dom/server";

export const NavComp = () => {
  const { root, button, modal } = styles;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<null | "login" | "register">(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const open = Boolean(anchorEl);

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

  const handleLogin = () => {
    setIsLoggedIn(true);
    handleCloseModal();
  };
  const handleRegister = () => {
    setIsLoggedIn(true);
    handleCloseModal();
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    handleClose();
  };
  const handleUserPage = () => {
    redirect(renderToString(<UsersComp />));
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
          {isLoggedIn ? `Welcome User` : "Recipies"}
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
              <MenuItem onClick={handleUserPage}>Profile</MenuItem>
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
