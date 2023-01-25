import './App.css';
import Horizontalchart from "./components/revenue_by_productLine";
import Verticachart1 from "./components/purchases_by_customerType";
import VerticalChart2 from "./components/average_rating_by_gender";



function App() {
  return (
    <div className="App">
      <Horizontalchart/>
      <Verticachart1/>
      <VerticalChart2/>

    </div>
  );
}

export default App;
