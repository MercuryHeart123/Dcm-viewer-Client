import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

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
        var gen_dir = (item) => {

            for(let i=0;i<item.length;i++){

                if (!item[i][`title`].includes(".dcm") && this.props.presub){
                    var test = item.map((element, index) => {
                        return(
                                <Sidebar_nested item={element[`child`][0]} title={element[`title`]} presub={this.state.subNav} />
                        )
                    })
                    return test
                    
                }
                else{
                    var dcm = item.map((element, index) => {  //return a component of .dcm file
                        return (<DropdownLink to={element.path} key={index} >
                                    <SidebarLabel>{element.title}</SidebarLabel>
                                </DropdownLink>)
                    })

                    return dcm

                }

            }

        }

        //     let key = Object.keys(item);
        //     console.log(key);
        //     for(let i=0;i<key.length;i++){
        //         if (!key[i].includes('.dcm')){
        //             return  <Sidebar_nested item={item[`${key[i]}`]}>
        //                         {key[i]}
        //                     </Sidebar_nested>
        //         }
        //         else{

        //             key.map((item) => {
        //                 return  <DropdownLink>
        //                             {item}
        //                         </DropdownLink>
        //             })
        //             return <></>
        //         }
        //     }
        // }
        
        return (
            
                <>
                    {this.props.presub  &&
                            <DropdownLink onClick={this.showSubnav}>

                                {  this.state.subNav ? this.props.item[0].ActiveIcon: this.props.item[0].idleIcon}
                                <SidebarLabel>
                                    {this.props.title }
                                </SidebarLabel>

                            </DropdownLink> 
                           
                    }
                    {this.state.subNav && this.props.presub && gen_dir(this.props.item)  }
                </>)
    }
}

export default Sidebar_nested