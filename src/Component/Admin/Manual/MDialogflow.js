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
import DIA1 from "./Image/Dialogflow/Dialogflow1.jpg"
import DIA2 from "./Image/Dialogflow/Dialogflow2.jpg"
import DIA3 from "./Image/Dialogflow/Dialogflow3.jpg"
import DIA4 from "./Image/Dialogflow/Dialogflow4.jpg"
import DIA5 from "./Image/Dialogflow/Dialogflow5.jpg"
import DIA6 from "./Image/Dialogflow/Dialogflow6.jpg"
import DIA7 from "./Image/Dialogflow/Dialogflow7.jpg"
import DIA8 from "./Image/Dialogflow/Dialogflow8.jpg"
import DIA9 from "./Image/Dialogflow/Dialogflow9.jpg"
class MDialogflow extends Component {
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
                                <h1 className="text-MN" >คู่มือการใช้งาน Dialogflow</h1>
                                <div className="manual-page">
                                    <h5 className="text-step">Step 1: เปิด Dialogflow ตามลิงก์นี้ <a className="click-here" target="_bank" href="https://dialogflow.cloud.google.com/#/login">Click Here!</a></h5>
                                    <img src={DIA1} alt="Step1" className="line-pic" />
                                    <h5 className="text-step">Step 2:</h5>
                                    <img src={DIA2} alt="Step1" className="line-pic" />
                                    <h5 className="text-step">Step 3:</h5>
                                    <img src={DIA3} alt="Step1" className="line-pic" />
                                    <h5 className="text-step">Step 4:</h5>
                                    <img src={DIA4} alt="Step1" className="line-pic" />
                                    <h5 className="text-step">Step 5:</h5>
                                    <img src={DIA5} alt="Step1" className="line-pic" />
                                    <h5 className="text-step">Step 6:</h5>
                                    <img src={DIA6} alt="Step1" className="line-pic" />
                                    <h5 className="text-step">Step 7: สามารถคัดลอก packageId และ stickerId ตามลิงก์นี้ <a className="click-here" target="_bank" href="https://drive.google.com/file/d/1FjtXYmkh32fEH_P4ypNXrUKF9riwneGE/view?usp=sharing">Sticker!</a></h5>
                                    <div className="platform-line">
                                        <div className="text-open">&#123;</div>
                                        <div className="text-divne1">"line": &#123;</div>
                                        <div className="text-divne2">"type": "sticker",</div>
                                        <div className="text-divne3">"packageId": "1",</div>
                                        <div className="text-divne4">"stickerId": "1"</div>
                                        <div className="text-close1">&#125;</div>
                                        <div className="text-close2">&#125;</div>
                                    </div>
                                    <img src={DIA7} alt="Step1" className="line-pic" />
                                    <h5 className="text-step">Step 8:</h5>
                                    <img src={DIA8} alt="Step1" className="line-pic" />
                                    <div className="formbig-image">
                                        <ui className="platform-image">
                                            <h6 className="descriptions">คำอธิบาย</h6>
                                            <li>type: เป็นตัวกำหนดประเภทของการตอบกลับ ในที่นี้คือ imagemap</li>
                                            <li>baseUrl: Url ของไฟล์รูปภาพ ควรทำให้สามารถเข้าถึงภาพ 5 ขนาดได้ 240px, 300px, 460px, 700px, 1040px โดยใช้รูปแบบ baseUrl/image_width (เช่น https://1.bp.blogspot.com/-U90M8DyKu7Q/W9EtONMCf6I/AAAAAAAAW_4/7L_jB_Rg9oweu2HKhULNdu9WNefw9zf9wCLcBGAs/s1600/ เป็นต้น) ซึ่ง LINE จะเลือกโหลดขนาดภาพให้เหมาะสมกับอุปกรณ์เอง</li>
                                            <li>altText: ข้อความของรูปภาพ จำนวนตัวอักษรสูงสุด 400 ตัวอักษร</li>
                                            <li>baseSize: ขนาดของรูปภาพ</li>
                                            <li className="text-line">width: ความกว้างของรูปภาพ ให้เซ็ตเป็น 1040</li>
                                            <li className="text-line">height: ความสูงของรูปภาพ ให้เซ็ตเป็น 1040</li>
                                            <li>actions: อาร์เรย์ actions ของ Imagemap โดยเราสามารถใส่ action ได้มากสุด 50 actions</li>
                                            <li>label: ป้ายกำกับของ action</li>
                                            <li>linkUri: Url ของเว็บ ใช้ในกรณีที่กำหนด type = uri</li>
                                            <li>text: ข้อความที่จะทำการส่งกลับมาให้ bot ใช้ในกรณีที่กำหนด type = message</li>
                                            <li>area: พื้นที่สำหรับ action</li>
                                            <li className="text-line">x: ตำแหน่งแนวนอนนับจากมุมบนซ้ายของพื้นที่</li>
                                            <li className="text-line">y: ตำแหน่งแนวตั้งนับจากมุมบนซ้ายของพื้นที่</li>
                                            <li className="text-line">width: ความกว้างของพื้นที่ action</li>
                                            <li className="text-line">height: ความสูงของพื้นที่ action</li>
                                        </ui>
                                    </div>
                                    <h5 className="text-step">Step 9:</h5>
                                    <img src={DIA9} alt="Step1" className="line-pic" />
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

export default connect(mapStateToProp, { logout, login })(MDialogflow);