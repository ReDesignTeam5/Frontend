import React from "react";
import {
  Dialog,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CongratsBackground from "../assets/Congratspage/congratsbg.svg";
import IncorrectBackground from "../assets/Congratspage/incorrectbg.svg";

const useStyles = makeStyles({
  paper: {
    backgroundColor: "transparent",
    boxShadow: "none",
  },
});

function Congrats({ open, handleClose, correct }) {
  const classes = useStyles();
  const popUpImage = correct?CongratsBackground: IncorrectBackground;

  return (
    <div style={{}}>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="lg"
        style={{boxShadow: "none",backgroundColor: "rgba(0, 0, 0, 0.5)"}}
        classes={{
          paper: classes.paper,
        }}
      >
        <img
          style={{ width: "auto", height: "100%" }}
          src={popUpImage}
          alt="image"
        />
      </Dialog>
    </div>
  );
}

export default Congrats;
