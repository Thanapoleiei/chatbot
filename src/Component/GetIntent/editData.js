import React, { Component } from "react"
import {
    Button, Form, Row, Col, Container
} from "reactstrap";
import auth from "../Admin/firebase";
import Firebase from 'firebase';
import { connect } from 'react-redux'
import { logout, login } from "../Redux/Actions"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../CreateIntent/question.css'
import NavAdmin from '../Admin/NavAdmin';
class editData extends Component {
    constructor(props) {
        super(props)
        this.state = {
            text: "",
            userSays: [],
            responses: [],
            isloading: false,
            dataIntents: [],
            dataQuestion: [],
            dataAnswer: [],
            dataKeys: '',
            message: ""
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

        if (this.props.history.location.search.startsWith('?id=')) {
            let query = this.props.history.location.search.split('?id=')
            this.getData(query[1]);
        }
        this.getDate();
    }

    getData = (datakey) => {
        const dataKeys = datakey
        this.setState({
            dataKeys
        })
        let app = Firebase.database().ref(`dataIntent/${datakey}/dataMG`);
        app.on('value', snapshot => {
            const dataIntents = (snapshot.val());
            this.setState({
                dataIntents,
                dataQuestion: dataIntents.userSays,
                dataAnswer: dataIntents.responses[0].messages[0].speech,
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

    klikPost = async () => {
        var rex = /([a-zA-Z])+/g
        var rexThai = /([ก-๑])+/
        if (this.refs.name.value === "" || this.state.responses === "" || this.state.userSays === "") {
            this.setState({
                message: "กรุณากรอกข้อมูลให้ครบสมบูรณ์"
            })
        } else if (rex.test(this.refs.name.value) && !rexThai.test(this.refs.name.value)) {
            await this.setState({
                userSays: this.state.dataQuestion
            })
            let app = Firebase.database().ref(`/dataIntent/${this.state.dataKeys}`);
            app.update({
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
                            speech: this.state.dataAnswer
                        },
                        {
                            type: 0,
                            condition: "",
                            speech: this.state.dataAnswer
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
            window.location.reload()
        } else if (rexThai.test(this.refs.name.value)) {
            this.setState({
                message: "กรุณาใช้ Name Intent ภาษาอังกฤษเท่านั้น"
            })
        }
    };

    handleQuestion = idx => evt => {
        const newuserSays = this.state.dataQuestion.map((userSay, sidx) => {
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

    handleEditQuestion = (indx) => (evt) => {
        let arr = this.state.dataQuestion.map((item, idxin) => {
            if (idxin === indx) {
                return {
                    ...item,
                    data: [
                        {
                            text: evt.target.value,
                            userDefined: false
                        }
                    ]
                }
            } else {
                return item
            }
        })
        this.setState({
            dataQuestion: arr
        })
    }

    addQuestion = e => {
        e.preventDefault()
        this.setState({
            dataQuestion: [
                ...this.state.dataQuestion,
                {
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
                }
            ]
        });
    }

    removeQuestion = (index) => {
        const { dataQuestion } = this.state
        if (Object.keys(dataQuestion).length > 1) {
            this.setState({
                dataQuestion: this.state.dataQuestion.filter((item, ind) => {
                    if (ind === index) {
                        return false
                    }
                    else
                        return true
                })
            })
        } else {
            return false
        }
    }

    handleAnswer = i => e => {
        let arr = this.state.dataAnswer.map((item, index) => {
            if (index === i) {
                return e.target.value
            } else {
                return item
            }
        })
        this.setState({
            dataAnswer: arr
        })
    }

    addAnswer = e => {
        e.preventDefault()
        let dataAnswer = this.state.dataAnswer.concat([''])
        this.setState({
            dataAnswer
        })
    }

    removeAnswer = (index) => {
        const { dataAnswer } = this.state
        if (Object.keys(dataAnswer).length > 1) {
            this.setState({
                dataAnswer: [
                    ...this.state.dataAnswer.slice(0, index),
                    ...this.state.dataAnswer.slice(index + 1)
                ]
            })
        } else {
            return false
        }
    }

    render() {
        const { message } = this.state
        return (
            <div>
                {
                    this.state.isloading === true ?
                        <div id="main">
                            <NavAdmin />
                            <Container className="adminRow4">
                                <Row>
                                    <Col>
                                        <Form className="formEdit">
                                            <h1 className="textED">Edit Intent {this.state.dataIntents.name}</h1>
                                            <div className="form-label">
                                                <label className="label-text2">Name Intent: </label>
                                            </div>
                                            <div>
                                                <input
                                                    className="sizeIP3"
                                                    type="text"
                                                    ref="name"
                                                    placeholder="Ask_name"
                                                    defaultValue={this.state.dataIntents.name}
                                                />
                                            </div>
                                            <hr />
                                            <div className="form-label">
                                                <label className="label-text2">Keywords: </label>
                                            </div>
                                            {
                                                this.state.dataQuestion && this.state.dataQuestion.map((item, index) => {
                                                    return (
                                                        <div key={index}>
                                                            <input
                                                                className="sizeIP4"
                                                                type="text"
                                                                name="question"
                                                                placeholder={`Keyword #${index + 1}`}
                                                                onChange={this.handleEditQuestion(index)}
                                                                value={item.data[0].text}
                                                            />
                                                            <Button className="bt-addremove2" color="success" onClick={(e) => this.addQuestion(e)}><FontAwesomeIcon icon="plus" /></Button>
                                                            <Button className="bt-addremove2" color="danger" onClick={() => this.removeQuestion(index)}><FontAwesomeIcon icon="minus" /></Button>
                                                        </div>
                                                    )
                                                })
                                            }
                                            <hr />
                                            <div className="form-label">
                                                <label className="label-text2">Answers: </label>
                                            </div>
                                            {
                                                this.state.dataAnswer && this.state.dataAnswer.map((item, index) => {
                                                    return (
                                                        <div key={index}>
                                                            <input
                                                                className="sizeIP4"
                                                                type="text"
                                                                name="answer"
                                                                placeholder={`Answer #${index + 1}`}
                                                                value={this.state.dataAnswer[index]}
                                                                onChange={this.handleAnswer(index)}
                                                            />
                                                            <Button className="bt-addremove2" color="success" onClick={(e) => this.addAnswer(e)}><FontAwesomeIcon icon="plus" /></Button>
                                                            <Button className="bt-addremove2" color="danger" onClick={() => this.removeAnswer(index)}><FontAwesomeIcon icon="minus" /></Button>
                                                        </div>
                                                    )
                                                })
                                            }
                                            <hr />
                                            {message ? <p className="help3">{message}</p> : null}
                                            <Button className="bt-submitll" color="warning" onClick={this.klikPost}>Submit</Button>
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
            </div >
        )
    }
}

const mapStateToProp = (state) => {
    return { T: state.Reducer }
}

export default connect(mapStateToProp, { logout, login })(editData);