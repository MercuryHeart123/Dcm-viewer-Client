import React, { useEffect, useState } from "react";
import dicomParser  from "dicom-parser";
import './css/dcmviewer.css';
import cornerstone from "cornerstone-core";
import cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader'
import {useParams} from'react-router-dom';

cornerstoneWADOImageLoader.external.dicomParser = dicomParser;
// cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
cornerstoneWADOImageLoader.configure({
        beforeSend: function(xhr) {
            // Add custom headers here (e.g. auth tokens)
            //xhr.setRequestHeader('APIKEY', 'my auth token');
        }
    });


export default function DcmViewer() {
        const [fileName, setfileName] = useState("");
        const {...id} = useParams();

        useEffect(() => {
            // Enable the DOM Element for use with Cornerstone
            cornerstoneWADOImageLoader.external.cornerstone = cornerstone;

            cornerstoneWADOImageLoader.configure({
            beforeSend: function(xhr) {
                // Add custom headers here (e.g. auth tokens)
                //xhr.setRequestHeader('APIKEY', 'my auth token');
            }
        });


        function loadAndViewImage(imageId) {
            var element = document.getElementById('dicomImage');

            try {
                cornerstone.loadAndCacheImage(imageId).then(function(image) {
                    var viewport = cornerstone.getDefaultViewportForImage(element, image);
                    
                    cornerstone.displayImage(element, image, viewport);

                }, function(err) {
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
                if(id[0][i] == "/"){
                    fileName = ""
                    continue
                }
                fileName += id[0][i]
            }
            setfileName(fileName);
            let url = `http://localhost:8080/dcm/${id[0]}`;

            // prefix the url with wadouri: so cornerstone can find the image loader
            url = "wadouri:" + url;

            // image enable the dicomImage element and activate a few tools
            loadAndViewImage(url);
        }

        cornerstone.events.addEventListener('cornerstoneimageloadprogress', function(event) {
            const eventData = event.detail;
            const loadProgress = document.getElementById('loadProgress');
            loadProgress.textContent = `Image Load Progress: ${eventData.percentComplete}%`;
        });

        
        var element = document.getElementById('dicomImage');
        cornerstone.enable(element);
        downloadAndView();
        

               
        }, [id]);
          
    return  <div className="container" style={{height: '92vh',width: '50vw'}}>
                <br/>
                    <div id="loadProgress">Image Load Progress:</div>
                    <div>{fileName}</div>
                    <br/>
                <div id="dicomImage" ></div>
            </div>


  }