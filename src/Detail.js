import React from "react";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { FACILITIES } from "./constants/Constants";
import Playground from "./Playground";
import Map from "./components/Map";
import { Wrapper } from "@googlemaps/react-wrapper";
import Gallery from "./components/Gallery";

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_SUPABASE_KEY);


function Detail(p) {
    // path에 id를 달고 들어온 경우. share 
    const {id} = useParams();
    useEffect(() => {
      console.log('id useEffect ' + id)
      if(id !== null && id !== undefined && id.length > 0) {
        console.log(id);
        getPlaygroundDetail();
      }

    //   const { data } = supabase.from("playground")
    //                   .select("id, name, location, " + Object.keys(FACILITIES).toString())
    //                   .eq('id', id);
    //   console.log(data);
    }, []);

    const [playground, setPlayground] = useState(null);
    async function getPlaygroundDetail() {
        const { data } = await supabase.from("playground")
                      .select("id, name, location, " + Object.keys(FACILITIES).toString())
                      .eq('id', id);
        console.log(data);
        console.log(data.length)
        if(data.length>0) {
            console.log(data[0])
            setPlayground(data[0]);
        }
        //todo: 데이터 없을 경우 정해야함
    }

    const [images, setImages] = useState([]);
    const [selIndex, setSelIndex] = useState([]);
    function setGallery(images, selIndex) {
        const newImages = [...images]; // 클리시마다 새로운 images 로 인식하기 위한.. 꼼수
        setImages(newImages);
        setSelIndex(selIndex);
      }

    return (
        <div className="playground-detail-container">
            <Gallery imageList={images} selIndex={selIndex} />
            {(playground !== null)?
            (
            <Playground 
                key={playground.id}
                playground={playground}
                setGallery={setGallery}
                />
            ):'' }
            <Wrapper apiKey={process.env.REACT_APP_GOOGLEMAPS_KEY}>
                <Map point={(playground !== null)?playground.location.map_position:null} />
            </Wrapper>
        </div>
    );
}

export default Detail;