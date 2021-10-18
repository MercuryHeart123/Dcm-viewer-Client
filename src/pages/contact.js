import React, { Component } from 'react'
import './css/contact.css'
import {FaFacebook, FaInstagram, FaGithub, FaLine, FaReact} from 'react-icons/fa'
import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from './logo.svg'
import { faReact } from '@fortawesome/free-brands-svg-icons';
const SidebarNav =  styled.a`
    margin-right: 20px;
`


class contact extends Component {
    render(){
        return (
            <section className="contactContainer">
                <section className="leftContainer">
                    <section className="upperLeft">
                        <h1>ABOUT ME</h1>
                        <p>Name : Thanakrit Rojsakthavorn</p>
                        <p>Age : 20 yr</p>
                        <p>Study : Computer Science at KMUTNB.</p>
                    </section>
                    <section className="lowerLeft">
                        <h1>FOLLOW ME</h1>
                        <div className='icon'>
                            <SidebarNav className='facebook' href={'https://www.facebook.com/vahahahahahaha/'}><FaFacebook/></SidebarNav>
                            <SidebarNav className='instagram' href={'https://www.instagram.com/courtesyheart'}><FaInstagram/></SidebarNav>
                            <SidebarNav className='github' href={'https://github.com/MercuryHeart123'}><FaGithub/></SidebarNav>
                            <SidebarNav className='line' href={'https://line.me/ti/p/~thanakrit_heart'}><FaLine/></SidebarNav>
                        </div>
                    </section>
                </section>
                <section className="rightContainer">
                    <FaReact className="App-logo"/>
                </section>
            </section>
        )
    }
    
}

export default contact
