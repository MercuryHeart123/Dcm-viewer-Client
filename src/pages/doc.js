import React from 'react'
import './css/doc.css'
import {NavBtnLink} from '../Navbar/NavbarElements'
const doc = () => {
    return (
        <div className="box">
          <h1>Documents</h1>
          <p>เว็บไซต์นี้จะแบ่งเป็น 2 ส่วนใหญ่ๆ คือ</p>
          <br/>
          <p>1. การดูไฟล์ภาพ dcm (DICOM) บนเว็บไซต์</p>
          <p>โดยเว็บไซต์ได้ใช้ <a href="https://github.com/cornerstonejs">cornerstonejs</a> เป็น library หลักในการแสดงผลไฟล์ dcm ขึ้นบนเว็บไซต์</p>
          <br/>
          <p>2. การอัพโหลดไฟล์ภาพ dcm ขึ้นมาบนเว็บไซต์</p>
          <NavBtnLink style={{
            width: '6vw',
            fontSize: '1vw',
            textAlign:'center',
          }}>Upload</NavBtnLink>
          <p style={{paddingTop:'2vh'}}>ถ้าหากกดลงไปที่ปุ่มลักษณะนี้ที่ตำแหน่งขวาบนของ Nav bar จะทำการอัพโหลดไฟล์ได้</p>

        </div>
    )
}

export default doc
