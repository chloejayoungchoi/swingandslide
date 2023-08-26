import React from "react";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { FACILITIES } from "./constants/Constants";
import Playground from "./Playground";
import { Wrapper } from "@googlemaps/react-wrapper";
import Gallery from "./components/Gallery";
import MapInDetail from "./components/MapInDetail";

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_SUPABASE_KEY);


function Detail(p) {
    const {id} = useParams();
    useEffect(() => {
      if(id !== null && id !== undefined && id.length > 0) {
        getPlaygroundDetail();
      }
    }, []);

    const [playground, setPlayground] = useState(null);
    async function getPlaygroundDetail() {
        const { data } = await supabase.from("playground")
                      .select("id, name, location, " + Object.keys(FACILITIES).toString())
                      .eq('id', id);
        if(data.length>0) {
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
                <MapInDetail playground={playground} />
            </Wrapper>
        </div>
    );
}

export default Detail;