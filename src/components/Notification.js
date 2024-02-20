import React from "react";

import { Alert } from "@mui/material";

const Notification = (type, message) => {
  return (
    <div>
      <Alert severity={type}>{message}</Alert>
    </div>
  );
};

export default Notification;
