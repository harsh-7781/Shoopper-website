import React, { useContext, useState } from 'react'
import './CSS/ShopCategory.css'
import {ShopContext} from '../Context/ShopContext'
import dropdown_icon from '../Components/Assets/dropdown_icon.png'
import Item from '../Components/Item/Item'

const ShopCategory = (props) => {

  const {all_product} = useContext(ShopContext);

  const [selectedRange, setSelectedRange] = useState({ min: 0, max: Infinity });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);



  // Price Ranges
  const priceRanges = [
    { label: "All", min: 0, max: Infinity },
    { label: "$20-$40", min: 20, max: 40 },
    { label: "$50-$60", min: 50, max: 60 },
    { label: "$70-$100", min: 70, max: 100 },
  ];


  const handleFilter = (min, max) => {
    setSelectedRange({ min, max });
    setIsDropdownOpen(false); // Close dropdown after selection
  };

  return (
    <div className='shop-category'>
       <img className='shopcategory-banner' src={props.banner} alt="" />
       <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1-12</span>  out of 36 products
        </p>
        {/* Sort Dropdown */}
        <div className="shopcategory-sort-container">
          <div className="shopcategory-sort" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            <span>Sort by Price</span>
            <img src={dropdown_icon} alt="" className={isDropdownOpen ? "rotate-icon" : ""} />
          </div>
          {isDropdownOpen && (
            <div className="sort-dropdown">
              {priceRanges.map((range, index) => (
                <div 
                  key={index} 
                  className="sort-option" 
                  onClick={() => handleFilter(range.min, range.max)}
                >
                  {range.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="shopcategory-products">
        {all_product
          .filter(
            (item) =>
              props.category.toLowerCase() === item.category.toLowerCase() &&
              item.new_price >= selectedRange.min &&
              item.new_price <= selectedRange.max
          )
          .map((item, i) => (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          ))}
      </div>

       <div className="shopcategory-loadmore">
        Explore more
       </div>

    </div>
  )
}

export default ShopCategory
