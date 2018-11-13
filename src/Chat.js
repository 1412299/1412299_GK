import React, { Component } from "react";
import { databaseRef } from "./redux/configure";
import "./chat.css";
import ListItem from "material-ui/List/ListItem";
import ListItemText from "material-ui/List/ListItemText";
import Avatar from "material-ui/Avatar";
import snapshotToArray from "./snapshotToArray";
import TextField from "material-ui/TextField";
import Button from "material-ui/Button";
import Paper from "material-ui/Paper";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allUser: [],
      currentUser: null,
      userChoose: null,
      message: [],
      newMessage: "",
      searchUser: ""
    };
  }
  componentDidMount() {
    databaseRef.ref("users").on("value", snapshot => {
      let userList = snapshotToArray(snapshot);
      console.log("userList", userList);
      for (let i = 0; i < userList.length; i++) {
        if (typeof userList[i]["bookMark"] === "undefined") {
          databaseRef
            .ref(`users/${userList[i].key}`)
            .child("bookMark")
            .set(false);
        }
      }

      this.setState({
        allUser: userList,
        currentUser: this.props.user.providerData[0]
      });

      // bookMark
      let allUser = this.state.allUser;
      let sortUser = [];
      allUser.map(item => {
        if (item["bookMark"]) {
          sortUser.push(item);
        }
      });
      allUser.map(item => {
        if (item["bookMark"] === false) {
          sortUser.push(item);
        }
      });
      this.setState({
        allUser: sortUser
      });
      // update new user to list user
      databaseRef
        .ref(`conversation/${this.state.currentUser.uid}`)
        .on("value", snapshot => {
          let userDB = snapshotToArray(snapshot);
          console.log("allUser", this.state.allUser);
          console.log("userDB", userDB);
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
        }`
      )
      .child("lasttime")
      .set(new Date().valueOf());
  };

  getValueInput = evt => {
    console.log(evt.target.value);
    this.setState({
      newMessage: evt.target.value
    });
  };

  searchUser = evt => {
    this.setState({
      searchUser: evt.target.value
    });
  };

  // bookMark
  async bookMark(e, user) {
    console.log(user);
    let bookMark;
    await databaseRef
      .ref(`users/${user.key}/bookMark`)
      .on("value", snapshot => {
        bookMark = !snapshot.val();
      });
    await databaseRef.ref(`users/${user.key}/bookMark`).set(bookMark);

    console.log(this.state.allUser);
    // change index
    let allUser = this.state.allUser;
    let sortUser = [];
    allUser.map(item => {
      if (item["bookMark"]) {
        sortUser.push(item);
      }
    });

    allUser.map(item => {
      if (item["bookMark"] === false) {
        sortUser.push(item);
      }
    });
    this.setState({
      allUser: sortUser
    });
  }

  render() {
    const RegExpImg = /(https?:\/\/.*\.(?:png|jpg))/i;
    // const RegExpImg = /fcd_[0-9]+_trajectory\.csv$/gm;
    return (
      <div className="row chat">
        <div className="col-md-4 list_room">
          <Paper style={{ height: 550, overflow: "scroll" }}>
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
              {this.state.allUser
                .filter(
                  user =>
                    user.providerData[0].displayName
                      .toLowerCase()
                      .indexOf(this.state.searchUser.toLowerCase()) !== -1
                )
                .map(user => {
                  return (
                    <div
                      key={user.providerData[0].uid}
                      style={{ position: "relative" }}
                    >
                      <ListItem
                        onClick={e => this.createRoom(e, user)}
                        key={user.providerData[0].uid}
                      >
                        <Avatar
                          alt={user.providerData[0].displayName}
                          src={user.providerData[0].photoURL}
                        />
                        <ListItemText
                          primary={user.providerData[0].displayName}
                          secondary={user.providerData[0].email}
                        />
                      </ListItem>
                      <div
                        className={
                          "bookMark" +
                          " " +
                          (user.bookMark ? "background_red" : "no_background")
                        }
                        onClick={e => this.bookMark(e, user)}
                      />
                    </div>
                  );
                })}
            </ul>
          </Paper>
        </div>
        <div className="col-md-8 ">
          {/* <input value={this.state.inputValue} onChange={this.getValueInput} />
          <button onClick={this.onSubmit}>Send</button> */}
          {this.state.userChoose ? (
            <Paper
              style={{
                maxHeight: 460,
                overflow: "scroll",
                position: "relative"
              }}
            >
              <h3 className="text-center" style={{ marginTop: 20 }}>
                {`Room: ${this.state.userChoose.displayName.toUpperCase()}`}
              </h3>
              <div>
                {this.state.message.map(item => {
                  return (
                    <ListItem key={item.key}>
                      <Avatar alt={item.photoURL} src={item.photoURL} />
                      {RegExpImg.test(item.message) ? (
                        <img src={item.message} />
                      ) : (
                        <ListItemText
                          primary={item.message}
                          secondary={item.timestamp}
                        />
                      )}
                    </ListItem>
                  );
                })}
              </div>
            </Paper>
          ) : (
            <h1 className="text-center">Welcome to chat Application</h1>
          )}
          {this.state.userChoose && (
            <Paper
              style={{ borderRadius: 10, marginTop: 25, paddingBottom: 12 }}
            >
              <TextField
                id="outlined-with-placeholder"
                label="Send Message"
                placeholder="Send Message"
                color="nomal"
                variant="outlined"
                style={{ width: 700, marginRight: 20, marginLeft: 20 }}
                onChange={this.getValueInput}
              />
              <Button
                onClick={this.onSubmit}
                style={{ backgroundColor: "#3f51b5", color: "#fff" }}
              >
                Send
              </Button>
            </Paper>
          )}
        </div>
      </div>
    );
  }
}

export default Chat;
