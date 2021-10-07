// BsPlusSquareFill
// BsPlusSquare

import * as BsIcons from 'react-icons/bs'
const http = require('http');
class api{
    static callLocal(){
        return new Promise(async(resolve, reject) => {

            const options = {
                hostname: 'localhost',
                port: 8080,
                path: '/list/local',
                method: 'GET'
            }
            const req = await http.request(options, res => {
                console.log(`statusCode: ${res.statusCode}`)
            
                res.on('data', d => {
                    var string = new TextDecoder().decode(d);
                    var filelist = JSON.parse(string);
                    resolve(filelist)
                })
            })
            
            req.on('error', error => {
                console.error(error)
                reject(error)
            })
            req.end()
        })
    }

    static callUpload(){
        return new Promise(async(resolve, reject) => {

            const options = {
                hostname: 'localhost',
                port: 8080,
                path: '/list/upload',
                method: 'GET'
            }
            const req = await http.request(options, res => {
                console.log(`statusCode: ${res.statusCode}`)
            
                res.on('data', d => {
                    var string = new TextDecoder().decode(d);
                    var filelist = JSON.parse(string);
                    resolve(filelist)
                })
            })
            
            req.on('error', error => {
                console.error(error)
                reject(error)
            })
            req.end()
        })
        

    }

    static async pending(){
        var Localfile = await this.callLocal();
        var subLocalfile = [];
        Localfile.file.forEach(element => {
            subLocalfile.push({
                title: `${element}`,
                path: `/dcm/local/${element}`,
                idleIcon: <BsIcons.BsPlusSquare/>,
                ActiveIcon: <BsIcons.BsPlusSquareFill/>,
                })
        });
        var Uploadfile = await this.callUpload();
        var subUploadfile = [];
        Uploadfile.file.forEach(element => {
            subUploadfile.push({
                title: `${element}`,
                path: `/dcm/upload/${element}`,
                idleIcon: <BsIcons.BsPlusSquare/>,
                ActiveIcon: <BsIcons.BsPlusSquareFill/>,
                })
        });


        const SidebarData = [
            {
                title: 'Local Dcm File',
                idleIcon: <BsIcons.BsPlusSquare/>,
                ActiveIcon: <BsIcons.BsPlusSquareFill/>,
                subNav: subLocalfile,
                len: subLocalfile.length,
            },
            {
                title: 'Uploaded Dcm File ',
                idleIcon: <BsIcons.BsPlusSquare/>,
                ActiveIcon: <BsIcons.BsPlusSquareFill/>,
                subNav: subUploadfile,
                len: subUploadfile.length,
            
            }
        ]
        return SidebarData
    }
}

export default api;