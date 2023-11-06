import { CircularProgress } from "@mui/material";
import React from "react";

const LoadingPage = () => {
  return (
    <div style={styleLoadingPage}>
      <CircularProgress color="inherit" />
    </div>
  );
};

const styleLoadingPage: React.CSSProperties = {
  position: "absolute",
  width: "100vw",
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export default LoadingPage;
