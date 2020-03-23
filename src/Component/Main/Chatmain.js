import React, { Component } from "react";
import { Fade, Button } from "reactstrap";
import Chatbot from "../Chatbot/Chatbot";
import "./Chatmain.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fadeIn: false
    };
  }

  toggle = () => {
    this.setState({
      fadeIn: !this.state.fadeIn
    });
  }

  render() {
    return (
      <div>
        <div className={this.state.fadeIn ? "chat-popup" : "chat-popup-close"}>
          <form className="form-container">
            <Fade in={this.state.fadeIn} tag="h5" className="mt-3">
              <Chatbot onClick={this.toggle} />
            </Fade>
          </form>
        </div>
        <Button
          className={this.state.fadeIn ? "but-icon-circle" : "but-icon-chat"}
          color="info"
          onClick={this.toggle}
        >
          {this.state.fadeIn ? <div className="icon-message"><FontAwesomeIcon icon="comments" /></div> : <div>
            <span>
              <span className="text-p1">คุยกับน้องมะลิ</span>
            </span>
          </div>}
        </Button>
      </div>
    );
  }
}
export default Main;
