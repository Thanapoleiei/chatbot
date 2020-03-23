import React, { Component } from "react";
import Firebase from 'firebase';
import auth from "./firebase/";
import { connect } from 'react-redux'
import { logout, login } from "../Redux/Actions"
import {
    Container,
    Row,
    Col,
    Button
} from "reactstrap";
import NavAdmin from './NavAdmin';
import "./Admin.css";
class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            surname: '',
            email: '',
            message: "",
            password: '',
            isloading: false
        }
    }

    componentDidMount() {
        auth.onAuthStateChanged(user => {
            if (user) {
                this.props.login(user)
                let app = Firebase.database().ref('dataAdmin');
                app.on('value', snapshot => {
                    this.setState({
                        isloading: true
                    });
                });
            } else {
                this.props.history.push('/login')
            }
        });
    }

    handleSignUp = () => {
        var rex = /([a-zA-Z])+/g
        var rexThai = /([ก-๑])+/
        if (this.state.email === "" || this.state.password === "" || this.state.username === "" || this.state.surname === "") {
            this.setState({
                message: "กรุณากรอกข้อมูลให้ครบสมบูรณ์"
            })
        }
        else if (rex.test(this.state.username) && !rexThai.test(this.state.username) && rex.test(this.state.surname) && !rexThai.test(this.state.surname)) {
            const { email, password } = this.state
            if (this.state.email !== "" && this.state.password !== "" && this.state.username !== "" && this.state.surname !== "") {
                auth
                    .createUserWithEmailAndPassword(email, password)
                    .then(() => this.props.history.push('/login'))
                    .catch(error =>
                        this.setState({
                            message: error.message
                        })
                    )
                let app = Firebase.database().ref('/dataAdmin');
                app.push({
                    username: this.state.username,
                    surname: this.state.surname,
                    email: this.state.email,
                    password: this.state.password,
                });
            }
            else {
                this.setState({
                    message: "กรุณากรอกข้อมูลให้ครบสมบูรณ์"
                })
            }
        }
        else if (rexThai.test(this.state.username) && rexThai.test(this.state.surname)) {
            this.setState({
                message: "กรุณาใช้ ชื่อ-นามสกุล ภาษาอังกฤษเท่านั้น"
            })
        }
    }

    onChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    render() {
        const { message } = this.state;
        return (
            <div>
                {
                    this.state.isloading === true ?
                        <div id="main">
                            <NavAdmin />
                            <Container className="login">
                                <Row>
                                    <Col>
                                        <div className="formSignup">
                                            <h1 className="admin">Register Admin</h1>
                                            <input
                                                className="ipSignup"
                                                type="text"
                                                name="username"
                                                onChange={this.onChange}
                                                placeholder='First Name'
                                                autocomplete="off"
                                            />
                                            <input
                                                className="ipSignup"
                                                type="text"
                                                name="surname"
                                                onChange={this.onChange}
                                                placeholder='Last Name'
                                                autocomplete="off"
                                            />
                                            <input
                                                className="ipSignup"
                                                type="text"
                                                name="email"
                                                placeholder="Email Address"
                                                onChange={this.onChange}
                                                autocomplete="off"
                                            />
                                            <input
                                                className="ipSignup"
                                                type="password"
                                                name="password"
                                                placeholder="Password"
                                                onChange={this.onChange}
                                                autocomplete="off"
                                            />
                                            {message ? <p className="help2">{message}</p> : null}
                                            <Button className="bt-sigup" onClick={this.handleSignUp} color="danger">Register</Button>
                                        </div>
                                    </Col>
                                </Row>
                            </Container>
                        </div> :
                        <div className="spin">
                            <div class="bg"></div>
                            <div class="bg bg2"></div>
                            <div class="bg bg3"></div>
                        </div>
                }
            </div>
        );
    }
}

const mapStateToProp = (state) => {
    return { T: state.Reducer }
}

export default connect(mapStateToProp, { logout, login })(SignUp);