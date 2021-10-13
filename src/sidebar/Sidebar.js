import React,{ Component } from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import SidebarMenu from './SidebarMenu'
import api from './SidebarData';


const SidebarNav =  styled.nav`
    background: #252831;
    font-size: 2rem;
    padding-right: 2px;

    ::-webkit-scrollbar { width: 0 !important }
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
    updateData = (indexLocal, indexUpload) => {
        api.pending(indexLocal, indexUpload)
          .then((response) => {
              let fileList = response;

              this.setState({
                    SidebarData: fileList,
              });
          })
    }

    ForceUpdate = () => {
        this.state.indexUpload += 1;
        this.updateData(this.state.indexUpload);
    }

    changeIndexLocal = () => {
        this.state.indexLocal += 2;
        this.updateData(this.state.indexLocal, this.state.indexUpload);

    }

    changeIndexUpload = () => {
        this.state.indexUpload += 2;
        
        this.updateData(this.state.indexLocal, this.state.indexUpload);

    }

    componentDidMount(){
        this.updateData(this.state.indexLocal, this.state.indexUpload);
    }

    render(){
        if(!this.state.SidebarData.length)
            return null;

        let submenu = this.state.SidebarData.map((item) => {

            return <SidebarMenu item={item} indexLocal={this.state.indexLocal} indexUpload={this.state.indexUpload}
                    callbackLocalIndex={this.changeIndexLocal} callbackUploadIndex={this.changeIndexUpload}/> 

        })

        return (
            // <Scrollbars style={{ width:'20vw', height: '91vh'}}>
                <SidebarNav style={{ height: '92vh', overflowY: "auto" }}>
                    {submenu}
                </SidebarNav>
            // </Scrollbars>

        );
    }
}




export default Sidebar
