import React, {useRef, Component, Route} from 'react'
import axios, {post} from 'axios';
import { Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink } from './NavbarElements'
import { withRouter } from "react-router-dom";
import Dropdown from './dropdown'

class Navbars extends Component {

    constructor(props){
        super(props);
        this.myRef = React.createRef();
        this.state = {
            selected: 'Choose Me'
        }
        
    }


    onButtonUpload = (e) =>{
        let files = e.target.files;
        let reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = (e) => {

            const url = 'http://localhost:8080/upload'
            const formData = {file:e.target.result};
            const headers = {
                'Content-Type': 'application/json'
              }
            post(url, formData, {
                headers: headers
            })

        }
    }
    onButtonClick = () => {
        // `current` points to the mounted file input element
        this.myRef.current.click();

      };


    render(){
        return (
            <>
                <Nav>
                    <NavLink to="/">
                        <h1>DCM Viewer</h1>
                    </NavLink>
                    <Bars />
                    <NavMenu>
                        <NavLink to="/doc" acticeStyle>
                            Document
                        </NavLink>
                        <NavLink to="/about" acticeStyle>
                            About
                        </NavLink>
                        <NavLink to="/contact" acticeStyle>
                            Contact
                        </NavLink>
    
                    </NavMenu>
                    <NavBtn>

                        <input type='file' id='file' onChange={this.onButtonUpload} ref={this.myRef} style={{display: 'none'}}/>
                        <NavBtnLink  onClick={this.onButtonClick}>
                            Upload
                        </NavBtnLink>
                    </NavBtn>
                </Nav>
            </>
        )

    }
}
const Navbar = withRouter(Navbars);

export default Navbar
