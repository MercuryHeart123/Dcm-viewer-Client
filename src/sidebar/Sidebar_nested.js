import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import * as HiIcons from 'react-icons/hi'

const SidebarLabel = styled.span`
    margin-left: 16px;
`
const DropdownLink = styled(Link)`
    display: flex;
    background: #414757;
    padding:0.5rem;
    min-width: 15%;
    padding-left: 3rem;
    padding-right: 4rem;
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
    padding:0.5rem;
    padding-left: 3rem;
    padding-right: 4rem;
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



class Sidebar_nested extends Component{

    constructor(props) {
        super(props);
        this.state = {
            subNav: false,

        }
    }

    showSubnav = () => {this.setState({
        subNav: !this.state.subNav
        
        })

    }

    render(){
        var name_check = (name) => {
            if(name == 'local' || name == 'upload' || name == 'MaxIndex' || name == 'csv'){ //skip title name local and upload by set first call is true
                return true
            }
            return false
        }
        var gen_dir = (item) => {
            if(this.props.firstcall){ // if isfirstcall will skip render this component 
                this.state.subNav = true
            }

            for(let i=0;i<item.length;i++){
                if (item[i][`path`] == null){
                    var sub_dir = item.map((element, index) => {
                                    return(
                                            <Sidebar_nested item={element[`children`]} firstcall={name_check(element[`title`])} 
                                                            title={element[`title`]} pad={this.props.pad + 2} presub={this.state.subNav} />
                                    )
                                })
                    return sub_dir
                }
                else{
                    var dcm = item.map((element, index) => {  //return a component of .dcm file
                        return (<DropdownLink to={element.path} key={index} style={{paddingLeft:`${this.props.pad+2}rem`}}>
                                    <HiIcons.HiOutlineDocumentText />
                                    <SidebarLabel>{element.title}</SidebarLabel>
                                </DropdownLink>)
                    })
                    return dcm

                }
        
            }
        }

        return (
            
                <>
                    {this.props.presub  && this.props.firstcall == false &&
                            <Dropdown  onClick={this.showSubnav} style={{paddingLeft:`${this.props.pad}rem`}}>

                                {  this.state.subNav ? this.props.item[0].ActiveIcon: this.props.item[0].idleIcon}
                                <SidebarLabel>
                                    {this.props.title }
                                </SidebarLabel>

                            </Dropdown> 
                           
                    }
                    {(this.props.firstcall || this.state.subNav ) && this.props.presub && gen_dir(this.props.item)  }
                </>)
    }
}

export default Sidebar_nested
