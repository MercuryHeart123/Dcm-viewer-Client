import React, { Component } from 'react'
import { Bar } from 'react-chartjs-2'

import { parse } from "papaparse";
import './css/csv.css'

class csv extends Component{
    constructor(props){
        super(props);
        this.state = {
          csvFile: [],
          chartData:{},      
        }
      }
    
      static defaultProps = {
        displayTitle:true,
        displayLegend: true,
        location:'City'
      }
      
      setChartData = (csvFile) => {
        var key = Object.keys(csvFile[0]);
        var obj = {};
        key.forEach(e => {
            obj[`${e}`] = {'unique': []};

        })

        csvFile.forEach(element => {
            var value = Object.values(element);
            for(let i=0;i<key.length;i++){

                var head = key[i];
                var index = i;

                if(obj[`${head}`][`${value[index]}`]){
                    obj[`${head}`][`${value[index]}`] += 1;
                    continue
                }

                if(obj[`${head}`][`unique`].includes(value[index])){
                    var tmpindex = obj[`${head}`][`unique`].indexOf(value[index])
                    if(tmpindex !== -1) {
                        obj[`${head}`][`unique`].splice(tmpindex, 1);
                    }
                    obj[`${head}`][`${value[index]}`] = 2;
                    continue

                }

                if(obj[`${head}`][`${value[index]}`] == null){
                    obj[`${head}`][`unique`].push(value[index]); 
                    
                    continue;
                }

                
            }
            
        });

        var arr_label = [];
        var arr_unigue = [];
        Object.keys(obj).map((item) => { // map label of chart
            if(obj[item][`unique`].length == 0){
                arr_label.push(item)
                return;
            }
            arr_unigue.push(item)
        });
        var dataset = [];
        var dataset2 = [];
        Object.keys(obj).map((item) => { // map data prepare to show
            if(obj[item][`unique`].length == 0){
                dataset.push(obj[item][0]);
                dataset2.push(obj[item][1]);
            }
        });
        
        var arr_red = [];
        var arr_blue = [];
        arr_label.forEach((element) => { // map color use in background color
            arr_red.push('rgba(255, 99, 132, 0.6)');
            arr_blue.push('rgba(54, 162, 235, 0.6)');
        })

        this.setState({
            chartData: {
                labels: arr_label,
            datasets:[
              {
                label:'0', // need to dynamic
                data: dataset,
                backgroundColor: arr_red
              },
              {
                label:'1', // need to dynamic
                data: dataset2,
                backgroundColor: arr_blue
              }
            ]
          }
        })


      }

      async componentDidMount(){
            await parse('http://localhost:8080/csv/1', {
                            download: true,
                            header: true,
                            skipEmptyLines: true,
                            complete: async(e)=> {

                                await this.setState({
                                    csvFile: e.data,
                                })
                                this.setChartData(this.state.csvFile);
                            }
          })

      }
      render(){
        return (
          <div class="chart" >
            <Bar
              data={this.state.chartData}
              options={{
                title:{
                  display:this.props.displayTitle,
                  text:'Largest Cities In '+'123',
                  fontSize:25
                },
                legend:{
                  display:this.props.displayLegend,
                  position:this.props.legendPosition
                }
              }}
            />
            {`${this.state.csvFile.length}`} 
            {/*need to dynamic*/}
    
           
          </div>
        )
      }
    }

export default csv
