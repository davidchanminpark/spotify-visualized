import React, { useState } from "react";
import logo from "./assets/spotify-visualized-logo.svg";
import label from "./assets/spotify-visualized-label.svg";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import { useStyles } from "./uistyles.js";

function SignUp() {
  var generateRandomString = function (length) {
    var text = "";
    var possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };

  function handleLogIn() {
    window.location.replace("http://localhost:8888/login");
  }

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item>
          <Avatar alt="website-logo" src={logo} />
        </Grid>
        <Grid item>
          <div className="label">
            <img src={label} width="200" />
          </div>
        </Grid>
        <Button onClick={handleLogIn}>Log In</Button>
      </Grid>
    </div>
  );
}

export default SignUp;
