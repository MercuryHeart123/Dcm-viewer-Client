import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import * as RiIcons from 'react-icons/ri'
import Sidebar_nested from './Sidebar_nested'
const SidebarLink = styled.span`

    display: flex;
    color: #256CE1;
    justify-content: space-between;
    align-item: center;
    padding: 20px;
    list-style: none;
    height: 60px;
    text-decoration: none;
    font-size: 18px;


    &:hover{
        background: #252831;
        border-left: 4px solid #632ce4;
        cursor: pointer;
    }
`

const SidebarLabel = styled.span`
    margin-left: 16px;
`
const DropdownLink = styled(Link)`
    display: flex;
    background: #414757;
    height: 60px;
    padding-top: 1rem;
    padding-left: 3rem;
    padding-right: 5rem;
    align-item: center;
    text-decoration: none;
    color: #256CE1;
    font-size: 18px;
    &:hover{
        background: #252831;
        border-left: 4px solid #632ce4;
        cursor: pointer;
    }
`
const Dropdown = styled.span`
display: flex;
background: #414757;
height: 60px;
padding-top: 1rem;
padding-left: 3rem;
padding-right: 5rem;
align-item: center;
text-decoration: none;
color: #256CE1;
font-size: 18px;
&:hover{
    background: #252831;
    border-left: 4px solid #632ce4;
    cursor: pointer;
}
`


class SidebarMenu extends Component{

    constructor(props) {
        super(props);
        this.state = {
            subNav: false,

        }
      }

    showSubnav = () => this.setState({
        subNav: !this.state.subNav
    })

    sendBackIndexLocal = () =>{

        this.props.callbackLocalIndex()
    }

    sendBackIndexUpload = () =>{
        this.props.callbackUploadIndex()
    }
    
    render(){
        return (
            <>  
            
                <SidebarLink onClick = {this.props.item.subNav && this.showSubnav}>
                    <div>
                        {/* 
                            if have subNav and state of subnav is true will return active icon 
                            else if only have subnav will return idle icon 
                            else return null
                        */}
                        {this.props.item.subNav && this.state.subNav ? this.props.item.ActiveIcon: this.props.item.subNav ? this.props.item.idleIcon : null} 
                        <SidebarLabel>{this.props.item.title}</SidebarLabel>
                    </div>
                </SidebarLink>
                {console.log(this.props.item.subNav )}
                <Sidebar_nested item={this.props.item.subNav} firstcall={true} title ={''} pad={2} presub={this.state.subNav}/>

                {this.state.subNav && this.props.item.title.search('Local') >=0 && this.props.indexLocal < this.props.item.MaxIndex &&

                        <Dropdown style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingTop: '0'
                            
                        }} onClick={this.sendBackIndexLocal}>
                            <RiIcons.RiArrowDownSLine />
                            {` ${this.props.item.MaxIndex - this.props.indexLocal} Left`}
                        </Dropdown>
                }
                {this.state.subNav && this.props.item.title.search('Upload') >=0 && this.props.indexUpload < this.props.item.MaxIndex &&

                    <Dropdown style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingTop: '0'
                        
                    }} onClick={this.sendBackIndexUpload}>
                        <RiIcons.RiArrowDownSLine />
                        {` ${this.props.item.MaxIndex - this.props.indexUpload} Left`}
                    </Dropdown>

                }

    
            </>
        )
    }
}


export default SidebarMenu
