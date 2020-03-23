import React, { Component } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import "./navbar.css";
import auth from "../Admin/firebase/";
import { connect } from 'react-redux'
import { logout, login } from "../Redux/Actions"
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignInAlt,
  faComments,
  faUserCircle,
  faHandPointRight,
  faCommentDots,
  faSort,
  faSortUp,
  faSortDown,
  faPlus,
  faMinus,
  faHome,
  faFolderPlus,
  faHistory,
  faCloudDownloadAlt,
  faCommentSlash,
  faUserPlus,
  faEye,
  faEdit,
  faFileDownload,
  faTrashAlt,
  faBookReader,
  faFileCode
} from "@fortawesome/free-solid-svg-icons";
library.add(
  faSignInAlt,
  faComments,
  faUserCircle,
  faHandPointRight,
  faCommentDots,
  faSort,
  faSortUp,
  faSortDown,
  faPlus,
  faMinus,
  faHome,
  faFolderPlus,
  faHistory,
  faCloudDownloadAlt,
  faCommentSlash,
  faUserPlus,
  faEye,
  faEdit,
  faFileDownload,
  faTrashAlt,
  faBookReader,
  faFileCode
);

class Navigators extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      emailLocal: ''
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.props.login(user)
      }
    });
    const emailLocal = localStorage.getItem('email')
    this.setState({
      emailLocal
    })
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    return (
      <div>
        <Navbar className="bgnavbar" light expand="md">
          <NavbarBrand href="/">
            <span className="text-pu">P</span>
            <span className="text-s">S</span>
            <span className="text-pu">U</span>
            <span className="text-pkt">PHUKET</span>
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/" className="text-nav">
                  Home
                </NavLink>
              </NavItem>
              <NavItem>
                {
                  this.state.emailLocal === null ?
                    <NavLink href="/login" className="text-nav">
                      Admin Login <FontAwesomeIcon icon="sign-in-alt" />
                    </NavLink> :
                    <NavLink href="/admin/download" className="text-nav">
                      Admin Login <FontAwesomeIcon icon="sign-in-alt" />
                    </NavLink>
                }
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProp = (state) => {
  return { T: state.Reducer }
}

export default connect(mapStateToProp, { logout, login })(Navigators);
