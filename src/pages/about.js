import React from 'react'
import './css/about.css'
import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';

const Btn = styled(Link)`
  border-radius: 4px;
  background: #256ce1;
  padding: 10px 22px;
  color: #fff;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  /* Second Nav */
  margin-left: 24px;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #256ce1;
  }
`;
const about = () => {
    return (
        <section className="box">
            <section style={{
                                width:'45vw',
                                marginTop: 'auto',
                                marginBottom: 'auto',

                                color: '#256ce1',
                                paddingRight: '3vw',
                                paddingLeft: '3vw'
                            }}>
                <h1 style={{
                                fontWeight:'bold'
                }}>ABOUT THIS WEBSITE</h1>
                <br/>
                <p> 
                    เว็บไซต์นี้ได้จัดทำขึ้นเพื่อเป็นส่วนหนึ่งของวิชา OOP (040613222	OBJECT-ORIENTED PROGRAMMING) 
                    ในปีการศึกษา 2564 ในช่วงชั้นปีที่ 2 และโจทย์คือให้แสดงไฟล์ .dcm (DICOM) ขี้นมาบนเว็บไซต์ให้ได้
                    โดยไฟล์ที่จะนำมาแสดงบนเว็บไซต์นี้ ได้รับมาจาก 
                    <a href="https://www.kaggle.com/c/siim-covid19-detection/" style={{
                                                                                        textDecoration: 'none',
                                                                                        color: '#252831',
                                                                                    }}> Kaggle siim-covid19-detection
                    </a>
                    <br/>
                    <br/>
                    ลงวันที่  17/10/2021
                </p>
                <br/>                                                   
                <Btn style={{
                                maxWidth: '13vw',
                                fontWeight: 'bold',
                                fontSize: '1.25vw',
                                margin: '5vh 0 0 0',
                                paddingTop: '1vh',
                                textAlign: 'center'
                }} to={'/contact'}>
                    CONTACT ME
                </Btn>
            </section>
            <section className='hello' style={{
                                marginTop: 'auto',
                                marginBottom: 'auto',
                                color: '#256ce1',
                                paddingRight: '3vw',
                                paddingLeft: '3vw',
                            }}>
                <h1 style={{display:'inline'}}>Hello<span className='dot'>.</span>
                <br/>I'm
                <br/>Thanakrit
                </h1>

            </section>
        </section>
    )
}

export default about

