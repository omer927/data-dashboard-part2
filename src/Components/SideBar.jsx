function SideBar({ filterByPrice }) {
  return (
    <div className="sideBar">
      <h3>Filters</h3>
      <label>Max Price Per Serving:</label>
      <select onChange={(e) => filterByPrice(e.target.value)}>
        <option value="all">All Prices</option>
        <option value="50">Under $0.50</option>
        <option value="100">Under $1.00</option>
        <option value="200">Under $2.00</option>
      </select>
    </div>
  );
}
export default SideBar;