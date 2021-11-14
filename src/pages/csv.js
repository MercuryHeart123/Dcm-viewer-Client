import React, { Component } from 'react'
import { Bar } from 'react-chartjs-2'
import 'bootstrap/dist/css/bootstrap.min.css';
import { parse } from "papaparse";
import './css/csv.css'
import * as TiIcon from 'react-icons/ti'
import InfiniteScroll from "react-infinite-scroll-component";
import { withRouter } from "react-router";

class csv extends Component{
    constructor(props){
        super(props);
        this.state = {
          csvFile: [],
          originalCsv : null,
          obj: null,
          forceLoad : false,
          nonUniqueChart: [],
          sortedState: {},
          unique: [],
          allkey: [],
          loadedFile: [],
          loadedIndex: 100,
          color: [`rgba(255, 99, 132, 0.6)`,`rgba(54, 162, 235, 0.6)`], // init color of chart
        }
      }
      
      setChartData = (csvFile) => {
        this.state.loadedFile = csvFile.slice(0,this.state.loadedIndex + 1); // slice full array to loadedFile(by index)
        var key = Object.keys(csvFile[0]);
        var obj = {};
        key.forEach(e => { // create unique key in obj
            obj[`${e}`] = {'unique': []};

        })

        csvFile.forEach(element => {
            var value = Object.values(element); // find unique key and non unique to make data chart
            for(let i=0;i<key.length;i++){

                var head = key[i];
                var index = i;

                if(obj[`${head}`][`${value[index]}`]){ //if found non unique, value add one more
                    obj[`${head}`][`${value[index]}`] += 1;
                    continue
                }

                if(obj[`${head}`][`unique`].includes(value[index])){ // if found value in unique, delete it from unique and create another key(value = 2)
                    var tmpindex = obj[`${head}`][`unique`].indexOf(value[index])
                    if(tmpindex !== -1) {
                        obj[`${head}`][`unique`].splice(tmpindex, 1);
                    }
                    obj[`${head}`][`${value[index]}`] = 2;
                    continue

                }

                if(obj[`${head}`][`${value[index]}`] == null){ // if not found a key add that value to unique keys
                    obj[`${head}`][`unique`].push(value[index]); 
                    
                    continue;
                }

                
            }
            
        });

        var arr_label = [];
        var Key = Object.keys(obj);
        var uniqueKey = [];
        Key.map((item) => { // map nonUnique label to arr_label
            if(obj[item][`unique`].length == 0){
                arr_label.push(item)

                return;
            }
            uniqueKey.push(item)

        });
        this.setState({ // set state in componentDidMount
            nonUniqueChart: arr_label,
            obj: obj,
            allkey: key,
            unique: uniqueKey,
        })

      }

      createChart = (name) => {
        var datachart = this.state.obj[`${name}`];
        delete datachart[`unique`] // don't need unique key cause createChart can create only nonUnique keys
        var label_arr = Object.keys(datachart);

        var data = {
                labels: [name],
                datasets:
                      label_arr.map((label_name, index)=>{ // return array that contain label and data and background set to index of state.color
                        return {  label : `${label_name}`,
                                  data : [datachart[`${label_name}`].toString()],
                                  backgroundColor : this.state.color[index]
                                  }
                      })
          }

          return data
      }

      loadMoreCsvData = () => {
        this.setState({ //load more 10 index
          loadedFile: this.state.csvFile.slice(0,this.state.loadedIndex)
        })
        this.state.loadedIndex+=10;
      }

      start = async() => {
        const {...id} = this.props.match.params;
        await parse(`http://localhost:8080/csv/${id[0]}`, {  // use papaparse to parse data of csv file to json  
                        download: true,
                        header: true,
                        skipEmptyLines: true,
                        complete: (e)=> {
                            if(this.state.originalCsv == null){
                              this.state.originalCsv =  e.data
                            }
                            this.setState({
                                csvFile: e.data,

                            })
                            this.setChartData(this.state.csvFile) // set init value to state
                        }
        })
      }
      async componentWillMount(){
            this.start();
      }

      componentDidUpdate (prevProps){

        if(this.props.location.pathname !== prevProps.location.pathname){ // call when pathname changed
          this.state.sortedState = {};
          this.start();
        }
      }

  
      render(){

        let createUniqueText = (name) => {

          var dataText = this.state.obj[`${name}`];
          var key = Object.keys(dataText);
          var percent = {};
          var allData = 0;
          key.forEach((e) => {
            if(e == 'unique'){
              var cell = Object.values(dataText[`${e}`]);
              allData += cell.length;
            }
            else{
              allData += dataText[`${e}`];
            }
          })
          for(let i=0 ;i<key.length;i++){
            var e = key[i];
            if(e == 'unique'){
              var cell = Object.values(dataText[`${e}`]);
              percent[e] = cell.length/allData * 100;
              percent[e] = Math.round(percent[e] ) ;
              if(percent[e] >= 90) {
                key.forEach((element) => {
                  if(element != 'unique'){
                    allData -= dataText[`${element}`];
                    allData += 1;
                  }
                })
                return  <div style={{textAlign:'center',justifyContent:'center'}}>
                            <span style={{color:'#256ce1',fontSize:'23px'}}>{allData.toString()}</span>
                            <br/>unique values
                        </div>
              }
            }
            else {
              percent[e] = Math.round(dataText[`${e}`]/allData * 100) ;
            }
          }
          var text = "";
          for(let i=key.length-1 ;i>=0;i--){ // create information text
            var e = key[i];
            if (e == ''){
              text += 'null';
            }
            else if (e == 'unique'){
              text += `${Object.values(dataText[`${e}`])[0].slice(0,20)} ...`;
              text += ' : ';
              text += '0';
              text += '%';
              text += ' , ';
              text += 'other';
              
            }
            else{
              text += e;
            }
            
            text += ' : ';
            text += percent[e].toString();
            text += '%';
            text += '\n';
          }
          return <div style={{}}> {text.split('\n').map((item, key) => { // map \n to <br/>
            if(key !== Object.keys(percent).length-1){ // break before it have more than expect
              return (
                <span key={key}>
                  {item}
                  <br/>
                </span>
              )
            }
            return (
              <span key={key}>
                {item}
              </span>
            )
          })}
          </div>
        }
        let createChart = (name) => {
          return <Bar data={this.createChart(name)} style={{maxHeight:'6vw'}}/>
        }
        let changeSortedState = (name) => {
          var obj = this.state.sortedState;
          var key = Object.keys(obj);
          key.forEach((e) => {
            if(e !== name){ // reset other column sortedState
              obj[`${e}`][`state`] = 0;
            }
            
          })
          obj[`${name}`][`state`] += 1; // when click will increase by one
          var tmpcsv = this.state.csvFile;
          if (obj[`${name}`][`state`]%2 == 1){
            tmpcsv.sort(function(a, b){
              return a[`${name}`].localeCompare(b[`${name}`]);
          });
          }
          else if (obj[`${name}`][`state`]%2 == 0){
            tmpcsv.sort(function(a, b){
              return b[`${name}`].localeCompare(a[`${name}`]);
          });
          }
          
          this.setState({
            sortedState : obj,
            csvFile : tmpcsv

          })
          this.setChartData(this.state.csvFile)
        }

        let createSorter = (name) => {

          if (this.state.sortedState[`${name}`] == null){
            this.state.sortedState[`${name}`] = {};
            this.state.sortedState[`${name}`][`state`] = 0;
          }

          
          return <div style={{textAlign:'center' }} onClick={() => {changeSortedState(name)}}>{
            this.state.sortedState[`${name}`][`state`] == 0 
            ? <TiIcon.TiArrowUnsorted/>
            :  this.state.sortedState[`${name}`][`state`] %2 == 1
            ? <TiIcon.TiArrowSortedDown/>
            : <TiIcon.TiArrowSortedUp/>
          }</div>
        }
        return (
          <section style={{display:'inline-flex',height:'92vh',marginLeft: 'auto',marginRight: 'auto'}}>
          {
          // this.state.nonUniqueChart.length > 0 && <div class="chart" >
            
          //   {createChart} {/* call createChart to create chart from csvFile that prepare by componentdidmount */}
    
          // </div>
          }
          {this.state.obj !== null &&
          <div id="scrollableDiv" style={{ height: '90vh', overflow: "auto" }}> 
            {/* make table to overflow and can scrollable */}
            <InfiniteScroll dataLength={this.state.loadedFile.length}
                            next={this.loadMoreCsvData}
                            hasMore={true}
                            scrollableTarget="scrollableDiv"
                            loader={<h4>Loading...</h4>}
                            >
              {/* loadedIndex increase by 10 every client reach bottom of table */}
              <div style={{paddingRight:'2vw', paddingTop:'2vh',maxWidth: '65vw'}}>

                  <table class='table' > 
                    
                    <thead>
                      <tr>
                        {this.state.allkey.map((element, index) => {
                          return <th scope="col">{element}</th>
                        })}
                      </tr>
                    </thead>
                    <thead>
                      <tr >
                        {this.state.allkey.map((name, index) => {
                          if (this.state.nonUniqueChart.includes(name)){
                            return <th scope="col" >{createChart(name)}{createSorter(name)}</th>
                          }
                          return  <th scope="col">
                                                
                                                  {createUniqueText(name)}
                                                  {createSorter(name)}
                                  </th>
                        })}
                      </tr>
                    </thead>
                    <tbody >
                      {/* loop through loadedFile to display data from csvFile */}
                      {this.state.loadedFile.map((element, index) => {
                        return  <tr>
                                    {this.state.allkey.map((e, index) => {
                                      if(index==0){ // return <th/> on first loop
                                        return <th scope="row">{element[`${this.state.allkey[0]}`]}</th>
                                      }
                                      return <td>{element[e]}</td>
                                      })
                                    }
                                </tr>
                      })}
                    </tbody>
                  </table>
              </div>
            </InfiniteScroll>
          </div>}
          </section>
          
        )
      }
    }

var CSV2 = withRouter(csv)

export default CSV2
