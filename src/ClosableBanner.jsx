import React, { useState, useEffect } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { keyframes } from "@emotion/react";

const slideDown = keyframes`
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
`;

const CelebrationBanner = () => {
  const [isBannerOpen, setBannerOpen] = useState(true);
  // const totalTarget = 60;
  // const usersRemaining = totalTarget - currentUsers;

  const handleClose = () => {
    setBannerOpen(false);
  };

  useEffect(() => {
    if (isBannerOpen) {
      // Add confetti animation on mount
      const confetti = document.createElement("div");
      confetti.classList.add("confetti");
      document.body.appendChild(confetti);

      setTimeout(() => confetti.remove(), 2000);
      const timeout = setTimeout(() => {
        setBannerOpen(false);
      }, 5000);
      return () => clearTimeout(timeout); // Remove after 2 seconds
    }
  }, [isBannerOpen]);

  if (!isBannerOpen) return null;

  return (
    <Box
      sx={{
        position: "absolute",
        top: "20px",
        left: "0%",
        backgroundColor: "#007bff",
        color: "#fff",
        padding: "10px 10px",
        display: "flex",
        alignItems: "center",
        borderRadius: "8px",
        width: { xs: "250px", sm: "300px" },
        marginLeft: "10px",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
        zIndex: 1000,
        animation: `${slideDown} 0.5s ease-out`,
      }}
    >
      <Typography
        sx={{
          marginRight: "8px",
          fontFamily: "poppins, sans-serif",
        }}
      >
        🎉Successfully Achieved the Tier-2 Status.
      </Typography>
      <IconButton
        color="inherit"
        onClick={handleClose}
        sx={{ color: "#fff", marginLeft: "8px" }}
      >
        <CloseIcon />
      </IconButton>
    </Box>
  );
};

export default CelebrationBanner;
