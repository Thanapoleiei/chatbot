import React, { Component } from "react";
import FHT from "../../Image/FHT.jpg"
import COC from "../../Image/COC.jpg"
import TE from "../../Image/TE.jpg"
import FIS from "../../Image/FIS.jpg"
import "./Faculty.css";
import { Row, Col } from "reactstrap";

class Footer extends Component {
    render() {
        return (
            <div>
                <Row>
                    <Col>
                        <img className="pic-link" src={FHT} alt="FHT"></img>
                        <div className="text-box">
                            <a href="http://www.fht.psu.ac.th/fht/index.php/th/" target="blank">
                                <p className="text-link2" >Faculty of Hospitality and Tourism
                                    <br></br>คณะการบริการและการท่องเที่ยว
                                    </p>
                            </a>
                        </div>
                    </Col>
                    <Col>
                        <img className="pic-link" src={FIS} alt="FIS"></img>
                        <div className="text-box">
                            <a href="https://www.fis.psu.ac.th/en/" target="blank">
                                <p className="text-link2" >Faculty of International Studies
                                <br></br>คณะวิเทศศึกษา
                                </p>
                            </a>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <img className="pic-link" src={TE} alt="TE"></img>
                        <div className="text-box">
                            <a href="http://www.te.psu.ac.th/webte2015/" target="blank">
                                <p className="text-link2" >Faculty of Technology and Environment
                               <br></br>คณะเทคโนโลยีและสิ่งแวดล้อม
                               </p>
                            </a>
                        </div>
                    </Col>
                    <Col>
                        <img className="pic-link" src={COC} alt="COC"></img>
                        <div className="text-box">
                            <a href="computing.psu.ac.th/th/" target="blank">
                                <p className="text-link2" >College Of computing
                               <br></br>วิทยาลัยการคอมพิวเตอร์
                               </p>
                            </a>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Footer;