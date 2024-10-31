import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

const CountdownTimer = () => {
  // Set the target date (31st October)
  const targetDate = new Date("2024-11-01T17:59:59").getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <Box sx={{ display: "flex", gap: "4px", justifyContent: "center" }}>
      {Object.entries(timeLeft).map(([unit, value], index) => (
        <Box
          key={index}
          sx={{
            backgroundColor: "#007bff",
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
            color: "#fff",
            gap: { xs: "2px", sm: "7px" },
            borderRadius: "5px",
            padding: { xs: "2px 4px", sm: "4px 6px" }, // Reduced padding for mobile
            minWidth: { xs: "30px", sm: "40px" },
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
          }}
        >
          <Typography variant="h6" sx={{ fontFamily: "poppins, sans-serif" }}>
            {String(value).padStart(2, "0")}
          </Typography>
          <Typography
            variant="caption"
            sx={{ fontSize: "10px", fontFamily: "poppins, sans-serif" }}
          >
            {unit.charAt(0).toUpperCase() + unit.slice(1)}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default CountdownTimer;
