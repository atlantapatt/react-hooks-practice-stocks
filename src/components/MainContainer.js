import React, { useEffect, useState } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {
  const [stocks, setStocks] = useState([])
  const [myStocks, setMyStocks] = useState([])
  const [sortBy, setSortBy] = useState('')
  const [filterBy, setFilterBy] = useState('Tech')

  useEffect(() => {
    fetch('http://localhost:3001/stocks')
    .then((r) => r.json())
    .then((data) => setStocks(data))
  },[])


  useEffect(() => {
    if(sortBy === 'Alphabetically') {
      const sortedStocks = sortByName()
      setStocks(sortedStocks)
    }else {
      const sortedStocks = sortByPrice()
      setStocks(sortedStocks)
    }
  }, [sortBy])

function sortStocks(e) {
  setSortBy(e.target.value)
}

const filteredStocks =  [...stocks].filter(
  (stock) => stock.type === filterBy
)
console.log(filteredStocks)
console.log(filterBy)

function sortByName() {
  return [...stocks].sort(function(a, b) {
    const nameA = a.name.toUpperCase(); // ignore upper and lowercase
    const nameB = b.name.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
  
    // names must be equal
    return 0;
  });
}
function sortByPrice() {
  return [...stocks].sort(function (a, b) {
    return a.price - b.price;
  });
}

  function addPort(stock) {
  if(!myStocks.includes(stock)) {
    const updatedStocks = [...myStocks, stock]
    setMyStocks(updatedStocks)
  }
}

function sellStock(stock) {
  console.log('sell stock')
  const updatedStocks = [...myStocks].filter(myStock => myStock.id !== stock.id)
  setMyStocks(updatedStocks)
}

  return (
    <div>
      <SearchBar sortStocks={sortStocks} sortBy={sortBy} filterBy={filterBy} setFilterBy={setFilterBy}/>
      <div className="row">
        <div className="col-8">
          <StockContainer stocks={filteredStocks} handleClick={addPort}/>
        </div>
        <div className="col-4">
          <PortfolioContainer stocks={myStocks} handleClick={sellStock}/>
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
