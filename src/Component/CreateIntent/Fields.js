import React, { Component } from "react"
import {
    Button, Container, Form, Row, Col
} from "reactstrap";
import auth from "../Admin/firebase";
import Firebase from 'firebase';
import { connect } from 'react-redux'
import { logout, login } from "../Redux/Actions"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NavAdmin from '../Admin/NavAdmin';
import './question.css'
class Fields extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userSays: [{
                id: Math.floor((Math.random() * 99) + 1) + "abdec" + Math.floor((Math.random() * 9999) + 1) + "acebd" + Math.floor((Math.random() * 9999) + 1) + "aefdbc" + Math.floor((Math.random() * 999) + 1),
                data: [
                    {
                        text: "",
                        userDefined: false
                    }
                ],
                isTemplate: false,
                count: 0,
                updated: 0,
                isAuto: false
            }],
            responses: [{
                resetContexts: false,
                affectedContexts: [],
                parameters: [],
                messages: [{
                    type: 0,
                    platform: "line",
                    condition: "",
                    speech: ""
                },
                {
                    type: 0,
                    condition: "",
                    speech: ""
                }],
                defaultResponsePlatforms: {},
                speech: []
            }],
            message: "",
            isloading: false
        }
    }

    componentDidMount() {
        auth.onAuthStateChanged(user => {
            if (user) {
                this.props.login(user)
            } else {
                this.props.history.push('/login')
            }
        });
        this.getDate();
        let app = Firebase.database().ref(`dataIntent`);
        app.on('value', snapshot => {
            this.setState({
                isloading: true
            });
        })
    }

    appendLeadingZeroes = (n) => {
        if (n <= 9) {
            return "0" + n;
        }
        return n
    }

    getDate = () => {
        const months = ["Jan.", "Feb", "Mar.", "Apr.", "May", "Jun.", "Jul.", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."];
        var date = new Date();
        var datestring = this.appendLeadingZeroes(date.getDate()) + " " + months[(date.getMonth())] + " " + date.getFullYear() + "  " + this.appendLeadingZeroes(date.getHours()) + ":" + this.appendLeadingZeroes(date.getMinutes());
        this.setState({ datestring });
    }

    klikPost = () => {
        var rex = /([a-zA-Z])+/g
        var rexThai = /([ก-๑])+/
        if (this.refs.name.value === "") {
            this.setState({
                message: "กรุณากรอกข้อมูลให้ครบสมบูรณ์"
            })
        } else if (rex.test(this.refs.name.value) && !rexThai.test(this.refs.name.value)) {
            let app = Firebase.database().ref('/dataIntent');
            app.push({
                dataMG: {
                    id: Math.floor((Math.random() * 99) + 1) + "abdec" + Math.floor((Math.random() * 9999) + 1) + "acebd" + Math.floor((Math.random() * 9999) + 1) + "aefdbc" + Math.floor((Math.random() * 999) + 1),
                    name: this.refs.name.value,
                    auto: true,
                    contexts: [],
                    responses: [{
                        resetContexts: false,
                        affectedContexts: [],
                        parameters: [],
                        messages: [{
                            type: 0,
                            platform: "line",
                            condition: "",
                            speech: this.state.responses
                        },
                        {
                            type: 0,
                            condition: "",
                            speech: this.state.responses
                        }],
                        defaultResponsePlatforms: {},
                        speech: []
                    }],
                    priority: 500000,
                    webhookUsed: false,
                    webhookForSlotFilling: false,
                    fallbackIntent: false,
                    events: [],
                    userSays: this.state.userSays,
                    followUpIntents: [],
                    liveAgentHandoff: false,
                    endInteraction: false,
                    conditionalResponses: [],
                    condition: "",
                    conditionalFollowupEvents: [],
                    templates: []
                },
                date: this.state.datestring,
            });
            alert("Submit Successful!!")
            this.refs.name.value = ""
            this.setState({
                userSays: [],
                responses: []
            })
            window.location.reload()
        } else if (rexThai.test(this.refs.name.value)) {
            this.setState({
                message: "กรุณาใช้ Name Intent ภาษาอังกฤษเท่านั้น"
            })
        }
    };

    handleQuestion = idx => evt => {
        const newuserSays = this.state.userSays.map((userSay, sidx) => {
            if (idx !== sidx) return userSay;
            return {
                ...userSay, id: Math.floor((Math.random() * 99) + 1) + "abdec" + Math.floor((Math.random() * 9999) + 1) + "acebd" + Math.floor((Math.random() * 9999) + 1) + "aefdbc" + Math.floor((Math.random() * 999) + 1),
                data: [
                    {
                        text: evt.target.value,
                        userDefined: false
                    }
                ],
                isTemplate: false,
                count: 0,
                updated: 0,
                isAuto: false
            };
        });
        this.setState({ userSays: newuserSays });
    }

    addQuestion = e => {
        e.preventDefault()
        this.setState({
            userSays: this.state.userSays.concat([{
                id: Math.floor((Math.random() * 99) + 1) + "abdec" + Math.floor((Math.random() * 9999) + 1) + "acebd" + Math.floor((Math.random() * 9999) + 1) + "aefdbc" + Math.floor((Math.random() * 999) + 1),
                data: [
                    {
                        text: "",
                        userDefined: false
                    }
                ],
                isTemplate: false,
                count: 0,
                updated: 0,
                isAuto: false
            }])
        });
    }

    removeQuestion = (index) => {
        this.state.userSays.splice(index, 1)
        this.setState({ userSays: this.state.userSays })
    }

    handleAnswer = i => e => {
        let responses = [...this.state.responses]
        responses[i] = e.target.value
        this.setState({
            responses
        })
    }

    addAnswer = e => {
        e.preventDefault()
        let responses = this.state.responses.concat([''])
        this.setState({
            responses
        })
    }

    removeAnswer = (index) => {
        this.state.responses.splice(index, 1)
        this.setState({ responses: this.state.responses })
    }

    render() {
        const { message } = this.state;
        return (
            <div>
                {
                    this.state.isloading === true ?
                        <div id="main">
                            <NavAdmin />
                            <Container className="adminRow4">
                                <Row>
                                    <Col>
                                        <Form className="formIntent">
                                            <h1 className="create">Create Intent</h1>
                                            <div className="form-label">
                                                <label className="label-text">Name Intent: </label>
                                            </div>
                                            <div>
                                                <input
                                                    className="sizeIP1"
                                                    type="text"
                                                    ref="name"
                                                    placeholder="Ask_name"
                                                />
                                            </div>
                                            <hr />
                                            <div className="form-label">
                                                <label className="label-text">Keywords: </label>
                                            </div>
                                            {
                                                this.state.userSays.map((userSay, index) => {
                                                    return (
                                                        <div key={index}>
                                                            <div>
                                                                <input
                                                                    className="sizeIP2"
                                                                    type="text"
                                                                    ref="question"
                                                                    placeholder={`Keyword #${index + 1}`}
                                                                    onChange={this.handleQuestion(index)}
                                                                />
                                                                <Button className="bt-addremove" color="success" style={{ marginLeft: "20px", }} onClick={(e) => this.addQuestion(e)}><FontAwesomeIcon icon="plus" /></Button>
                                                                {
                                                                    index > 0 ?
                                                                        <Button className="bt-addremove" color="danger" style={{ marginLeft: "20px", height: "40px" }} onClick={() => this.removeQuestion(index)}><FontAwesomeIcon icon="minus" /></Button>
                                                                        : ""
                                                                }
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                            <hr />
                                            <div className="form-label">
                                                <label className="label-text">Answers: </label>
                                            </div>
                                            {
                                                this.state.responses.map((answer, index) => {
                                                    return (
                                                        <div key={index}>
                                                            <div>
                                                                <input
                                                                    className="sizeIP2"
                                                                    type="text"
                                                                    ref="answer"
                                                                    onChange={this.handleAnswer(index)}
                                                                    placeholder={`Answer #${index + 1}`}
                                                                />
                                                                <Button className="bt-addremove" color="success" style={{ marginLeft: "20px", }} onClick={(e) => this.addAnswer(e)}><FontAwesomeIcon icon="plus" /></Button>
                                                                {
                                                                    index > 0 ?
                                                                        <Button className="bt-addremove" color="danger" style={{ marginLeft: "20px", height: "40px" }} onClick={() => this.removeAnswer(index)}><FontAwesomeIcon icon="minus" /></Button>
                                                                        : ""
                                                                }
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                            <hr />
                                            {message ? <p className="help3">{message}</p> : null}
                                            <Button className="bt-submit" color="warning" onClick={this.klikPost}>Submit</Button>
                                        </Form>
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
        )
    }
}
const mapStateToProp = (state) => {
    return { T: state.Reducer }
}

export default connect(mapStateToProp, { logout, login })(Fields);