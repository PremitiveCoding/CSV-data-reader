import './App.css';
import Horizontalchart from "./components/revenue_by_productLine";
import Verticachart1 from "./components/purchases_by_customerType";
import VerticalChart2 from "./components/average_rating_by_gender";
import VerticalChart3 from "./components/purchases_by_productLine";
import VerticalChart4 from "./components/sales_by_city";





function App() {
  return (
    <div className="App">
      <Horizontalchart/>
      <Verticachart1/>
      <VerticalChart3/>
      <VerticalChart2/>
      <VerticalChart4/>
    </div>
  );
}

export default App;
