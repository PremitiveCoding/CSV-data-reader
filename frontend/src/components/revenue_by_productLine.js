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
        text:  "Revenue brut ( Gross volume ) par catégorie ( Product Line )",
      },
    },
  };

const Horizontalchart =() => {
    const [data, setData] = useState({
        datasets: [
          {
            label: 'Dataset 1',
            data:[],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(25, 90, 13, 0.5)',
          },
          
        ],
      });
    useEffect(()=> {
       const fetchData= async()=> {
           const url = 'https://matious-api.vercel.app/revenue_by_productLine'
         await fetch(url).then((data)=> {
             console.log("Api data", data)
             const res = data.json();
             return res
         }).then((res) => {
           
            const currentCategory = res.map(function(item) {
              return item._id;
            });
            const currentValue = res.map(function(item) {
              return item.totalRevenue;
            });
            setData({
                labels:currentCategory,
                datasets: [
                  {
                    label: 'Dataset ID',
                    data:currentValue,
                    backgroundColor: [
                        'rgba(255, 26, 104, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(0, 0, 0, 0.2)'
                      ],
                      borderColor: [
                        'rgba(255, 26, 104, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(0, 0, 0, 1)'
                      ],
                      borderWidth: 1
                  },
                 
                ],
              })
            console.log("arrData", currentCategory, currentValue)
         }).catch(e => {
                console.log("error", e)
            })
        }
        
        fetchData();
    },[])
   
    return(
        <div style={{width:'80%', height:'50%'}}>
            {
                console.log("dataaaaaaaa", data)
            }
            <Bar data={data} options={options}/>
         </div>)
}
export default Horizontalchart;