import React, { useState } from "react";
import "./style.scss";

export default function ShopFilter({
  filter,
  setFilter,
}: {
  filter: any;
  setFilter: any;
}) {
  const filterArrayContent = {
    title: "category",
    content: ["accessories", "apparel", "bags", "drinkware", "five"],
  };
  const filterArray = [
    filterArrayContent,

  ];
  return (
    <div className="shop-filter">
      <div className="header">
        <p>Sort</p>
        <p>Filter</p>
        <div className="filter-mobile">
          <h4>filter</h4>
          {filterArray.map((item: any, index) => {
            return (
              <FilterDropDown
                item={item}
                key={index}
                filter={filter}
                setFilter={setFilter}
                control={item.title}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

//memomize the function below "USE MEMO"
const FilterDropDown = ({
  item,
  filter,
  setFilter,control
}: {
  item: { title: string; content: [string] };
  filter: any;
  setFilter: any;
  control:any
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const createFilter = (control:any,item:any,) => {
     setFilter({...filter,[control]:item});
     console.log(filter)
  }
  return (
    <div>
      {" "}
      <p
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        {item.title}
      </p>
      {isOpen &&
        item.content.map((item, index,array) => {
          return <p onClick={()=>{createFilter(control,item)}} key={index}>{item}</p>;
        })}
    </div>
  );
};
