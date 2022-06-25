import React from 'react';

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import MyLoader from "../components/PizzaBlock/Skeleton";
import Pagination from '../components/Pagination';

export const Home = ({searchValue}) => {
    const [ items, setItems ] = React.useState([]); 
    const [ isLoading, setIsLoading ] = React.useState(true);
    const [ categoryId, setCategoryId ] = React.useState(0);
    const [ sortType , setSortType ] = React.useState({
      name: 'популярности',
      sortProp: 'rating'
    });

    // console.log(sortType)
    // console.log(searchValue)

    const order = sortType.sortProp.includes('-') ? 'asc' : 'desc';
    const sortBy = sortType.sortProp.replace('-', '');
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `search=${searchValue}` : '';
    
    const pizzas = items
      // .filter((obj) => {
      //   if (obj.title.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())) {
      //     return true
      //   }
      //     return false
      //   })
      .map((obj) => <PizzaBlock key={obj.id} {...obj}/>);
    const skeletons = [...new Array(6)].map((_, index) => <MyLoader key={index}/>);
    
    React.useEffect(() => {
        setIsLoading(true)
        fetch(`https://62b4e8a3da3017eabb127d73.mockapi.io/items?${category}&${search}&sortBy=${sortBy}&order=${order}`)
            .then((res) => res.json())
            .then((json) => {
                setItems(json);
                setIsLoading(false);
            });
            window.scrollTo(0, 0)
            }, [categoryId, sortType, searchValue]);
            
    return (
        <div className='container'>
            <div className="content__top">
              <Categories value={categoryId} onChangeCategory={(i) => setCategoryId(i)}/>
              <Sort sortValue={sortType} onChangeSort={(i) => setSortType(i)}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
              {
                // items.map(obj => isLoading ? <MyLoader/> : <PizzaBlock key={obj.id} {...obj}/>)
                isLoading 
                  ? skeletons
                  : pizzas
              }
            </div>
            <Pagination/>  
        </div>
    )
}