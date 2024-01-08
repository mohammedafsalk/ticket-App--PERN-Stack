import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export default function Loader({openLoader}) {
    console.log(openLoader);
  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 100 }}
        open={openLoader}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
