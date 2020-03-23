import React, { Component } from "react";
import Navigators from "../Navigators/Navigators"
import auth from "./firebase";
import "./Admin.css";
import { connect } from "react-redux"
import { login } from "../Redux/Actions"
import {
  Button,
  Container,
  Row,
  Col,
  Input
} from "reactstrap";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      message: "",
      currentUser: null,
      comfirm: false
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.props.history.push('/admin/download')
      }
    });
  }

  onChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  onSubmit = event => {
    event.preventDefault();
    const { email, password } = this.state;
    auth
      .signInWithEmailAndPassword(email, password)
      .then(response => {
        this.setState({
          currentUser: response.user,
          comfirm: true
        });
        this.props.login(response.user)
        this.props.history.push("/admin/download");
        localStorage.setItem('email', this.state.comfirm)
      })
      .catch(error => {
        this.setState({
          message: error.message
        });
      });
  };

  render() {
    const { message } = this.state;
    return (
      <div className="mainlogin">
        <Navigators />
        <Container className="login">
          <Row>
            <Col>
              <div className="formLogin">
                <h1 className="admin">สำหรับผู้ดูแลระบบ</h1>
                <form onSubmit={this.onSubmit}>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={this.onChange}
                  />
                  <Input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={this.onChange}
                  />
                  <div>
                    <a href="/repassword" className="signup-text"> Reset Password</a>
                  </div>
                  <div>
                    {message ? <p className="help1">{message}</p> : null}
                  </div>
                  <Button className="bt-sigin" onClick={this.onSubmit} color="info" type="submit">
                    เข้าสู่ระบบ
                  </Button>
                </form>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProp = (state) => {
  return { Reducer: state.Reducer }
}
export default connect(mapStateToProp, { login })(Login);
