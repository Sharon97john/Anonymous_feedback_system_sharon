import React, { useState } from "react";
import "./SearchDepartment.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
const SearchDepartment = (props) => {
  const [search_name, setName] = useState(" ");

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    // const name = target.name;

    setName(value);
  };

  const searchDepartment = (e) => {
    e.preventDefault();
    if (search_name) {
      props.onSearchDepartment(search_name);
    }
  };
  // handleInputChange = handleInputChange.bind(this);

  return (
    <div className="search-form container-fluid pb-3 m-0">
      <div className="row justify-content-around">
        <div className="col-5 col-xs-12">
          <form onSubmit={(e) => searchDepartment(e)}>
            <div className="input-wrap">
              <input
                name={search_name}
                placeholder="Enter Department Name"
                onChange={handleInputChange}
              />
              <button type="submit" className="common-btn-style">
                <FontAwesomeIcon className="fa-icon" icon={faMagnifyingGlass} />
                Search Department
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default SearchDepartment;
