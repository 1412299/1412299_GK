import React, { Component } from "react";
import { databaseRef } from "./redux/configure";
import "./chat.css";
import snapshotToArray from "./snapshotToArray";

const room = {
  roomID: 123,
  body: {
    message: {
      senderID: 1,
      content: "this is the message"
    }
  }
};
class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listUser: [],
      currentUser: null,
      currentRoom: ""
    };
  }
  componentDidMount() {
    // set currentUSer
    databaseRef.ref("users").on("value", snapshot => {
      let userList = snapshotToArray(snapshot);
      // userList = userList.map(item => item.providerData);
      this.setState({
        listUser: userList,
        currentUser: this.props.user
      });
    });
  }

  createRoom(e, user) {
    if (this.state.currentUser.providerData[0].uid > user.providerData[0].uid) {
      room_id = `${this.state.currentUser.providerData[0].uid}_${
        user.providerData[0].uid
      }`;
    } else {
      room_id = `${user.providerData[0].uid}_${
        this.state.currentUser.providerData[0].uid
      }`;
    }
    this.setState({
      currentRoom: user.providerData[0].uid
    });
    databaseRef
      .ref(
        `conversation/${this.state.currentUser.providerData[0].uid}/${
          this.state.currentRoom
        }`
      )
      .on("value", snapshot => {
        let message = snapshot.val();
        console.log(message);
        // userList = userList.map(item => item.providerData);
        // this.setState({
        //   listUser: userList,
        //   currentUser: this.props.user
        // });
      });
  }

  onSubmit = () => {
    console.log(new Date());
    databaseRef
      .ref(`conversation/${this.state.currentUser.providerData[0].uid}`)
      //.child(this.state.currentUser.providerData[0].uid)
      .child(this.state.currentRoom)
      // .equalTo(this.state.currentRoom)
      .push({
        message: this.state.message,
        sender: this.state.currentUser.email,
        timestamp: new Date().toString()
      });

    databaseRef
      .ref(`conversation/${this.state.currentRoom}`)
      .child(this.state.currentUser.providerData[0].uid)
      // .equalTo(this.state.currentRoom)
      .push({
        message: this.state.message,
        sender: this.state.currentUser.email,
        timestamp: new Date().toString()
      });

    databaseRef
      .ref(
        `conversation/${this.state.currentRoom}/${
          this.state.currentUser.providerData[0].uid
        }/timeinfo`
      )
      .child("lasttime")
      .set(new Date().toString());
  };

  getValueInput = evt => {
    this.setState({
      message: evt.target.value
    });
  };

  render() {
    console.log(this.state.listUser);
    console.log(this.state.currentUser);
    return (
      <div className="row chat">
        <div className="col-md-4 list_room">
          <ul className="list-group">
            {this.state.listUser.map(user => {
              return (
                <li
                  className="list-group-item"
                  key={user.key}
                  onClick={e => this.createRoom(e, user)}
                >
                  {user.displayName}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="col-md-8 room">
          <input value={this.state.inputValue} onChange={this.getValueInput} />
          <button onClick={this.onSubmit}>Send</button>
        </div>
      </div>
    );
  }
}

export default Chat;
