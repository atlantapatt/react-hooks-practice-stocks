import React from "react";
import Stock from "./Stock";

function StockContainer({stocks, handleClick}) {
  const mappedStocks = stocks.map((stock) => {
    return <Stock stock={stock} handleClick={handleClick}/>
  })
  return (
    <div>
      <h2>Stocks</h2>
      {mappedStocks}
    </div>
  );
}

export default StockContainer;
