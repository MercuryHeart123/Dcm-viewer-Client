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
            testindexLocal: 5,
            trainindexLocal: 5,
            indexUpload: 5,
        }

    }
    updateData = (testindexLocal, trainindexLocal, indexUpload) => {
        api.pending(testindexLocal, trainindexLocal, indexUpload)
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

    changeTestIndexLocal = () => {
        this.state.testindexLocal += 5;
        this.updateData(this.state.testindexLocal, this.state.trainindexLocal, this.state.indexUpload);
    }

    changeTrainIndexLocal = () => {
        this.state.trainindexLocal += 5;
        this.updateData(this.state.testindexLocal, this.state.trainindexLocal, this.state.indexUpload);
    }


    changeIndexUpload = () => {
        this.state.indexUpload += 5;
        
        this.updateData(this.state.testindexLocal, this.state.trainindexLocal, this.state.indexUpload);

    }

    componentDidMount(){
        this.updateData(this.state.testindexLocal, this.state.trainindexLocal, this.state.indexUpload);
    }

    render(){
        if(!this.state.SidebarData.length)
            return null;

        let submenu = this.state.SidebarData.map((item) => {

            return <SidebarMenu item={item} TestindexLocal={this.state.testindexLocal} indexUpload={this.state.indexUpload}
                    TrainindexLocal={this.state.trainindexLocal} callbackTrainindexLocal={this.changeTrainIndexLocal} 
                    callbackTestLocalIndex={this.changeTestIndexLocal} callbackUploadIndex={this.changeIndexUpload}/> 

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
