import React, { Component } from 'react';
import {
    Col, Row
} from "reactstrap";
import "./getdata.css";
import "../Admin/Admin.css";
import { connect } from 'react-redux'
import { logout, login } from "../Redux/Actions"
import _ from 'lodash';
import Firebase from 'firebase';
import auth from "../Admin/firebase";
import NavAdmin from '../Admin/NavAdmin';
class getFileIntent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            intents: [],
            messages: [],
            isloading: false
        };
    }

    set_form = (display, keyword, answer) => {
        return _.zipWith(display, keyword, answer, (display, keyword, answer) => ({ display, keyword, answer }));
    }

    find_keyword = (intents) => {
        const keyword = []
        const answer = []
        const display = []
        display.push(intents.displayName)
        if (intents.trainingPhrases) {
            let key = []
            intents.trainingPhrases.forEach(element => {
                key.push(element.parts[0].text)
            });
            keyword.push(key)
        } else {
            keyword.push(["Fallback"])
        }
        if (intents.messages) {
            let key = []
            intents.messages.forEach(element => {
                key.push(JSON.stringify(element))
            });
            answer.push(key)
        }
        this.setState({ messages: this.set_form(display, keyword, answer), isloading: true })
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
            let app = Firebase.database().ref(`intent/${query[1]}`);
            app.on('value', snapshot => {
                const intents = (snapshot.val());
                this.setState({
                    intents
                }, () => {
                    this.find_keyword(intents)
                });
            })
        }
    }

    render() {
        return (
            <div>
                {
                    this.state.isloading === true ?
                        <div id="main">
                            <NavAdmin />
                            <Row className="adminRow1">
                                <Col>
                                    {
                                        this.state.messages.map((item, i) => {
                                            return <div className="text-cont-pageadmin3">
                                                <center>
                                                    <h1 className="textMG">Intent {item.display}</h1>
                                                    <Row className="textMain2">
                                                        <Col><p className="textCol">Keywords</p></Col>
                                                        <Col><p className="textCol">Answers</p></Col>
                                                    </Row>
                                                </center>
                                                <div className="mongodb-view2">
                                                    <Row className="textdataDB2">
                                                        <Col>
                                                            {
                                                                item.keyword.map((item, i) => {
                                                                    return <div>
                                                                        {i + 1}.) {item}
                                                                    </div>
                                                                })
                                                            }
                                                        </Col>
                                                        <Col>
                                                            {
                                                                item.answer.map((item, i) => {
                                                                    return <div>
                                                                        <p>{i + 1}.) {item}</p>
                                                                        <br />
                                                                    </div>
                                                                })
                                                            }
                                                        </Col>
                                                    </Row>
                                                </div></div>
                                        })
                                    }
                                </Col>
                            </Row>
                        </div > :
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

export default connect(mapStateToProp, { logout, login })(getFileIntent);