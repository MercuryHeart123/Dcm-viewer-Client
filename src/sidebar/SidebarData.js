import * as BsIcons from 'react-icons/bs'
const http = require('http');
class api{
    static callrawData(startIndex, endIndex, name){
        var operation = {
            "test" : '/list/local/test',
            "train" : '/list/local/train',
            "upload" : '/list/upload',
            "csv" : '/list/csv'
        }
        return new Promise(async(resolve, reject) => {

            const options = {
                hostname: 'localhost',
                port: 8080,
                path: `${operation[name.toLowerCase()]}/${startIndex}/${endIndex}`,
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
                if(i == Localfile.length-1){
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
        
    }

    static async pending(startIndex, endIndex, name){
        var rawData = await this.callrawData(startIndex, endIndex, name); // call an api to list a file in local dir
        var subrawData = await this.make_nested(rawData); //pass Localfile return a full object that ready to create component

        function capitalize(str)
        {
            return str[0].toUpperCase() + str.slice(1);
        }
        const SidebarData = 
            {
                title: `${capitalize(name)} Directory`,
                subNav: subrawData,
                MaxIndex: rawData.MaxIndex,
            }

        return SidebarData
    }
}

export default api;