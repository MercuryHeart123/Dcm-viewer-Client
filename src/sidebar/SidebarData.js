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

    static async make_nested(Localfile, path){

        var key = Object.keys(Localfile);
        var tmp = [];
        var arr = [];
        for(let i=0; i<key.length ; i++){
            if(!key[i].includes(".dcm")){
                var obj =   {
                                title: `${key[i]}`,
                                idleIcon: <BsIcons.BsPlusSquare/>,
                                ActiveIcon: <BsIcons.BsPlusSquareFill/>,

                            }
                let nested_obj = Localfile[`${key[i]}`];
                if (obj[`child`] == null){ //init child array
                    obj[`child`] = [];
                }
                var check = await this.make_nested(nested_obj, path + '/' + key[i]) // pending promises and pass a key to nest an obj
                var nested_file = [];
                check.forEach(element => {
                    if(String(element).includes('.dcm')){ //check return from recursion is a .dcm file
                        nested_file.push({
                                            title: `${element}`,
                                            path: path + '/' + key[i] + '/' + element,
                                            idleIcon: <BsIcons.BsPlusSquare/>,
                                            ActiveIcon: <BsIcons.BsPlusSquareFill/>,
                                        })
                    }
                    else{
                        nested_file.push(element);
                    }
                })
                obj[`child`].push(nested_file)
                tmp.push(obj); //collecting obj in tmp variable

                if(i==key.length-1){

                    return tmp //return in last loop tmp warp a every obj together
                }
   
            }
            else{
                arr.push(key[i]);
            }
        }

        return arr //exit condition
    }

    static async pending(){
        var Localfile = await this.callLocal(); // call an api to list a file in local dir
        var subLocalfile = await this.make_nested(Localfile, '/dcm'); //pass Localfile return a full object that ready to create component
        
        var Uploadfile = await this.callUpload();
        var subUploadfile = await this.make_nested(Uploadfile, '/dcm')
        


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