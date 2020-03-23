import React, { Component } from "react";
import Firebase from 'firebase';
import {
    Container,
    Row,
    Col,
    Button
} from "reactstrap";
import Navigators from "../Navigators/Navigators"
import "./Admin.css";
class ResetPass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            message: ""
        }
    }

    onChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    resetPass = () => {
        var email = this.state.email
        Firebase.auth().sendPasswordResetEmail(email)
            .then(() => {
                alert('Password Reset Email Sent!')
            })
            .catch((error) => {
                var errorCode = error.errorCode
                var errorMessage = error.message
                if (errorCode === 'auth/invalid-email') {
                    alert(errorMessage)
                } else if (errorCode === 'auth/usernot-found') {
                    alert(errorMessage)
                }
            })
    }

    render() {
        const { message } = this.state;
        return (
            <div className="mainlogin">
                <Navigators />
                <Container className="login">
                    <Row>
                        <Col>
                            <div className="formReset">
                                <h1 className="admin">Reset Password</h1>
                                <input
                                    className="ipSignup"
                                    type="email"
                                    name="email"
                                    placeholder="Email Address"
                                    onChange={this.onChange}
                                />
                                {message ? <p className="help2">{message}</p> : null}
                                <Button className="bt-sigup" onClick={this.resetPass} color="warning">Sent</Button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default ResetPass;