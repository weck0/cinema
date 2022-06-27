const Select = (props) => {
  const handleChange = (event) => {
    props.onChange(event.target.value);
  };

  return (
    <div className="filter-container">
      <div>Filter by Category:</div>
      <div>
        <select name="category-list" id="category-list" onChange={handleChange}>
          <option value="All">All</option>
          {props.categories.map((category, index) => {
            return (
              <option key={index} value={category}>
                {category}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

export default Select;
