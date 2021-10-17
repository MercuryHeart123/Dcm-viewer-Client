import React, {Component} from 'react'
import {post} from 'axios';
import { Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink } from './NavbarElements'
import { withRouter } from "react-router-dom";


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
        reader.onload = async(e) => {

            const url = 'http://localhost:8080/upload'
            const formData = {file:e.target.result};
            const headers = {
                'Content-Type': 'application/json'
              }
            await post(url, formData, {
                headers: headers
            }).then(alert("Your file has been uploaded!")).then(this.props.reloadCallback()) //recall api to list new update



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
                        <h1 style={{fontSize:'1.8vw'}}>DCM Viewer</h1>
                    </NavLink>
                    <Bars />
                    <NavMenu style={{fontSize:'0.9vw'}}>
                        <NavLink to="/doc" >
                            Document
                        </NavLink>
                        <NavLink to="/about" >
                            About
                        </NavLink>
                        <NavLink to="/contact" >
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
