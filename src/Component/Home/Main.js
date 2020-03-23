import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import Navigators from "../Navigators/Navigators";
import QR from '../../Image/QRCode.jpg';
import LINE from '../../Image/line.png'
import Facuty from '../PicLink/Faculty'
import "../Home/Home.css";
import 'react-image-lightbox/style.css';
import Lightbox from 'react-image-lightbox';
import Footer from "./Footer";
class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }
  render() {
    const { isOpen } = this.state;
    return (
      <div className="main">
        <Navigators />
        <Container>
          <Row>
            <Col className="title">
              <div className="textXen">
                <span className="centered1">งานรับนักศึกษา</span>
                <span className="centered2">สำหรับผู้สนใจเข้าศึกษาต่อมหาวิทยาลัยสงขลานครินทร์ วิทยาเขตภูเก็ต</span>
              </div>
            </Col>
          </Row>
          <Row className="content-section">
            <Col className="article-1 col-4">
              <div className="qr">
                <h2 className="text-qr">คุยกับน้องมะลิ <span><img src={LINE} alt="icon Line" className="i-line"></img></span></h2>
                <form className="pic-qr">
                  <img onClick={() => this.setState({ isOpen: true })} src={QR} alt="QRcode" className="qr-img"></img>
                  {isOpen && (
                    <Lightbox
                      mainSrc={QR}
                      onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                  )}
                </form>
              </div>
            </Col>
            <Col className="article-2">
              <h2 className="text-course">Faculties - Prince of Songkla University</h2>
              <div className="pic-main">
                <Facuty />
              </div>
            </Col>
          </Row>
        </Container>
        <Footer />
      </div>
    );
  }
}

export default Content;
