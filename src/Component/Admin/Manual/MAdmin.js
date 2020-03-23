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
import Web1 from "./Image/Web Mali/Web1.jpg"
import Web2 from "./Image/Web Mali/Web2.jpg"
import Web3 from "./Image/Web Mali/Web3.jpg"
import Web4 from "./Image/Web Mali/Web4.jpg"
import Web5 from "./Image/Web Mali/Web5.jpg"
import Web6 from "./Image/Web Mali/Web6.jpg"
import Web7 from "./Image/Web Mali/Web7.jpg"
import Web8 from "./Image/Web Mali/Web8.jpg"
class MAdmin extends Component {
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
                                <h1 className="text-MN" >คู่มือการใช้งาน Web Admission</h1>
                                <div className="manual-page">
                                    <h5 className="text-step">Step 1: เปิด Web Admission ตามลิงก์นี้ <a className="click-here" target="_bank" href="https://b3bot.com">Click Here!</a></h5>
                                    <img src={Web1} alt="Step1" className="line-pic" />
                                    <h5 className="text-step">Step 2:</h5>
                                    <img src={Web2} alt="Step1" className="line-pic" />
                                    <h5 className="text-step">Step 3:</h5>
                                    <img src={Web3} alt="Step1" className="line-pic" />
                                    <h5 className="text-step">Step 4:</h5>
                                    <img src={Web4} alt="Step1" className="line-pic" />
                                    <h5 className="text-step">Step 5:</h5>
                                    <img src={Web5} alt="Step1" className="line-pic" />
                                    <h5 className="text-step">Step 6:</h5>
                                    <img src={Web6} alt="Step1" className="line-pic" />
                                    <h5 className="text-step">Step 7:</h5>
                                    <img src={Web7} alt="Step1" className="line-pic" />
                                    <h5 className="text-step">Step 8:</h5>
                                    <img src={Web8} alt="Step1" className="line-pic" />
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

export default connect(mapStateToProp, { logout, login })(MAdmin);