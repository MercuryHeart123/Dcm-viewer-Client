import React,{ Component } from 'react'
import styled from 'styled-components'
import SidebarMenu from './SidebarMenu'


const SidebarNav =  styled.nav`
    background: #252831;
    font-size: 2rem;
    padding-right: 2px;

    display: flex;
    flex-direction: column ; 
    ::-webkit-scrollbar {
        width: 10px;
      }
    ::-webkit-scrollbar-track {
        background: rgb(255, 255, 255);
    }
    ::-webkit-scrollbar-thumb {
        background: #256ce1;
        border-radius: 10px;
      }
    
    ::-webkit-scrollbar-thumb:hover {
        background: #1e5ec5;
        border-radius: 10px;
      }
    
    ::-webkit-scrollbar-thumb:active {
        background: #1e5ec5;
        border-radius: 10px;
      }

`

class Sidebar extends Component{

    constructor(props){
        super(props);
        this.state = {
            SidebarData: ['test', 'train', 'upload', 'csv'],
            child : [],
        }

    }

    ForceUpdate = () => {
        this.state.child.forEach(element => {
            if(element.props['item'] === "upload"){
                element.forceUpdate();
            }
        });
    }


    render(){

        let submenu = this.state.SidebarData.map((item, index) => {

            return <SidebarMenu ref={instance => { this.state.child.push(instance); }} item={item} key={index}/> 

        })

        return (
            <SidebarNav  style={{ height: '92vh', overflowY: "auto" }}>
                {submenu}
            </SidebarNav>

        );
    }
}




export default Sidebar
