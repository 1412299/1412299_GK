import React, { Component } from "react";
import { databaseRef } from "./redux/configure";
import "./chat.css";
import ListItem from "material-ui/List/ListItem";
import ListItemText from "material-ui/List/ListItemText";
import Avatar from "material-ui/Avatar";
import snapshotToArray from "./snapshotToArray";
import TextField from "material-ui/TextField";
import Button from "material-ui/Button";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allUser: [],
      currentUser: null,
      userChoose: null,
      message: [],
      newMessage: ""
    };
  }
  componentDidMount() {
    databaseRef.ref("users").on("value", snapshot => {
      let userList = snapshotToArray(snapshot);
      userList = userList.map(item => item.providerData[0]);
      this.setState({
        allUser: userList,
        currentUser: this.props.user.providerData[0]
      });
      // get user
      databaseRef
        .ref(`conversation/${this.state.currentUser.uid}`)
        .on("value", snapshot => {
          // filter all user have snapshot.key
          // let testUser = this.state.allUser.filter(
          //   item => item.uid === snapshot.key
          // );
        });
    });
  }

  createRoom(e, userChoose) {
    let currentUser = this.state.currentUser;
    this.setState({
      userChoose
    });
    // let room_id;
    // if (currentUser.uid > userChoose.uid) {
    //   room_id = `${currentUser.uid}_${userChoose.uid}`;
    // } else {
    //   room_id = `${userChoose.uid}_${currentUser.uid}`;
    // }
    databaseRef
      .ref(`conversation/${currentUser.uid}/${userChoose.uid}`)
      .on("value", snapshot => {
        let message = snapshotToArray(snapshot);
        // userList = userList.map(item => item.providerData);
        // this.setState({
        //   listUser: userList,
        //   currentUser: this.props.user
        // });
        console.log(message);
        this.setState({
          message
        });
      });
  }

  onSubmit = () => {
    console.log("onSubmit");
    databaseRef
      .ref(`conversation/${this.state.currentUser.uid}`)
      .child(this.state.userChoose.uid)
      // .equalTo(this.state.currentRoom)
      .push({
        message: this.state.newMessage,
        sender: this.state.currentUser.email,
        timestamp: new Date().toString(),
        photoURL: this.state.currentUser.photoURL
      });

    databaseRef
      .ref(`conversation/${this.state.userChoose.uid}`)
      .child(this.state.currentUser.uid)
      // .equalTo(this.state.currentRoom)
      .push({
        message: this.state.newMessage,
        sender: this.state.currentUser.email,
        timestamp: new Date().toString(),
        photoURL: this.state.currentUser.photoURL
      });

    databaseRef
      .ref(
        `conversation/${this.state.userChoose.uid}/${
          this.state.currentUser.uid
        }/timeinfo`
      )
      .child("lasttime")
      .set(new Date().toString());
  };

  getValueInput = evt => {
    console.log(evt.target.value);
    this.setState({
      newMessage: evt.target.value
    });
  };

  searchUser = () => {
    console.log("serach User");
  };
  render() {
    console.log(this.state.newMessage);
    return (
      <div className="row chat">
        <div className="col-md-5 list_room">
          <TextField
            id="outlined-with-placeholder"
            label="Find User"
            placeholder="Find User"
            // className={classes.textField}
            fullWidth
            style={{ margin: "0px 0px 20px 20px", width: "300px" }}
            onChange={this.searchUser}
          />
          <ul className="list-group">
            {this.state.allUser.map(user => {
              return (
                <ListItem
                  key={user.uid}
                  onClick={e => this.createRoom(e, user)}
                >
                  <Avatar alt={user.displayName} src={user.photoURL} />
                  <ListItemText
                    primary={user.displayName}
                    secondary={user.email}
                  />
                </ListItem>
              );
            })}
          </ul>
        </div>
        <div className="col-md-7 room">
          {/* <input value={this.state.inputValue} onChange={this.getValueInput} />
          <button onClick={this.onSubmit}>Send</button> */}
          {this.state.userChoose ? (
            <div>
              <div>
                {this.state.message.map(item => {
                  console.log(item);
                  return (
                    <ListItem key={item.key}>
                      <Avatar alt={item.photoURL} src={item.photoURL} />
                      <ListItemText
                        primary={item.message}
                        secondary={item.timestamp}
                      />
                    </ListItem>
                  );
                })}
              </div>
              <TextField
                id="outlined-with-placeholder"
                label="With placeholder"
                placeholder="Placeholder"
                // className={classes.textField}
                margin="normal"
                variant="outlined"
                style={{ width: 500, marginRight: 20 }}
                onChange={this.getValueInput}
              />
              <Button
                onClick={this.onSubmit}
                color="primary"
                style={{ backgroundColor: "##41e2f4" }}
              >
                Send
              </Button>
            </div>
          ) : (
            <h1 className="center">Welcome to chat Application</h1>
          )}
        </div>
      </div>
    );
  }
}

export default Chat;
