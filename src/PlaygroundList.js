import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Playground from "./Playground";
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { BiSearch, BiX, BiRefresh } from "react-icons/bi";
import { FACILITIES } from "./constants/Constants";
import Ads from "./components/Ads";
import Gallery from "./components/Gallery";

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_SUPABASE_KEY);

function PlaygroundList() {
  // console.log('this is app at ' + new Date());
  const [playgrounds, setPlaygrounds] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const LIMIT = 10;

  const location = useLocation();
  const [conditions, setConditions] = useState(location.state);

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
        <div className={"card search-info-container mt-2 mb-0 p-2 " + (('id' in conditions)?'d-none':'d-block')}>
          <span><BiSearch className="me-2" />
          <span className="me-1">{('key' in conditions)?'':conditions.keyword}</span>
          <div className="text-gray float-end" onClick={clearConditions}><BiX className="fs-4" /></div>
          {conditions.tag?<span className="badge rounded-pill tag-primary m-0">#{conditions.tag}</span>:''}
          {searchFacilityList}
          </span>
        </div>
        <div className="ps-3 text-center">
        <Link to="/search" className="text-secondary"><BiRefresh /> new search <BiRefresh /></Link>
        </div>
      </div>
    );
  }

  function clearConditions() {
    setConditions(null);
    setPlaygrounds([]);
    setOffset(0);
  }

  // home 메뉴 클릭시에 스크롤 탑
  useEffect(() => {
    if(location.pathname == '/') {
      window.scrollTo(0, 0);
    }
  }, [location]);

  useEffect(() => {
    setConditions(conditions);
    getPlaygrounds();
  }, [conditions, offset]);

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
    query = query.order('modified_at', { ascending: false })
    query = query.range(offset, offset+LIMIT-1);
    const { data } = await query;
    if(data===null || !Array.isArray(data)) {
      setPlaygrounds([]);
    }else {
      setPlaygrounds([...playgrounds, ...data]);
    }

    // 다음이 있는지 확인 (Load More button)
    {
      query.range(offset+LIMIT, offset+LIMIT);
      let { data } = await query;
      if(data.length>0) setHasNext(true);
      else setHasNext(false);
    }

  }
  
  const playgroundList = playgrounds.map((p) => 
    <Playground 
      key={p.id}
      playground={p}
      setGallery={setGallery}
    />
  );

  /* 광고 삽입
  for(let i=0; i<playgroundList.length; i++) {
    if(i>0 && i%4==0) {
      playgroundList.splice(i, 0, <Ads key={'ads' + i} />)
    }
  }
  playgroundList.splice(1, 0, <Ads key={'ads' + 0} />)
  */

  const [images, setImages] = useState([]);
  const [selIndex, setSelIndex] = useState([]);

  function setGallery(images, selIndex) {
    const newImages = [...images]; // 클리시마다 새로운 images 로 인식하기 위한.. 꼼수
    setImages(newImages);
    setSelIndex(selIndex);
  }

  const navigate = useNavigate();
  function contribute() {
    navigate("/contact");
  }

  function loadMore() {
    setOffset(offset + LIMIT);
  }

  return (
    <div>
      {conditionCard}
      <Gallery imageList={images} selIndex={selIndex} />
      <div className="playground-container">
        {playgroundList}
        <div className="no-playground d-none">Sorry, no playground found at this moment.</div>
      </div>
      <div className="text-center m-3">
          <button 
              type="button" 
              className="btn btn-secondary w-100"
              onClick={loadMore}
              style={{display:`${hasNext?'block':'none'}`}}
              >
              Load More
          </button>
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
