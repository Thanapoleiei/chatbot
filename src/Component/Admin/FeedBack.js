import React, { Component } from 'react'
import Firebase from 'firebase';
import auth from "../Admin/firebase";
import "./Admin.css";
import "../GetIntent/getdata.css"
import {
    Alert,
    Row,
    Col
} from "reactstrap";
import _ from 'lodash';
import NavAdmin from './NavAdmin';
import { connect } from 'react-redux'
import { logout, login } from "../Redux/Actions"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RelativeTime from 'react-relative-time'
class FeedBack extends Component {
    constructor(props) {
        super(props)
        this.state = {
            feedbacks: [],
            isloading: false,
            updown: false,
            active: false
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
        let app = Firebase.database().ref('dataFeedBack');
        app.on('value', snapshot => {
            this.getData(snapshot.val());
            this.setState({
                isloading: true
            });
        })
    }

    getData = (values) => {
        let feedbacksVal = values;
        let feedbacks = _(feedbacksVal)
            .keys()
            .map(feedbackKey => {
                let cloned = _.clone(feedbacksVal[feedbackKey]);
                cloned.key = feedbackKey;
                return cloned;
            }).value();
        this.setState({
            feedbacks: feedbacks
        });
    }

    sortDescending = () => {
        const { feedbacks } = this.state;
        feedbacks.sort((a, b) => a - b).reverse()
        this.setState({ feedbacks })
        this.setState({
            updown: !this.state.updown
        })
    }

    changIcon = () => {
        this.setState({
            active: true
        })
    }

    render() {
        let feedbackNodes = this.state.feedbacks
            .map((text, i) => {
                return (
                    <div key={i}>
                        <Row>
                            <Col>
                                <span className="textDateF">{text.date}</span>
                                <Alert color="light" className="boxAlert">
                                    <span className="textFall">{text.feedback}</span>
                                    <p className="timeRelative"><RelativeTime value={text.date} /></p>
                                </Alert>
                            </Col>
                        </Row>
                    </div>
                )
            });
        return (
            <div>
                {
                    this.state.isloading === true ?
                        <div id="main">
                            <NavAdmin />
                            <Row className="adminRow1">
                                <Col>
                                    <div className="text-cont-pageadmin3">
                                        <center>
                                            <h1 className="textFA">ข้อเสนอแนะ</h1>
                                            {
                                                this.state.active === false ?
                                                    <p onClick={this.changIcon} className="ic-updown"><FontAwesomeIcon className="text-updown" icon="sort" /></p> :
                                                    <p onClick={this.sortDescending} className="ic-updown">
                                                        {
                                                            this.state.updown === true ?
                                                                <FontAwesomeIcon className="text-updown" icon="sort-up" /> :
                                                                <FontAwesomeIcon className="text-updown" icon="sort-down" />
                                                        }
                                                    </p>
                                            }
                                        </center>
                                        <div className="history-view2">{feedbackNodes.reverse()} </div>
                                    </div>
                                </Col>
                            </Row>
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

export default connect(mapStateToProp, { logout, login })(FeedBack);