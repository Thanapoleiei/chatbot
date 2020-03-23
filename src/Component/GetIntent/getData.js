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
class getData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataIntents: [],
            isloading: false,
            downloads: [],
            search: ''
        };
    }

    componentDidMount() {
        auth.onAuthStateChanged(user => {
            if (user) {
                this.props.login(user)
            } else {
                this.props.history.push('/login')
            }
        });
        let app = Firebase.database().ref('dataIntent');
        app.on('value', snapshot => {
            this.getData(snapshot.val());
            this.setState({
                isloading: true
            });
        })
    }

    getData = (values) => {
        let dataIntentsVal = values;
        let dataIntents = _(dataIntentsVal)
            .keys()
            .map(dataIntentKey => {
                let cloned = _.clone(dataIntentsVal[dataIntentKey]);
                cloned.key = dataIntentKey;
                return cloned;
            }).value();
        this.setState({
            dataIntents: dataIntents
        });
    }

    updateSearch = (e) => {
        this.setState({
            search: e.target.value.substr(0, 20)
        })
    }

    render() {
        const { dataIntents } = this.state;
        let width = window.innerWidth;
        let filterData = dataIntents.filter((item) => {
            return item.dataMG.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
                || item.date.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
                || item.dataMG.userSays[0].data[0].text.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
                || item.dataMG.responses[0].messages[0].speech.join(' ').toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
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
                                            <h1 className="textFA">File Intent</h1>
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
                                                            <Col xs="2"><p className="textCol">File Name</p></Col>
                                                            <Col xs="2"><p className="textCol">Keywords</p></Col>
                                                            <Col xs="2"><p className="textCol">Answers</p></Col>
                                                            <Col xs="2"><p className="textCol">Time Upload</p></Col>
                                                            <Col xs="4"><p className="textCol">Download File</p></Col>
                                                        </Row>
                                                    </div> : <div>
                                                        <Row className="textMain1">
                                                            <Col xs="4"><p className="textCol">File Name</p></Col>
                                                            <Col xs="4"><p className="textCol">Time Upload</p></Col>
                                                            <Col xs="3"><p className="textCol">Download File</p></Col>
                                                        </Row>
                                                    </div>
                                            }
                                            <Row>
                                                <Col>
                                                    <div className="mongodb-view">
                                                        {
                                                            filterData
                                                                .reverse()
                                                                .map((item, index) => {
                                                                    var datakey = item.key
                                                                    var name = [item.dataMG.name].join(' ');
                                                                    var questions = [item.dataMG.userSays[0].data[0].text].join(' ');
                                                                    var answers = [item.dataMG.responses[0].messages[0].speech].join(' ');
                                                                    var date = [item.date].join(' ');
                                                                    return <div key={index} className="formDB">
                                                                        <center>
                                                                            {
                                                                                width > 980 ?
                                                                                    <Row className="textdataDB">
                                                                                        <Col xs="2">
                                                                                            <p className="textOne">{name}.json</p>
                                                                                        </Col>
                                                                                        <Col xs="2">
                                                                                            <ShowMore
                                                                                                lines={3}
                                                                                                more=''
                                                                                                less=''
                                                                                                anchorClass=''
                                                                                            >
                                                                                                <p>{questions}</p>
                                                                                            </ShowMore>
                                                                                        </Col>
                                                                                        <Col xs="2">
                                                                                            <ShowMore
                                                                                                lines={2}
                                                                                                more=''
                                                                                                less=''
                                                                                                anchorClass=''
                                                                                            >
                                                                                                <p>{answers}</p>
                                                                                            </ShowMore>
                                                                                        </Col>
                                                                                        <Col xs="2">
                                                                                            <ShowMore
                                                                                                lines={1}
                                                                                                more=''
                                                                                                less=''
                                                                                                anchorClass=''
                                                                                            >
                                                                                                <p className="textSecond">{date}</p>
                                                                                            </ShowMore>
                                                                                        </Col>
                                                                                        <Col xs="4">
                                                                                            <button className="btn btn-primary btdb"
                                                                                                onClick={() => {
                                                                                                    this.props.history.push(`/admin/intent?id=${datakey}`)
                                                                                                }}
                                                                                            >View</button>
                                                                                            <button style={{ marginLeft: "20px" }} className="btn btn-info btdb" onClick={() => {
                                                                                                this.props.history.push(`/admin/edit?id=${datakey}`)
                                                                                            }}>Edit</button>
                                                                                            <button style={{ marginLeft: "20px" }} className="btn btn-warning btdb" onClick={() => {
                                                                                                let filename = `${item.dataMG.name}.json`;
                                                                                                let contentType = "application/json;charset=utf-8;";
                                                                                                let blob = new Blob([decodeURIComponent(encodeURI(JSON.stringify(item.dataMG)))], { type: contentType })
                                                                                                let url = window.URL.createObjectURL(blob);
                                                                                                let a = document.createElement('a');
                                                                                                a.href = url;
                                                                                                a.download = filename;
                                                                                                a.click();
                                                                                            }}>Download</button>
                                                                                            <button style={{ marginLeft: "20px" }} className="btn btn-danger btdb" onClick={() => {
                                                                                                var firebaseRef = Firebase.database().ref(`dataIntent/${datakey}`);
                                                                                                firebaseRef.remove()
                                                                                                    .then(() => {
                                                                                                        alert(`Delete ${item.dataMG.name}.json Successful!! `)
                                                                                                    }).catch((error) => {
                                                                                                        console.log(error.messages);
                                                                                                    })
                                                                                            }}>Delete</button>
                                                                                        </Col>
                                                                                    </Row> :
                                                                                    <Row className="textdataDB">
                                                                                        <Col xs="4">
                                                                                            <p className="textOne">{name}.json</p>
                                                                                        </Col>
                                                                                        <Col xs="4">
                                                                                            <p className="textSecond">{date}</p>
                                                                                        </Col>
                                                                                        <Col xs="3">
                                                                                            <button className="btn btn-primary btdb"
                                                                                                onClick={() => {
                                                                                                    this.props.history.push(`/admin/intent?id=${datakey}`)
                                                                                                }}
                                                                                            ><FontAwesomeIcon className="fa-fw" icon="eye" /></button>
                                                                                            <button className="btn btn-info btdb" onClick={() => {
                                                                                                this.props.history.push(`/admin/edit?id=${datakey}`)
                                                                                            }}><FontAwesomeIcon className="fa-fw" icon="edit" /></button>
                                                                                            <button className="btn btn-warning btdb" onClick={() => {
                                                                                                let filename = `${item.dataMG.name}.json`;
                                                                                                let contentType = "application/json;charset=utf-8;";
                                                                                                let blob = new Blob([decodeURIComponent(encodeURI(JSON.stringify(item.dataMG)))], { type: contentType })
                                                                                                let url = window.URL.createObjectURL(blob);
                                                                                                let a = document.createElement('a');
                                                                                                a.href = url;
                                                                                                a.download = filename;
                                                                                                a.click();
                                                                                            }}><FontAwesomeIcon className="fa-fw" icon="file-download" /></button>
                                                                                            <button className="btn btn-danger btdb" onClick={() => {
                                                                                                var firebaseRef = Firebase.database().ref(`dataIntent/${datakey}`);
                                                                                                firebaseRef.remove()
                                                                                                    .then(() => {
                                                                                                        alert(`Remove ${item.dataMG.name}.json Successful!! `)
                                                                                                    }).catch((error) => {
                                                                                                        console.log(error.messages);
                                                                                                    })
                                                                                            }}><FontAwesomeIcon className="fa-fw" icon="trash-alt" /></button>
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

export default connect(mapStateToProp, { logout, login })(getData);
