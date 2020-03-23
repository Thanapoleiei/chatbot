import React, { Component } from 'react'
import { connect } from 'react-redux'
import { logout, login } from "../../Redux/Actions"
import Firebase from 'firebase';
import auth from "../firebase";
import "../Admin.css";
import "./manual.css"
import NavAdmin from "../NavAdmin";
import {
    Row,
    Col
} from "reactstrap";
import LINE from "../../../Image/lineadd.png"
import Dialogflow from "../../../Image/dialogflow.png"
import Mali from "../../../Image/logomali.jpg"
class Manual extends Component {
    constructor(props) {
        super(props)
        this.state = {
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
        let ref = Firebase.database().ref("/");
        ref.on("value", snapshot => {
            const state = snapshot.val();
            this.setState(state);
            this.setState({
                isloading: true
            });
        });
    }

    render() {
        return (
            <div>
                {
                    this.state.isloading === true ?
                        <div id="main">
                            <NavAdmin />
                            <Row className="adminRow3">
                                <Col>
                                    <div className="box-manual">
                                        <a className="link-manual" href="/admin/manual/line" target="_bank">
                                            <img className="image-manual1" src={LINE} alt="LINE"></img>
                                            <p className="text-manual" >คู่มือ LINE Developers</p>
                                        </a>
                                    </div>
                                </Col>
                                <Col>
                                    <div className="box-manual">
                                        <a className="link-manual" href="/admin/manual/dialogflow" target="_bank">
                                            <img className="image-manual1" src={Dialogflow} alt="Dialogflow"></img>
                                            <p className="text-manual" >คู่มือ Dialogflow</p>
                                        </a>
                                    </div>
                                </Col>
                                <Col>
                                    <div className="box-manual">
                                        <a className="link-manual" href="/admin/manual/admin" target="_bank">
                                            <img className="image-manual2" src={Mali} alt="Mali"></img>
                                            <p className="text-manual" >คู่มือ Web Admission</p>
                                        </a>
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
        )
    }
}

const mapStateToProp = (state) => {
    return { T: state.Reducer }
}

export default connect(mapStateToProp, { logout, login })(Manual);