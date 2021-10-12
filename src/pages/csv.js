import React, { Component } from 'react'
import { Bar } from 'react-chartjs-2'
import 'bootstrap/dist/css/bootstrap.min.css';
import { parse } from "papaparse";
import './css/csv.css'
import InfiniteScroll from "react-infinite-scroll-component";

class csv extends Component{
    constructor(props){
        super(props);
        this.state = {
          csvFile: [],
          obj: null,
          nonUniqueChart: [],
          allkey: [],
          loadedFile: [],
          loadedIndex: 25,
          color: [`rgba(255, 99, 132, 0.6)`,`rgba(54, 162, 235, 0.6)`], // init color of chart
        }
      }
      
      setChartData = (csvFile) => {
        this.state.loadedFile = csvFile.slice(0,26); // slice full array to loadedFile(by index)
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
        console.log(key);
        Key.map((item) => { // map nonUnique label to arr_label
            if(obj[item][`unique`].length == 0){
                arr_label.push(item)
                Key.push(item)

                return;
            }

        });

        this.setState({ // set state in componentDidMount
            nonUniqueChart: arr_label,
            obj: obj,
            allkey: key,
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

      async componentDidMount(){
            await parse('http://localhost:8080/csv/1', {  // use papaparse to parse data of csv file to json  
                            download: true,
                            header: true,
                            skipEmptyLines: true,
                            complete: async(e)=> {
                                await this.setState({
                                    csvFile: e.data,
                                })
                                this.setChartData(this.state.csvFile) // set init value to state
                            }
          })

      }

      loadMoreCsvData = () => {
        this.setState({ //load more 10 index
          loadedFile: this.state.csvFile.slice(0,this.state.loadedIndex)
        })
        this.state.loadedIndex+=10;
      }

      render(){
        let createChart =  this.state.nonUniqueChart.map((name, index) => {
          return <Bar data={this.createChart(name)}/>
        })

        return (
          <section style={{display:'inline-flex',marginLeft: 'auto',marginRight: 'auto'}}>
          <div class="chart" >

            {createChart} {/* call createChart to create chart from csvFile that prepare by componentdidmount */}
    
          </div>
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
              <div style={{paddingRight:'2vw',maxWidth: '40vw', paddingTop:'2vh'}}>

                  <table class='table' > 
                    <thead>
                      <tr>
                        {Object.keys(this.state.loadedFile[0]).map((element, index) => {
                          return <th scope="col">{element}</th>
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

export default csv
