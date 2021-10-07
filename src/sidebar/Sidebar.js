import React,{ Component } from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import SidebarMenu from './SidebarMenu'
import api from './SidebarData';
import { Scrollbars } from 'react-custom-scrollbars-2' 

const SidebarNav =  styled.nav`
    background: #252831;
    font-size: 2rem;
    padding-right: 2px;
    min-height: 100vh;
    display: flex;
    flex-direction: column ; 

`

class Sidebar extends Component{

    constructor(props){
        super(props);
        this.state = {
            SidebarData: [],
            indexLocal: 2,
            indexUpload: 2,
        }

    }

    changeIndexLocal = (index) => {
        this.setState({
            indexLocal: index + 2
        })
        console.log(this.state.indexLocal);
    }

    changeIndexUpload = (index) => {
        this.setState({
            indexUpload: index + 2
        })
        console.log(this.state.indexLocal);
    }

    componentDidMount(){
        api.pending()
          .then((response) => {
              let fileList = response;

              this.setState({
                    SidebarData: fileList,
              });
          })
    }

    render(){
        if(!this.state.SidebarData.length)
            return null;

        let submenu = this.state.SidebarData.map((item) => {
            return <SidebarMenu item={item} indexLocal={this.state.indexLocal} indexUpload={this.state.indexUpload}
                    callbackLocalIndex={this.changeIndexLocal} callbackUploadIndex={this.changeIndexUpload}/> 

        })

        return (
            <Scrollbars style={{ width:'300px', height: '91vh'}}>
                <SidebarNav >
                    {submenu}
                </SidebarNav>
            </Scrollbars>

        );
    }
}




export default Sidebar
