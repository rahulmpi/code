import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    all_products: [],
    filtered_products: [],
    sorting_value: 'lowest',
    grid_view: true,
    filters: {
        text: "",
        category: "all",
        company: "all",
        color: "all",
        maxPrice: 0,
        price: 0,
        minPrice: 0,
      },
}

const FilterSlice = createSlice({
    name: 'Filters',
    initialState,
    reducers: {
         loadFilterProducts : (state, action) =>{
            let priceArr = action.payload.map((elem) => elem.price)
            let maxPrice = Math.max(...priceArr)

            state.all_products = [...action.payload]
            state.filtered_products = [...action.payload]
            state.filters = {...state.filters, maxPrice, price: maxPrice }
         },
         setGridView : (state) =>{
            state.grid_view = true
         },
         setListView : (state) =>{
            state.grid_view = false
         },
         setSortingValue: (state, action) =>{
             state.sorting_value = action.payload
         },
         setSortingProducts : (state) =>{
            let newSortData;
            let {sorting_value, filtered_products} = state
            let tempProducts = [...filtered_products]

            const sortingProducts = (a,b) =>{
                if(sorting_value === 'lowest'){
                   return a.price - b.price
                }
                if(sorting_value === 'highest'){
                    return b.price - a.price
                 }
                 if(sorting_value === 'a-z'){
                    return a.name.localeCompare(b.name)
                 }
                 if(sorting_value === 'z-a'){
                    return b.name.localeCompare(a.name)
                 }
            }

            newSortData = tempProducts.sort(sortingProducts)

            state.filtered_products = newSortData
         },
         setFilterValue : (state, action) =>{
            let {name, value} = action.payload
             state.filters = {...state.filters, [name] : value}
         },
         setFilterProducts : (state) =>{
            let {all_products} = state
            let tempProducts = [...all_products]

            const {text, category, company, color, price} = state.filters

            if (text){
                tempProducts = tempProducts.filter((elem) => elem.name.toLowerCase().includes(text))
            }
            if (category !== 'all'){
                tempProducts = tempProducts.filter((elem) => elem.category === category)
            }
            if (company !== 'all'){
                tempProducts = tempProducts.filter((elem) => elem.company === company)
            }
            if (color !== 'all'){
                tempProducts = tempProducts.filter((elem) => elem.colors.includes(color))
            }
            if (price === 0) {
                tempProducts = tempProducts.filter(
                  (curElem) => curElem.price == price
                );
              } else {
                tempProducts = tempProducts.filter(
                  (curElem) => curElem.price <= price
                );
              }

            state.filtered_products = tempProducts
         },
         clearFilters : (state) =>{
             state.filters = {
                ...state.filters,
                text: "",
                category: "all",
                company: "all",
                color: "all",
                maxPrice: state.filters.maxPrice,
                price: state.filters.maxPrice,
                minPrice: 0,
             }
         }
    }
})

export const {loadFilterProducts, setGridView, setListView, setSortingValue, setSortingProducts, setFilterProducts, setFilterValue, clearFilters} = FilterSlice.actions

export const FilterReducer = FilterSlice.reducer