
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import {} from 'react-bootstrap';
import PromotionManagement from './components/PromotionManagement.js';


function App() {
  return (
    <div className="App">
        <header className="App-header">
        <h1>Promotion Management System</h1>
      </header>
      <main>
        <PromotionManagement />
      </main>
    </div>
  );
}

export default App;
