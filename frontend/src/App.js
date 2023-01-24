import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div>
    
    <div className="chartCard">
      <div className="chartBox">
        <canvas id="myChart"></canvas>
      </div>
    </div>
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script>


    // Revenue brut ( Gross volume ) par catégorie ( Product Line )


    fetch('http://localhost:4001/revenue_by_productLine')
      .then(response=> response.json())
      .then(response=> {
        console.log(response)

        const currentCategory = response.map(function(item) {
              return item._id;
            });
        const currentValue = response.map(function(item) {
              return item.totalRevenue;
            });
         console.log(currentValue)

        
        
    const data = {
      labels: currentCategory,
      datasets: [{
        label: "Revenue brut ( Gross volume ) par catégorie ( Product Line )",
        data: currentValue,
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
      }]
    };

    // config 
    const config = {
      type: 'bar',
      data,
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    };

    // render init block
    const myChart = new Chart(
      document.getElementById('myChart'),
      config
    );
    })
      .catch(err=> console.error(err));

    </script>

  </div>
  );
}

export default App;
