import React, { Component } from 'react';
import {
    Col,
    Row,
    Input
} from "reactstrap";
import _ from 'lodash';
import ShowMore from 'react-show-more';
import "./getdata.css";
import { connect } from 'react-redux'
import { logout, login } from "../Redux/Actions"
import Firebase from 'firebase';
import auth from "../Admin/firebase";
import NavAdmin from '../Admin/NavAdmin';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
class getFile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            intents: [],
            isloading: false,
            messages: [],
            search: ''
        };
    }

    setForm = (keys, display, keyword, answer) => {
        return _.zipWith(keys, display, keyword, answer, (keys, display, keyword, answer) => ({ keys, display, keyword, answer }));
    }

    findKeyword = (intents) => {
        const keyword = []
        const answer = []
        const display = []
        const keys = []
        intents.map((item) => {
            keys.push(item.key)
            display.push(item.displayName)
            if (item.trainingPhrases) {
                let key = []
                item.trainingPhrases.forEach(element => {
                    key.push(element.parts[0].text)
                });
                keyword.push(key)
            } else {
                keyword.push(["Fallback"])
            }
            if (!item.messages[0].payload && !item.messages[0].image) {
                if (item.messages[0].text) {
                    answer.push(item.messages[0].text.text[0])
                } else {
                    answer.push(JSON.stringify(item.messages[1].payload))
                    answer.push(item.messages[1].text.text[0])
                }
            }
            else {
                if (item.messages[0].payload) {
                    answer.push(JSON.stringify(item.messages[0].payload))
                } else if (item.messages[0].image) {
                    answer.push(JSON.stringify(item.messages[0].image))
                }
            }
        })
        this.setState({ messages: this.setForm(keys, display, keyword, answer), isloading: true })
    }

    componentDidMount() {
        auth.onAuthStateChanged(user => {
            if (user) {
                this.props.login(user)
            } else {
                this.props.history.push('/login')
            }
        });
        let app = Firebase.database().ref(`intent`);
        app.on('value', snapshot => {
            this.getData(snapshot.val());
        })
    }

    getData = (values) => {
        let intentsVal = values;
        let intents = _(intentsVal)
            .keys()
            .map(intentsKey => {
                let cloned = _.clone(intentsVal[intentsKey]);
                cloned.key = intentsKey;
                return cloned;
            }).value();
        this.setState({
            intents
        }, () => {
            this.findKeyword(intents)
        });
    }

    updateSearch = (e) => {
        this.setState({
            search: e.target.value.substr(0, 20)
        })
    }

    render() {
        const { messages } = this.state;
        let width = window.innerWidth;
        let filterData = messages.filter(item => {
            return item.display.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
                || [item.keyword].join(' ').toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
                || [item.answer].join(' ').toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
        })
        return (
            <div>
                {
                    this.state.isloading === true ?
                        <div id="main">
                            <NavAdmin />
                            <Row className="adminRow2">
                                <Col>
                                    <div className="text-cont-pageadmin2">
                                        <center>
                                            <h1 className="textFA">Intent</h1>
                                            <div>
                                                <Input
                                                    className="sizeSearch"
                                                    type="text"
                                                    placeholder="ค้นหาไฟล์"
                                                    value={this.state.search}
                                                    onChange={this.updateSearch}
                                                >
                                                </Input>
                                            </div>
                                            {
                                                width > 980 ?
                                                    <div>
                                                        <Row className="textMain1">
                                                            <Col xs="3"><p className="textCol">Intent Name</p></Col>
                                                            <Col xs="3"><p className="textCol">Keywords</p></Col>
                                                            <Col xs="3"><p className="textCol">Answers</p></Col>
                                                            <Col xs="2"><p className="textCol">View Details</p></Col>
                                                        </Row>
                                                    </div> : <div>
                                                        <Row className="textMain1">
                                                            <Col xs="7"><p className="textCol">Intent Name</p></Col>
                                                            <Col xs="4"><p className="textCol">View Details</p></Col>
                                                        </Row>
                                                    </div>
                                            }
                                            <Row>
                                                <Col>
                                                    <div className="mongodb-view">
                                                        {
                                                            filterData
                                                                .map((item, index) => {
                                                                    var datakey = item.keys
                                                                    var name = [item.display].join(' ');
                                                                    var questions = [item.keyword].join(' ');
                                                                    var answers = [item.answer].join(' ');
                                                                    return <div key={index} className="formDB">
                                                                        <center>
                                                                            {
                                                                                width > 980 ?
                                                                                    <Row className="textdataDB">
                                                                                        <Col xs="3">
                                                                                            <p className="textOne">{name}.json</p>
                                                                                        </Col>
                                                                                        <Col xs="3">
                                                                                            <ShowMore
                                                                                                lines={3}
                                                                                                more=''
                                                                                                less=''
                                                                                                anchorClass=''
                                                                                            >
                                                                                                <p>{questions}</p>
                                                                                            </ShowMore>
                                                                                        </Col>
                                                                                        <Col xs="3">
                                                                                            <ShowMore
                                                                                                lines={1}
                                                                                                more=''
                                                                                                less=''
                                                                                                anchorClass=''
                                                                                            >
                                                                                                <p>{answers}</p>
                                                                                            </ShowMore>
                                                                                        </Col>
                                                                                        <Col xs="2">
                                                                                            <button className="btn btn-primary btdb2"
                                                                                                onClick={() => {
                                                                                                    this.props.history.push(`/admin/fileintent?id=${datakey}`)
                                                                                                }}
                                                                                            >View</button>
                                                                                        </Col>
                                                                                    </Row> :
                                                                                    <Row className="textdataDB">
                                                                                        <Col xs="7">
                                                                                            <p className="textOne">{name}.json</p>
                                                                                        </Col>
                                                                                        <Col xs="4">
                                                                                            <button className="btn btn-primary btdb2"
                                                                                                onClick={() => {
                                                                                                    this.props.history.push(`/admin/fileintent?id=${datakey}`)
                                                                                                }}
                                                                                            ><FontAwesomeIcon className="fa-fw" icon="eye" /></button>
                                                                                        </Col>
                                                                                    </Row>
                                                                            }
                                                                        </center>
                                                                    </div >
                                                                })
                                                        }
                                                    </div>
                                                </Col>
                                            </Row>
                                        </center>
                                    </div>
                                </Col>
                            </Row>
                        </div > :
                        <div className="spin">
                            <div class="bg"></div>
                            <div class="bg bg2"></div>
                            <div class="bg bg3"></div>
                        </div>
                }
            </div >
        );
    }
}

const mapStateToProp = (state) => {
    return { T: state.Reducer }
}

export default connect(mapStateToProp, { logout, login })(getFile);
