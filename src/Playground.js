import React from "react";
import { BiMap } from "react-icons/bi";
import ImageCarousel from "./components/ImageCarousel";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { FACILITIES } from "./constants/Constants";
import { useNavigate } from "react-router-dom";

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_SUPABASE_KEY);



function Playground(p) {
    // console.log('this is playground at ' + new Date() + " ; " + Object.keys(p).length); 
    const navigate = useNavigate();
    const pg = p.playground;
    let facilityList = [];
    for (const key in pg) {
        if(key.indexOf('has')>-1 && pg[key] === true) {
            facilityList.push(
                <div className="col-6 facility-text" key={pg['id'] + "-" + key}>
                    {FACILITIES[key].icon} {FACILITIES[key].title}
                </div>
            )
        }
    }

    let labels = [];
    // Right side
    let createdDays = Math.round(((new Date()) - (new Date(pg.created_at))) / (1000 * 60 * 60 * 24));
    let modifiedDays = Math.round(((new Date()) - (new Date(pg.modified_at))) / (1000 * 60 * 60 * 24));
    if(createdDays < 7) {
        labels.push(<span className="label-right" key="new">new</span>); // new
    }
    if(modifiedDays < createdDays && modifiedDays < 7) {
        labels = [];
        labels.push(<span className="label-right bg-yellow" key="updated">updated</span>); // updated
    }

    // left side
    // labels.push(<span className="label-left" key="event">event</span>); // event

    function searchByTag(e) {
        navigate("/playground", {
            state: {'tag':e.target.innerText.substring(1)}
        });
    }

    function goToMap(point) {
        navigate("/map", {
            state: point
        });
    }

    useEffect(() => {
        getTags();
      }, []);

    const [tags, setTags] = useState([]);
    async function getTags() {
        const { data } = await supabase.from("playground_tag").select().eq('playground_id', pg['id']).order('order', { ascending: true });
        setTags(data);
    }

    const tagList = tags.map((t) => 
        <span className="badge rounded-pill tag-primary cursor-pointer" key={t.id} onClick={searchByTag}>#{t.tag}</span>
    );

    function setGallery(images, selIndex) {
        p.setGallery(images, selIndex);
    }

    return (
        <div className="card playground m-3" key={pg.id}>
            <ImageCarousel 
                playgroundId={pg.id}
                playgroundName={pg.name}
                setGallery={setGallery}
            />
            <div className="label">
                {labels}
            </div>
            <div className="card-body">
                <h5 className="card-title mb-0">{pg.name}</h5>
                <span className="text-muted" onClick={()=>{goToMap(pg.location.map_position)}}><BiMap /> {pg.location.city}, {pg.location.province}, {pg.location.country}</span>
                <p className="card-text"></p>
                <div className="row">
                   {facilityList}
                </div>
                <div className="mt-3">
                    {tagList}
                </div>
            </div>
        </div>
    );
}
export default Playground;
  