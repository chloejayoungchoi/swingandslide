import React from "react";
import { useEffect, useState, useRef } from "react";
import { createClient } from "@supabase/supabase-js";
import bootstrapMin from "bootstrap/dist/js/bootstrap.min";

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_SUPABASE_KEY);
const IMAGE_PATH = process.env.REACT_APP_SUPABASE_STORAGE_DEFAULT_PATH;

function ImageCarousel(p) {
    // console.log('this is imagecarousel at ' + new Date());
    const refCarousel = useRef();

    useEffect(() => {
        getImages();
        const carouselElements = document.querySelectorAll('.carousel');
        carouselElements.forEach((element) => {
            const carousel = bootstrapMin.Carousel.getOrCreateInstance(element);
            carousel.pause();
        });
    }, []);

    const [images, setImages] = useState([]);
    const [adjHeight, setAdjHeight] = useState(1);
    async function getImages() {
        let { data } = await supabase.from("playground_image")
                                    .select("id, filename, width, height")
                                    .eq('playground_id', p.playgroundId)
                                    .order('order', { ascending: true });
        if(data.length < 1) {
            data = [{
                id:p.playgroundId,
                filename:'thumb-default.jpg'
            }]
        }
        setImages(data);

        let ratio = 1, newHeight = data[0].height;
        ratio = (refCarousel.current.offsetWidth)/data[0].width;
        newHeight = data[0].height*ratio;
        setAdjHeight(Math.round(newHeight));
    }

    // indicators 주석처리 230726
    let indicators = [], carousels = [];
    images.forEach((image, index)=>{
        // indicators.push(
        //     <button 
        //         type="button" 
        //         data-bs-target={"#"+p.playgroundId} 
        //         data-bs-slide-to={index}
        //         className={index===0?'active':''} 
        //         aria-current={index===0?'true':''} 
        //         aria-label={p.playgroundName + index}
        //         key={"indicator="+image.id}>
        //     </button>
        // );

        carousels.push(
            <div className={'carousel-item ' + (index===0?'active':'')} key={"slide="+image.id}>
                <img 
                    src={IMAGE_PATH+image.filename} 
                    className="d-block w-100" 
                    style={{ height:`${adjHeight}px` }}
                    alt={p.playgroundName + ' ' + index.toString()}
                    data-index={index}
                    onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src=IMAGE_PATH+'thumb-default.jpg';
                      }}>
                </img>
            </div>
        );
    });

    function loadGallery() {
        let selIndex = 0;
        try {
            selIndex = refCarousel.current.querySelectorAll('div.carousel-item.active img')[0].dataset.index;
        }catch(e) { }
        p.setGallery(images, selIndex);
    }

    const showControl = (images.length > 1)?'':' d-none';
    return (
        <div id={p.playgroundId} className="carousel slide" ref={refCarousel} >
        {/* <div className="carousel-indicators">
            {indicators}
        </div> */}
        <div className="carousel-inner" onClick={loadGallery}>
            {carousels}
        </div>
        <button className={"carousel-control-prev" + showControl} type="button" data-bs-target={"#"+p.playgroundId} data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
        </button>
        <button className={"carousel-control-next" + showControl} type="button" data-bs-target={"#"+p.playgroundId} data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
        </button>
        </div>
    );
}

export default ImageCarousel;