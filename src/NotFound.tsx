import React from "react";
import { Typography } from "@material-ui/core";

const NotFound: React.FC = () => {
  return (
    <>
      <Typography variant="h1">Oops</Typography>
      <div style={{ height: "30px" }}></div>
      <Typography variant="body1"> We couldn't find the page you're looking for. </Typography>
    </>
  );
};

export default NotFound;
