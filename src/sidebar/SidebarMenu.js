import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import * as RiIcons from 'react-icons/ri'
const SidebarLink = styled(Link)`

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
            click: false
        }
      }

    showSubnav = () => this.setState({
        subNav: !this.state.subNav
    })

    sendBackIndexLocal = () =>{
        this.props.callbackLocalIndex(this.props.indexLocal)
    }

    sendBackIndexUpload = () =>{
        this.props.callbackUploadIndex(this.props.indexUpload)
    }
    
    render(){
        return (
            <>  
            
                <SidebarLink to={this.props.item.path} onClick={this.props.item.subNav && this.showSubnav}>
                    <div>
                        {this.props.item.subNav && this.state.subNav ? this.props.item.ActiveIcon: this.props.item.subNav ? this.props.item.idleIcon : null}
                        <SidebarLabel>{this.props.item.title}</SidebarLabel>
                    </div>
                </SidebarLink>
                {this.state.subNav && this.props.item.subNav.map((item, index) => {
                    if(item.path.search('local')>=0 && this.props.indexLocal > index){
                        return (
                            <DropdownLink to={item.path} key={index}>
                                {item.idleIcon}
                                <SidebarLabel>{item.title}</SidebarLabel>
                            </DropdownLink>
                        )
                    }
                    if(item.path.search('upload')>=0 && this.props.indexUpload > index){
                        return (
                            <DropdownLink to={item.path} key={index}>
                                {item.idleIcon}
                                <SidebarLabel>{item.title}</SidebarLabel>
                            </DropdownLink>
                        )
                    }
                })}
                {this.state.subNav && this.props.item.title.search('Local') >=0 && this.props.indexLocal < this.props.item.len &&

                        <DropdownLink style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingTop: '0'
                            
                        }} onClick={this.sendBackIndexLocal}>
                            <RiIcons.RiArrowDownSLine />
                        </DropdownLink>
                }
                {this.state.subNav && this.props.item.title.search('Upload') >=0 && this.props.indexUpload < this.props.item.len &&

                    <DropdownLink style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingTop: '0'
                        
                    }} onClick={this.sendBackIndexUpload}>
                        <RiIcons.RiArrowDownSLine />
                    </DropdownLink>

                }

    
            </>
        )
    }
}


export default SidebarMenu
