import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Playground from "./Playground";
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { BiSearch, BiX, BiRefresh } from "react-icons/bi";
import { FACILITIES } from "./constants/Constants";

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_SUPABASE_KEY);

function PlaygroundList() {
  // console.log('this is app at ' + new Date());
  const [playgrounds, setPlaygrounds] = useState([]);

  const location = useLocation();
  const conditions = location.state;

  let conditionCard = ``;
  if(conditions !== null) {
    let searchFacilityList = Object.keys(FACILITIES).map((key) => 
      // conditions[key]?<span className="pe-3 text-muted text-14" key={"search-tag-"+key}>{FACILITIES[key].icon} {FACILITIES[key].title}</span>:null
      conditions[key]?<span className="badge rounded-pill tag-light m-0 me-1" key={"search-tag-"+key}>{FACILITIES[key].icon} {FACILITIES[key].title}</span>:null
    );
    searchFacilityList = searchFacilityList.filter((tag)=> tag !== null);
    // console.log(searchFacilityList)
    // if(Array.isArray(searchFacilityList) && searchFacilityList.length>0){
    //   searchFacilityList = [<hr className="my-1"/>,  ...searchFacilityList];
    // }

    conditionCard = (
      <div>
        <div className="card search-info-container mt-2 mb-0 p-2">
          <span><BiSearch className="me-2" />
          <span className="me-1">{conditions.keyword===null?'':conditions.keyword}</span>
          <Link to="/" className="text-gray float-end"><BiX className="fs-4" /></Link>
          {conditions.tag?<span className="badge rounded-pill tag-primary m-0">#{conditions.tag}</span>:''}
          {searchFacilityList}
          </span>
        </div>
        <div className="row ps-3 text-center">
        <Link to="/search" className="text-primary">new search<BiRefresh /></Link>
        </div>
      </div>
    );
  }

  useEffect(() => {
    getPlaygrounds();
  }, [conditions]);

  async function getPlaygrounds() {
    let query = supabase.from("playground")
                      .select("id, name, location, " + Object.keys(FACILITIES).toString());
    if(conditions !== null) {
      Object.keys(conditions).forEach((key, index)=>{
        if(key === 'tag') {
          query = supabase.from("playground_by_tag")
                          .select("id, name, location, " + Object.keys(FACILITIES).toString())
                          .eq('tag', conditions[key]);
            
        }else if(key === 'keyword') {
          // query = query.like("name", '%'+conditions[key]+'%');
          let searchKeywords = conditions[key];
          if(searchKeywords.includes(' ')) {
            searchKeywords = searchKeywords.replaceAll(' ', ' | ');
          }
          query = query.textSearch('search_columns', searchKeywords);
          // query = query.or(`name.fts(english).${conditions[key]}, location->>city.fts(english).${conditions[key]}`)
        }else {
          query = query.eq(key, conditions[key]);
        }
      });
    }
    query = query.eq('isVisible', true);
    query = query.order('modified_at', { ascending: false });
    const { data } = await query;
    if(data===null || !Array.isArray(data)) {
      setPlaygrounds([]);
    }else {
      setPlaygrounds(data);
    }
  }
  
  const playgroundList = playgrounds.map((p) => 
    <Playground 
      key={p.id}
      playground={p}
    />
  );

  const navigate = useNavigate();
  function contribute() {
    navigate("/contact");
  }
  
  return (
    <div>
      {conditionCard}
      <div className="playground-container">
        {playgroundList}
        <div className="no-playground">Sorry, no playground found at this moment.</div>
      </div>
      <div className="contribute-section d-flex align-items-center">
        <div className="contribute-content">
          <div className="title">
            Do you want to contribute?
          </div>
          <p>There are still many amazing playgrounds that we haven't discovered yet.</p>
          <div className="text-end">
            <button type="button" className="btn btn-secondary contribute-button" onClick={contribute}>Contribute</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaygroundList;
