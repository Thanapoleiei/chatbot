import React, { Component } from 'react';
import {
    Col, Row
} from "reactstrap";
import "./getdata.css";
import "../Admin/Admin.css";
import { connect } from 'react-redux'
import { logout, login } from "../Redux/Actions"
import Firebase from 'firebase';
import auth from "../Admin/firebase";
import NavAdmin from '../Admin/NavAdmin';
class getIntent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataIntents: [],
            dataQuestion: [],
            dataAnswer: []
        };
    }

    getData = (datakey) => {
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
    }

    render() {
        const dataAns = this.state.dataAnswer.map((item, i) => {
            var text1 = [item].join('')
            return <div key={i}>
                {i + 1}.) {text1}
            </div>
        })
        const dataQues = this.state.dataQuestion.map((item, i) => {
            const text1 = [item.data[0].text].join(' ');
            return <div key={i}>
                {i + 1}.) {text1}
            </div>
        })
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
                                            <h1 className="textMG">Intent {this.state.dataIntents.name}</h1>
                                            <Row className="textMain2">
                                                <Col><p className="textCol">Keywords</p></Col>
                                                <Col><p className="textCol">Answers</p></Col>
                                            </Row>
                                        </center>
                                        <div className="mongodb-view2">
                                            <Row className="textdataDB2">
                                                <Col>
                                                    {dataQues}
                                                </Col>
                                                <Col>
                                                    {dataAns}
                                                </Col>
                                            </Row>
                                        </div>
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
            </div>
        );
    }
}

const mapStateToProp = (state) => {
    return { T: state.Reducer }
}

export default connect(mapStateToProp, { logout, login })(getIntent);