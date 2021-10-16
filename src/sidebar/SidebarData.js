import * as BsIcons from 'react-icons/bs'
const http = require('http');
class api{
    static callLocal(dir, index){
        console.log(index);
        return new Promise(async(resolve, reject) => {

            const options = {
                hostname: 'localhost',
                port: 8080,
                path: `/list/local/${dir}/${index}`,
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

    static callUpload(index){
        return new Promise(async(resolve, reject) => {

            const options = {
                hostname: 'localhost',
                port: 8080,
                path: `/list/upload/${index}`,
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

    static callCsv(){
        return new Promise(async(resolve, reject) => {

            const options = {
                hostname: 'localhost',
                port: 8080,
                path: `/list/csv/`,
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

    static async make_nested(Localfile){
        var arr = [];

        if(Localfile[`MaxIndex`] != null){
            var key = Object.keys(Localfile);

            return await this.make_nested(Localfile[key[0]]);
        }
        for(let i=0;i<Localfile.length;i++){
            if(Localfile[i][`path`] == null){
                var obj =   {
                        title: `${Localfile[i][`title`]}`,
                        idleIcon: <BsIcons.BsPlusSquare/>,
                        ActiveIcon: <BsIcons.BsPlusSquareFill/>,
                    }

                var children = await this.make_nested(Localfile[i][`children`]);
                obj[`children`] = children;
                arr.push(obj);
                if(i==Localfile.length-1){
                    return arr
                }
            }
            else{
                var obj = {
                    title: `${Localfile[i][`title`]}`,
                    path: Localfile[i][`path`],
                    idleIcon: <BsIcons.BsPlusSquare/>,
                    ActiveIcon: <BsIcons.BsPlusSquareFill/>,
                }
                arr.push(obj);
            }
        }
        return arr
        // var key = Object.keys(Localfile);
        // var tmp = [];
        // var arr = [];
        // for(let i=0; i<key.length ; i++){
        //     if(Localfile[key[i]] != true){
        //         var obj =   {
        //                         title: `${key[i]}`,
        //                         idleIcon: <BsIcons.BsPlusSquare/>,
        //                         ActiveIcon: <BsIcons.BsPlusSquareFill/>,

        //                     }
        //         let nested_obj = Localfile[`${key[i]}`];
        //         if (obj[`child`] == null){ //init child array
        //             obj[`child`] = [];
        //         }
        //         var check = await this.make_nested(nested_obj, path + '/' + key[i]) // pending promises and pass a key to nest an obj

        //         var nested_file = [];
        //         check.forEach(element => {

        //             if(String(element).includes('.dcm') || String(element).includes('.csv')){ //check return from recursion is a .dcm file
        //                 nested_file.push({
        //                                     title: `${element}`,
        //                                     path: path + '/' + key[i] + '/' + element,
        //                                     idleIcon: <BsIcons.BsPlusSquare/>,
        //                                     ActiveIcon: <BsIcons.BsPlusSquareFill/>,
        //                                 })
        //             }
        //             else{
        //                 nested_file.push(element);
        //             }
        //         })
        //         obj[`child`].push(nested_file)
        //         tmp.push(obj); //collecting obj in tmp variable

        //         if(i==key.length-1){

        //             return tmp //return in last loop tmp warp a every obj together
        //         }
   
        //     }
        //     else{
        //         arr.push(key[i]);
        //     }
        // }

        // return arr //exit condition
    }

    static async pending(testIndexLocal, trainIndexLocal, indexUpload){
        var testLocalfile = await this.callLocal("test", testIndexLocal); // call an api to list a file in local dir
        var testsubLocalfile = await this.make_nested(testLocalfile); //pass Localfile return a full object that ready to create component

        var trainLocalfile = await this.callLocal("train", trainIndexLocal); 
        var trainsubLocalfile = await this.make_nested(trainLocalfile);

        var Uploadfile = await this.callUpload(indexUpload);
        var subUploadfile = await this.make_nested(Uploadfile)

        var Csvfile = await this.callCsv();
        var subCsvfile = await this.make_nested(Csvfile)

        const SidebarData = [
            {
                title: 'Test Local Dcm File',
                idleIcon: <BsIcons.BsPlusSquare/>,
                ActiveIcon: <BsIcons.BsPlusSquareFill/>,
                subNav: testsubLocalfile,
                MaxIndex: testLocalfile.MaxIndex,

            },
            {
                title: 'Train Local Dcm File',
                idleIcon: <BsIcons.BsPlusSquare/>,
                ActiveIcon: <BsIcons.BsPlusSquareFill/>,
                subNav: trainsubLocalfile,
                MaxIndex: trainLocalfile.MaxIndex,

            },
            {
                title: 'Uploaded Dcm File ',
                idleIcon: <BsIcons.BsPlusSquare/>,
                ActiveIcon: <BsIcons.BsPlusSquareFill/>,
                subNav: subUploadfile,
                MaxIndex: Uploadfile.MaxIndex,
            
            },
            {
                title: 'Csv File',
                idleIcon: <BsIcons.BsPlusSquare/>,
                ActiveIcon: <BsIcons.BsPlusSquareFill/>,
                subNav: subCsvfile,
                MaxIndex: Csvfile.MaxIndex,
                
            
            }
        ]

        return SidebarData
    }
}

export default api;