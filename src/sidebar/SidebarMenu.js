import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import * as RiIcons from 'react-icons/ri'
import * as BsIcons from 'react-icons/bs'
import Sidebar_nested from './Sidebar_nested'
import api from './SidebarData';

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
            title: "",
            idleIcon: <BsIcons.BsPlusSquare/>,
            ActiveIcon: <BsIcons.BsPlusSquareFill/>,
            MaxIndex: 0,
            StartIndex: 0,
            EndIndex: 5,
            Data : [],
        }
      }

    showSubnav = () => this.setState({
        subNav: !this.state.subNav
    })

    IncreaseIndex = () => {
        this.state.StartIndex = this.state.EndIndex;
        this.state.EndIndex += 5;
        this.updateData();

    }
    forceUpdate = () => {
        this.state.EndIndex += 1;
        api.pending(0, this.state.EndIndex, this.props.item)
            .then((response) => {
                let fileList = response;
                this.setState({
                    Data : fileList.subNav
                })
            })
        
    }

    updateData = () => {

        api.pending(this.state.StartIndex, this.state.EndIndex, this.props.item)
          .then((response) => {
                let fileList = response;
                fileList.subNav.map((item, index) => {
                    this.state.Data.push(item)
                })
                this.setState({
                    title : fileList.title,
                    MaxIndex : fileList.MaxIndex,
                })

          })
    }

    componentDidMount(){
        this.updateData();
    }

    render(){
        return (
            <>  
            
                <SidebarLink onClick = {this.state.Data && this.showSubnav}>
                    <div>
                        {/* 
                            if have subNav and state of subnav is true will return active icon 
                            else if only have subnav will return idle icon 
                            else return null
                        */}
                        {this.state.subNav ? this.state.ActiveIcon: this.state.idleIcon} 
                        <SidebarLabel>{this.state.title}</SidebarLabel>
                    </div>
                </SidebarLink>
                <Sidebar_nested item={this.state.Data} firstcall={true}  pad={2} presub={this.state.subNav}/>

                {this.state.subNav && this.state.EndIndex < this.state.MaxIndex &&

                    <Dropdown style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingTop: '0'
                        
                    }} onClick={this.IncreaseIndex}>
                        <RiIcons.RiArrowDownSLine />
                        {` ${this.state.MaxIndex - this.state.EndIndex} Left`}
                    </Dropdown>
                }


    
            </>
        )
    }
}


export default SidebarMenu
