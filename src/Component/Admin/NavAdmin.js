import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from 'react-redux'
import { logout, login } from "../Redux/Actions"
import _ from 'lodash';
import Firebase from 'firebase';
import auth from "./firebase";
import "./NavSlide.css";
import "../Navigators/navbar.css";
import {
    Navbar,
    NavItem,
    Nav
} from "reactstrap";
class NavAdmin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            active: false,
            usernames: [],
            isloading: false,
            emailLocal: '',
            countFeedback: "",
            countFallback: "",
            countIntent: ""
        }
    }

    componentDidMount() {
        auth.onAuthStateChanged(user => {
            if (user) {
                this.props.login(user)
                let app = Firebase.database().ref('dataAdmin');
                app.on('value', snapshot => {
                    let usernamesVal = snapshot.val();
                    let usernames = _(usernamesVal)
                        .keys()
                        .map(usernameKey => {
                            let cloned = _.clone(usernamesVal[usernameKey]);
                            cloned.key = usernameKey;
                            return cloned;
                        }).value();
                    this.setState({
                        usernames: usernames,
                        isloading: true
                    });
                    const emailLocal = localStorage.getItem('email')
                    this.setState({
                        emailLocal
                    })
                });
                let app2 = Firebase.database().ref(`intent`);
                app2.on('value', snapshot => {
                    const countIntent = snapshot.val();
                    this.setState({
                        countIntent
                    })
                })
                let app3 = Firebase.database().ref(`dataFallBack`);
                app3.on('value', snapshot => {
                    const countFallback = snapshot.numChildren();
                    this.setState({
                        countFallback
                    })
                })
                let app4 = Firebase.database().ref(`dataFeedBack`);
                app4.on('value', snapshot => {
                    const countFeedback = snapshot.numChildren();
                    this.setState({
                        countFeedback
                    })
                })
            } else {
                this.props.history.push('/login')
            }
        });
    }

    logout = event => {
        event.preventDefault();
        auth.signOut().then(response => {
            localStorage.removeItem('email')
        });
    };

    openNav = () => {
        let width = window.innerWidth;
        if (width > 980) {
            this.setState({
                active: !this.state.active
            })
            document.getElementById("mySidenav").style.width = "280px";
            document.getElementById("main").style.marginLeft = "280px";
        }
        else {
            document.getElementById("mySidenav").style.width = "250px";
        }
    }

    closeNav = () => {
        let width = window.innerWidth;
        if (width > 980) {
            this.setState({
                active: true
            })
            document.getElementById("mySidenav").style.width = "0";
            document.getElementById("main").style.marginLeft = "0";
        }
        else {
            document.getElementById("mySidenav").style.width = "0";
        }
    }

    render() {
        let width = window.innerWidth;
        let userData = this.state.usernames.map(item => {
            if (this.props.T.CurrentUser.email === item.email) {
                const dataSplit = item.username.split(" ")
                const dataSplit2 = item.surname.substring(-1, 2)
                const dataFull = dataSplit[0] + ' ' + dataSplit2 + "."
                return dataFull
            } else {
                return false
            }
        })
        let firstName = this.state.usernames.map(item => {
            if (this.props.T.CurrentUser.email === item.email) {
                const dataSplit = item.username.split(" ")
                const dataSplit2 = dataSplit[0].substring(-1, 1)
                const dataFull = dataSplit2
                return dataFull
            } else {
                return false
            }
        })
        return (
            <div>
                <Navbar className="navbarAdmin" light expand="md">
                    <div id="mySidenav" className="sidenav">
                        <center>
                            <span className="text-Add">ADMIN</span>
                        </center>
                        <span className="closebtn" onClick={this.closeNav}>&#10096;</span>
                        <ul >
                            <div className="profileline">
                                <center>
                                    <li className="text-email3">{firstName}</li>
                                    <li className="text-email2">{userData}</li>
                                </center>
                            </div>
                            <div className="homeline">
                                <li className="listNav"><a href="/admin/create"><FontAwesomeIcon className="icon-nav fa-fw" icon="folder-plus" /> <span className="text-navi">Create</span></a></li>
                                <li className="listNav"><a href="/admin/download"><FontAwesomeIcon className="icon-nav fa-fw" icon="cloud-download-alt" /> <span className="text-navi">Download</span></a></li>
                                <li className="listNav"><a href="/admin/getintent"><FontAwesomeIcon className="icon-nav fa-fw" icon="file-code" /> <span className="text-navi">Intent <span className="iconNum">{String(this.state.countIntent.length).padStart(2, '0')}</span></span></a></li>
                                <li className="listNav"><a href="/admin/feedback"><FontAwesomeIcon className="icon-nav fa-fw" icon="comment-dots" /> <span className="text-navi">Feedback <span className="iconNum">{String(this.state.countFeedback).padStart(2, '0')}</span></span></a></li>
                                <li className="listNav"><a href="/admin/fallback"><FontAwesomeIcon className="icon-nav fa-fw" icon="comment-slash" /> <span className="text-navi">Fallback <span className="iconNum">{String(this.state.countFallback).padStart(2, '0')}</span></span></a></li>
                                <li className="listNav"><a href="/admin/manual"><FontAwesomeIcon className="icon-nav fa-fw" icon="book-reader" /> <span className="text-navi">คู่มือการใช้งาน</span></a></li>
                            </div>
                        </ul>
                    </div>
                    {
                        width > 980 ?
                            this.state.active === true ?
                                <div>
                                    <span style={{ fontSize: "30px" }} className="openNav" onClick={this.openNav}>&#9776;</span>
                                </div>
                                :
                                <div>
                                    <span className="spaceicon" >&emsp;</span>
                                </div>
                            :
                            this.state.active !== true ?
                                <div>
                                    <span style={{ fontSize: "30px" }} className="openNav" onClick={this.openNav}>&#9776;</span>
                                </div>
                                :
                                <div>
                                    <span className="spaceicon" >&emsp;</span>
                                </div>
                    }
                    <Nav className="ml-auto">
                        <NavItem> <a className="text-home" href="/"><FontAwesomeIcon className="icon-nav fa-fw" icon="home" /> Home</a> </NavItem>
                        <NavItem> <a className="text-regis" href="/admin/signup"><FontAwesomeIcon className="icon-nav fa-fw" icon="user-plus" /> Register</a> </NavItem>
                        <NavItem> <p onClick={this.logout} className="text-logout"><FontAwesomeIcon className="icon-nav fa-fw" icon="sign-in-alt" /> Logout</p> </NavItem>
                    </Nav>
                </Navbar>
            </div >
        );
    }
}

const mapStateToProp = (state) => {
    return { T: state.Reducer }
}

export default connect(mapStateToProp, { logout, login })(NavAdmin);

