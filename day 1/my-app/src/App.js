import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useState } from "react";
import SearchApp from './components/SearchApp';


function App() {
  const [allProducts, setAllProducts] = useState([]);

  const [search, setSearch] = useState(""); 
  const [filterProducts, setFilterProducts] = useState([]);
  

  function handleChange(event) {
    console.log(event.target.value);
    setSearch(event.target.value);

    let userword = event.target.value.toLowerCase();

    const filteredProduts = allProducts.filter((product) => {
      
      return product.title.toLowerCase().includes(userword);
    });

    setFilterProducts(filteredProduts);

    console.log(filteredProduts, "filteredProduts");
  }
  return (
    <div className="App">
      <Routes>
      <Route path="/Searchapp" element={<SearchApp />} />
      </Routes>
      
    </div>
  );
}

export default App;
