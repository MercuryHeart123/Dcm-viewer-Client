import React,{ Component } from 'react'
import styled from 'styled-components'
import SidebarMenu from './SidebarMenu'


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
            <SidebarNav style={{ height: '92vh', overflowY: "auto" }}>
                {submenu}
            </SidebarNav>

        );
    }
}




export default Sidebar
