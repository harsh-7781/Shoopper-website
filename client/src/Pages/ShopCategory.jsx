import React, { useContext, useState } from "react";
import "./CSS/ShopCategory.css";
import { ShopContext } from "../Context/ShopContext";
import dropdown_icon from "../Components/Assets/dropdown_icon.png";
import Item from "../Components/Item/Item";

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);
  
  // Store sorting, search, and product visibility separately per category
  const [categoryFilters, setCategoryFilters] = useState({});
  const [categoryVisibleProducts, setCategoryVisibleProducts] = useState({});
  const [categorySearch, setCategorySearch] = useState({});

  // Price Ranges
  const priceRanges = [
    { label: "All", min: 0, max: Infinity },
    { label: "$20-$40", min: 20, max: 40 },
    { label: "$50-$60", min: 50, max: 60 },
    { label: "$70-$100", min: 70, max: 100 },
  ];

  // Get sorting range, search query, and visible products for the selected category
  const selectedRange = categoryFilters[props.category] || { min: 0, max: Infinity };
  const visibleProducts = categoryVisibleProducts[props.category] || 4;
  const searchQuery = categorySearch[props.category] || "";

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Handle Sorting (specific to category)
  const handleFilter = (min, max) => {
    setCategoryFilters((prev) => ({
      ...prev,
      [props.category]: { min, max },
    }));
    setIsDropdownOpen(false);
  };

  // Handle Search (specific to category)
  const handleSearch = (event) => {
    setCategorySearch((prev) => ({
      ...prev,
      [props.category]: event.target.value.toLowerCase(),
    }));
  };

  // Handle Explore More (specific to category)
  const handleExploreMore = () => {
    setCategoryVisibleProducts((prev) => ({
      ...prev,
      [props.category]: (prev[props.category] || 4) + 4,
    }));
  };

  // Filter & Sort Products (category-specific)
  const filteredProducts = all_product
    .filter(
      (item) =>
        props.category.toLowerCase() === item.category.toLowerCase() &&
        item.new_price >= selectedRange.min &&
        item.new_price <= selectedRange.max &&
        item.name.toLowerCase().includes(searchQuery)
    )
    .slice(0, visibleProducts);

  return (
    <div className="shop-category">
      <img className="shopcategory-banner" src={props.banner} alt="" />
      <div className="shopcategory-indexSort">
        {/* Search Bar */}
        <input
          type="text"
          className="search-bar"
          placeholder="Search products..."
          value={searchQuery}
          onChange={handleSearch}
        />

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
        {filteredProducts.map((item, i) => (
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

      {visibleProducts < all_product.filter(item => item.category.toLowerCase() === props.category.toLowerCase()).length && (
        <div className="shopcategory-loadmore" onClick={handleExploreMore}>
          Explore more
        </div>
      )}
    </div>
  );
};

export default ShopCategory;
