import React from "react";
import { withStyles } from "material-ui/styles";
import CssBaseline from "material-ui/CssBaseline";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import Button from "material-ui/Button";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import SignIn from "./SignInContainer";
import chat from "./static/chat.png";
import Chat from "./Chat";

const styles = {
  // root: {
  //   flexGrow: 1
  // },
  flex: {
    flex: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  contentBodyGrid: {
    margin: 16,
    width: "auto"
  },
  contentBodyPaper: {
    padding: 16,
    minWidth: 400
  },
  displayName: {
    marginLeft: 12,
    marginRight: "calc(50%)"
  }
};

const defaultProfile = {
  displayName: "",
  avatarUrl: "",
  isEmpty: true,
  isLoaded: false
};

const defaultAuth = {
  isEmpty: true,
  isLoaded: false
};

const handleSignout = firebase => {
  return () => {
    firebase !== null && firebase.logout().then(() => <Redirect to="/" />);
  };
};

const App = props => {
  const { classes, firebase } = props;

  // equality operator ftw, the null check includes undefined
  const profile =
    props.profile == null
      ? defaultProfile
      : { ...defaultProfile, ...props.profile };
  const auth =
    props.auth == null ? defaultAuth : { ...defaultAuth, ...props.auth };
  const isAuthed = auth.isLoaded && !auth.isEmpty;
  return (
    <Router>
      <div>
        <CssBaseline />
        <AppBar position="static">
          <Toolbar>
            <img
              style={{ marginRight: 12 }}
              src={chat}
              alt="chaticon"
              height="48"
            />
            <Typography
              variant="title"
              color="inherit"
              className={classes.flex}
            >
              Chat App Long
            </Typography>
            <Typography
              style={styles.displayName}
              align="center"
              variant="subheading"
              color="inherit"
            >
              {profile.displayName.toUpperCase()}
            </Typography>
            {isAuthed ? (
              <Button onClick={handleSignout(firebase)} color="inherit">
                Sign Out
              </Button>
            ) : null}
          </Toolbar>
        </AppBar>
        <div className={classes.root}>
          {/* <Paper style={styles.contentBodyPaper}> */}
          {isAuthed ? (
            <Switch>
              {/* <Route exact path="/chat" component={Chat} /> */}
              <Route
                exact
                path="/chat"
                render={() => <Chat user={profile} />}
              />

              <Route
                render={() => <Redirect to="/chat" user={props.profile} />}
              />
            </Switch>
          ) : (
            <Switch>
              <Route exact path="/signin" component={SignIn} />
              <Route render={() => <Redirect to="/signin" />} />
            </Switch>
          )}
          {/* </Paper> */}
        </div>
      </div>
    </Router>
  );
};
export default withStyles(styles)(App);
