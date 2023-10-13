import React from "react";
import { useSelector } from "react-redux";
import GridView from './GridView'
import ListView from './ListView'

const ProductList = () => {
  const {filtered_products, grid_view} = useSelector((state) => state.Filter)

  if(grid_view){
    return <GridView products={filtered_products}/>
  }

  return <ListView products={filtered_products}/>
};

export default ProductList;
