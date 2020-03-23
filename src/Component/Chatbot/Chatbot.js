import React, { Component } from "react";
import Pusher from "pusher-js";
import Linkify from "react-linkify";
import ReactDOM from "react-dom";
import Mali from '../../Image/Mali.jpg'
import axios from "axios";
import "./Chat.css";
import Firebase from 'firebase';
import Img from 'react-image'
import Lightbox from 'react-image-lightbox';
class Chatbot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userMessage: "",
      conversation: [{ text: "🙎 สวัสดีค่ะ 🙏 ยินดีต้อนรับเข้าสู่เว็บรับสมัครนักศึกษา มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตภูเก็ต", user: "ai" }],
      agent: "",
      user: "",
      chatMessages: [],
      isOpen: false,
    };
  }

  componentDidMount() {
    const pusher = new Pusher("0c052f6ca7e9fc258324", {
      cluster: "ap1",
      encrypted: true
    });

    const channel = pusher.subscribe("bot");
    channel.bind("bot-response", data => {
      const msg = {
        text: data.message,
        user: "ai",
      };
      this.setState({
        conversation: [...this.state.conversation, msg],
        agent: data.message,
      });
    });
    this.scrollToBottom();
    this.getUserData();
  }

  handleChange = event => {
    this.setState({ userMessage: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();

    let user = this.state.user;
    let agent = this.state.agent;
    let uid = this.refs.uid.value;

    if (uid && user && agent) {
      const { chatMessages } = this.state;
      const devIndex = chatMessages.findIndex(data => {
        return data.uid === uid;
      });
      chatMessages[devIndex].user = user;
      chatMessages[devIndex].agent = agent;
      this.setState({ chatMessages });
    } else if (user && agent) {
      const uid = new Date().getTime().toString();
      const { chatMessages } = this.state;
      chatMessages.push({ uid, user, agent });
      this.setState({ chatMessages });
    }

    this.refs.uid.value = "";

    if (!this.state.userMessage.trim()) return;

    const msg = {
      text: this.state.userMessage,
      user: "human",
    };

    this.setState({
      conversation: [...this.state.conversation, msg],
      user: this.state.userMessage
    })

    axios
      .post("https://chatbot-psu.herokuapp.com/chatbot", {
        message: this.state.userMessage
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    this.setState({ userMessage: "" });

  };

  scrollToBottom = () => {
    const messagesContainer = ReactDOM.findDOMNode(this.messagesContainer);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
      this.writeUserData();
    }
    this.scrollToBottom();
  }

  writeUserData = () => {
    Firebase.database()
      .ref("/")
      .set(this.state);
  };

  getUserData = () => {
    let ref = Firebase.database().ref("/");
    ref.on("value", snapshot => {
      const state = snapshot.val();
      this.setState(state);
    });
  };

  render() {
    const { isOpen } = this.state;
    const ChatBubble = (text, i, className) => {
      if (className === "human") {
        return (
          <div key={`${className}-${i}`} className={`${className} chat-bubble`}>
            <Linkify
              properties={{ target: "blank", rel: "nofollow   noopener" }}
              className="text-link"
            >
              <span className="chat-content">{text}</span>
            </Linkify>
          </div>
        );
      }
      else if (className === "ai") {
        if (!(text.toLowerCase().includes(".jpg"))) {
          return (
            <div key={`${className}-${i}`} className={`${className} chat-bubble`}>
              <span><img src={Mali} alt="mali" className="mali"></img></span><Linkify
                properties={{ target: "blank", rel: "nofollow   noopener" }}
                className="text-link"
              >
                <span className="chat-content">{text}</span>
              </Linkify>
            </div>
          );
        }
        else {
          return (
            <div key={`${className}-${i}`} className={`${className} chat-bubble`}>
              <span><img src={Mali} alt="mali" className="mali"></img></span><Linkify
                properties={{ target: "blank", rel: "nofollow   noopener" }}
                className="text-link"
              >
                <Img
                  onClick={() => this.setState({ isOpen: true })} className="chat-content2 imagecont" src={text} width="400px"
                />
                {isOpen && (
                  <Lightbox
                    mainSrc={text}
                    onCloseRequest={() => this.setState({ isOpen: false })}
                  />
                )}
              </Linkify>
            </div>
          );
        }
      }
    }

    const chat = this.state.conversation.map((event, index) =>
      ChatBubble(event.text, index, event.user)
    );

    return (
      <div className="chat-window" >
        <div className="psu">
          <form onClick={this.props.onClick}>
            <span className="text-p3">ห้องแชท (น้องมะลิ)</span>
          </form>
        </div>
        <div
          ref={el => {
            this.messagesContainer = el;
          }}
          className="conversation-view"
        >
          {chat}
        </div>
        <div className="message-box">
          <form onSubmit={this.handleSubmit} action="/chatbot" method="post">
            <input type="hidden" ref="uid" />
            <input
              value={this.state.userMessage}
              onInput={this.handleChange}
              className="text-input"
              type="text"
              placeholder="Type your message and Enter to send"
            />
            <div ref={this.messagesEnd} />
          </form>
        </div>
      </div>
    );
  }
}

export default Chatbot;