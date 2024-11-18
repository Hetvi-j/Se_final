

import React, { useState } from "react";
import { useSearch } from "../../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  const [values, setValues] = useSearch();
  const [suggestions, setSuggestions] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedIndex >= 0) {

      const selectedSuggestion = suggestions[selectedIndex];
      setValues({ ...values, keyword: selectedSuggestion.name });
    }

    try {
      const { data } = await axios.get(`/api/v1/product/search/${values.keyword}`);
      setValues({ ...values, results: data.suggestions });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = async (e) => {
    const keyword = e.target.value;
    setValues({ ...values, keyword });

    if (keyword.length >= 3) {
      try {
        const { data } = await axios.get(`/api/v1/product/search/${keyword}`);
        setSuggestions(data.suggestions); 
      } catch (error) {
        console.log(error);
      }
    } else {
      setSuggestions([]); 
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setSelectedIndex((prevIndex) => Math.min(prevIndex + 1, suggestions.length - 1));
      e.preventDefault(); 
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
      e.preventDefault(); 
    } else if (e.key === "Tab") {
      if (selectedIndex >= 0) {
        
        setValues({ ...values, keyword: suggestions[selectedIndex].name }); 
        setSuggestions([]); 
        e.preventDefault(); 
      }
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <form className="d-flex" role="search" onSubmit={handleSubmit}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={values.keyword}
          onChange={handleChange}
          onKeyDown={handleKeyDown} 
          style={{ width: "300px" }} 
        />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>
      {suggestions.length > 0 && (
        <ul style={{
          border: "1px solid #ccc",
          borderRadius: "4px",
          listStyle: "none",
          padding: 0,
          margin: 0,
          maxHeight: "150px", 
          overflowY: "auto", 
          position: "absolute", 
          zIndex: 1000, 
          backgroundColor: "white",
          width: "300px", 
        }}>
          {suggestions.map((suggestion, index) => (
            <li
              key={suggestion.id} 
              onMouseDown={() => {
                setValues({ ...values, keyword: suggestion.name });
                setSuggestions([]);
              }}
              style={{
                padding: "8px 12px",
                cursor: "pointer",
                backgroundColor: selectedIndex === index ? "#007bff" : "white", 
                color: selectedIndex === index ? "white" : "black",
              }}
            >
              {suggestion.name} 
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchInput;
