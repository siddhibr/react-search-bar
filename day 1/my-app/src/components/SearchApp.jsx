import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchApp = () => {
  const [allProducts, setAllProducts] = useState([]); 

  const [search, setSearch] = useState("");
  const [filterProducts, setFilterProducts] = useState([]); 

  const router = useNavigate();

  async function getProducts() {
    
    
    try {
      const response = await axios.get('https://fakestoreapi.com/products');
      
      if (response?.data.length) {
        setAllProducts(response.data);
        setFilterProducts(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function redirect(id) {
    
    router(`/fake-single-product/${id}`);
  }

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

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      
      <div>
        <h1>Search App</h1>
        <input className="search-product" placeholder="Search for products" value={search} onChange={handleChange} />
      </div>
      {filterProducts?.length ? (
        <div
          style={{
            marginTop: "100px",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
          }}
        >
          {filterProducts.map((productObj) => (
            <div
              onClick={() => redirect(productObj.id)}
              style={{
                width: "30%",
                marginTop:"30px",
                border: "2px solid gray",
                height: "320px",
                
              }}
            >
              <img
                style={{ height: "50%", width: "50%" }}
                src={productObj.image}
              />
              <p><b>Price:₹977</b></p>
              <button className="button">Add to cart</button>
              
              <p>{productObj.title}</p>
            </div>
          ))}
          
        </div>
        

      ) : (
        <div>page not found...</div>
      )}
    </div>
  );
};

export default SearchApp;