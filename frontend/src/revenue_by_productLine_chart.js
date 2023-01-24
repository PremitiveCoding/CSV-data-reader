import {useEffect, useState} from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';

import { Bar } from 'react-chartjs-2';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
const options = {
    indexAxis: 'y',
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'revenue_by_productLine',
      },
    },
  };

const Horizontalchart =() => {
    const [data,setData] = useState({
        labels:[
            {
                label: 'labelSet',
                data:[],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(25, 90, 13, 0.5)',
              },
        ],
        datasets: [
          {
            label: 'Dataset',
            data:[],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(25, 90, 13, 0.5)',
          },
         
        ],
      });
    useEffect(()=> {
       const fetchData= async()=> {
           const url = 'http://localhost:4001/revenue_by_productLine';
           const labelSet = [];
           const dataSet = [];
         await fetch(url).then((data)=> {
             console.log("Api data", data)
             const res = data.json();
             return res
         }).then((res) => {
             console.log("ressss", res)
            for (const val of res) {
                labelSet.push(val._id);
                dataSet.push(val.totalRevenue);
                // labelSet.push(val.name)
            }
            setData({
              //  labels:['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                labels: [
                    {
                      label: 'ProductLine',
                      data:labelSet,
                      borderColor: 'rgb(255, 99, 132)',
                      backgroundColor: 'rgba(99, 132, 0.5)',
                    },
                   
                  ],
                
                datasets: [
                  {
                    label: 'Dataset ID',
                    data:dataSet,
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(99, 132, 0.5)',
                  },
                 
                ],
              })
            console.log("arrData", dataSet)
         }).catch(e => {
                console.log("error", e)
            })
        }
        
        fetchData();
    },[])
   
    return(
        <div style={{width:'80%', height:'50%'}}>
            {
                console.log("data", data)
            }
            <Bar data={data} options={options}/>
         </div>)
}
export default Horizontalchart;