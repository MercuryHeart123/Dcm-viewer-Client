import React, { useEffect, useState } from "react";
import dicomParser  from "dicom-parser";
import './css/dcmviewer.css';
import cornerstone from "cornerstone-core";
import cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader'
import {useParams} from'react-router-dom';



export default function DcmViewer() {
        const [fullPath, setfullPath] = useState('');
        const [fileName, setfileName] = useState('');
        const [cantFound, setcantFound] = useState('Loading Image ...');

        const [isLoad, setisLoad] = useState(false);
        const {...id} = useParams();

    
        useEffect(() => {
            // Enable the DOM Element for use with Cornerstone
            cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
            cornerstoneWADOImageLoader.external.dicomParser = dicomParser;
            
        


            function loadAndViewImage(imageId) {

                try {
                    cornerstone.loadAndCacheImage(imageId).then(function(image) {
                        var viewport = cornerstone.getDefaultViewportForImage(element, image);
                        
                        cornerstone.displayImage(element, image, viewport);
                        setisLoad(true)
                    }, function(err) {
                        setcantFound(`Can't found image`)
                        console.log(err);
                    });
                }
                catch(err) {
                    console.log(err);
                }
            }

            function downloadAndView() {
                var fileName = ""
                for(let i=0;i<id[0].length;i++){
                    if(id[0][i] === "/"){
                        fileName = ""
                        continue
                    }
                    fileName += id[0][i]
                }
                setfullPath(`${id[0]}`);
                setfileName(fileName);
                let url = `http://localhost:8080/dcm/${id[0]}`;

                // prefix the url with wadouri: so cornerstone can find the image loader
                url = "wadouri:" + url;

                // image enable the dicomImage element and activate a few tools
                loadAndViewImage(url);
            }

            var element = document.getElementById('dicomImage');
            cornerstone.enable(element);
            downloadAndView();
            

               
        }, [id]);

    return  <>
                <div className="container" style={{height: '92vh',width: '50vw'}}>
                    <br/>
                    { isLoad ?
                            <div>Path : {fullPath}<br/>Image : {fileName} </div>
                        :
                        <div>
                            {cantFound}
                        </div>
                    }
                        <br/>
                    <div id="dicomImage" ></div>
                </div>
                    
            </>


  }