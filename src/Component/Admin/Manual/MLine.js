import React, { Component } from 'react'
import { connect } from 'react-redux'
import { logout, login } from "../../Redux/Actions"
import Firebase from 'firebase';
import auth from "../firebase";
import "../Admin.css";
import "./manual.css"
import {
    Row,
    Col,
} from "reactstrap";
import LINE1 from "./Image/Line/Line1.jpg"
import LINE2 from "./Image/Line/Line2.jpg"
import LINE3 from "./Image/Line/Line3.jpg"
import LINE4 from "./Image/Line/Line4.jpg"
import LINE5 from "./Image/Line/Line5.jpg"
import LINE6 from "./Image/Line/Line6.jpg"
import LINE7 from "./Image/Line/Line7.jpg"
import LINE8 from "./Image/Line/Line8.jpg"
import LINE9 from "./Image/Line/Line9.jpg"
import LINE10 from "./Image/Line/Line10.jpg"
import LINE11 from "./Image/Line/Line11.jpg"
import LINE12 from "./Image/Line/Line12.jpg"
import LINE13 from "./Image/Line/Line13.jpg"
import LINE14 from "./Image/Line/Line14.jpg"
import LINE15 from "./Image/Line/Line15.jpg"
import LINE16 from "./Image/Line/Line16.jpg"
import LINE17 from "./Image/Line/Line17.jpg"
class MLine extends Component {
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
        let ref = Firebase.database().ref("dataAdmin");
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
                        <Row className="adminRow3">
                            <Col>
                                <h1 className="text-MN" >คู่มือการใช้งาน LINE Developers</h1>
                                <div className="manual-page">
                                    <h5 className="text-step">Step 1: เปิด LINE Developers ตามลิงก์นี้ <a className="click-here" target="_bank" href="https://developers.line.biz/en/">Click Here!</a></h5>
                                    <img src={LINE1} alt="Step1" className="line-pic" />
                                    <h5 className="text-step">Step 2: </h5>
                                    <img src={LINE2} alt="Step1" className="line-pic" />
                                    <h5 className="text-step">Step 3: </h5>
                                    <img src={LINE3} alt="Step1" className="line-pic" />
                                    <h5 className="text-step">Step 4: </h5>
                                    <img src={LINE4} alt="Step1" className="line-pic" />
                                    <h5 className="text-step">Step 5: </h5>
                                    <img src={LINE5} alt="Step1" className="line-pic" />
                                    <h5 className="text-step">Step 6: </h5>
                                    <img src={LINE6} alt="Step1" className="line-pic" />
                                    <h5 className="text-step">Step 7: </h5>
                                    <img src={LINE7} alt="Step1" className="line-pic" />
                                    <h5 className="text-step">Step 8: </h5>
                                    <img src={LINE8} alt="Step1" className="line-pic" />
                                    <h5 className="text-step">Step 9: </h5>
                                    <img src={LINE9} alt="Step1" className="line-pic" />
                                    <h5 className="text-step">Step 10: </h5>
                                    <img src={LINE10} alt="Step1" className="line-pic" />
                                    <h5 className="text-step">Step 11: </h5>
                                    <img src={LINE11} alt="Step1" className="line-pic" />
                                    <h5 className="text-step">Step 12: </h5>
                                    <img src={LINE12} alt="Step1" className="line-pic" />
                                    <h5 className="text-step">Step 13: </h5>
                                    <img src={LINE13} alt="Step1" className="line-pic" />
                                    <h5 className="text-step">Step 14: </h5>
                                    <img src={LINE14} alt="Step1" className="line-pic" />
                                    <h5 className="text-step">Step 15: </h5>
                                    <img src={LINE15} alt="Step1" className="line-pic" />
                                    <h5 className="text-step">Step 16: </h5>
                                    <img src={LINE16} alt="Step1" className="line-pic" />
                                    <h5 className="text-step">Step 17: </h5>
                                    <img src={LINE17} alt="Step1" className="line-pic" />
                                </div>
                            </Col>
                        </Row> :
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

export default connect(mapStateToProp, { logout, login })(MLine);