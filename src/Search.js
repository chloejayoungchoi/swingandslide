import React from "react";
import { BiSearch } from "react-icons/bi";
import SearchCheckbox from "./components/SearchCheckbox";
import { FACILITIES, SEARCH_TAGS } from "./constants/Constants";
import { useNavigate } from "react-router-dom";

function Search() {
    const navigate = useNavigate();
    const checkboxList = Object.values(FACILITIES).map((f) => 
        <SearchCheckbox 
            key={f.column}
            title={f.title}
            column={f.column}
            icon={f.icon}
            changeCondition={changeCondition}
        />
    );

    const tagList = SEARCH_TAGS.map((t) => 
        <span className="badge rounded-pill search-tag-primary" onClick={searchByTag} key={t}>#{t}</span>
    );

    let searchCondition = {};

    function inputKeyword(e) {
        searchCondition['keyword'] = e.target.value;
    }
    function activeEnter(e) {
        if(e.key === "Enter") {
          search();
        }
    }
    function changeCondition(key, val) {
        searchCondition[key] = val;
    }
    function searchByTag(e) {
        navigate("/playground", {
            state: {'tag':e.target.innerText.substring(1)}
        });
    }

    function search(e) {
        navigate("/playground", {
            state: searchCondition
        });
      }
    
    return (
        <div className="p-3">
            <div className="input-group mb-4">
                <input 
                    type="text" 
                    className="form-control keyword-input" 
                    aria-label="Search" 
                    placeholder="Search Playground" 
                    onChange={inputKeyword}
                    onKeyDown={activeEnter}
                />
                <span 
                    className="input-group-text keyword-icon cursor-pointer"
                    onClick={search}>
                    <BiSearch className="fs-6" />
                </span>
            </div>
            <h4>Facilities</h4>
            <div className="row">
                {checkboxList}
            </div>
            <div className="row col p-2 mb-3">
                <button 
                    type="button" 
                    className="btn btn-secondary search-btn"
                    onClick={search}>
                    Search
                </button>
            </div>
            <h4>Tags</h4>
            <div className="row col p-2">
                {tagList}
            </div>
        </div>

    );
}

export default Search;