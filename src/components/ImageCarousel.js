import React from "react";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient("https://fwfjgiktqvipjjgrqljc.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ3ZmpnaWt0cXZpcGpqZ3JxbGpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODg5MjY4NjksImV4cCI6MjAwNDUwMjg2OX0.V0sGPO1EVg0O-7j3HhCvVRVmw9TXZ5swenv1DhXDp1M");
const IMAGE_PATH = "https://fwfjgiktqvipjjgrqljc.supabase.co/storage/v1/object/public/Swing&Slide/";

function ImageCarousel(p) {
    // console.log('this is imagecarousel at ' + new Date());
    
    useEffect(() => {
        getImages();
      }, []);

    const [images, setImages] = useState([]);
    async function getImages() {
        let { data } = await supabase.from("playground_image")
                                    .select("id, filename")
                                    .eq('playground_id', p.playgroundId)
                                    .order('order', { ascending: true });
        if(data.length < 1) {
            data = [{
                id:p.playgroundId,
                filename:'thumb-default.jpg'
            }]
        }
        setImages(data);
    }

    let indicators = [], carousels = [];
    images.forEach((image, index)=>{
        indicators.push(
            <button 
                type="button" 
                data-bs-target={"#"+p.playgroundId} 
                data-bs-slide-to={index}
                className={index===0?'active':''} 
                aria-current={index===0?'true':''} 
                aria-label={p.playgroundName + index}
                key={"indicator="+image.id}>
            </button>
        );

        carousels.push(
            <div className={'carousel-item ' + (index===0?'active':'')} key={"slide="+image.id}>
                <img 
                    src={IMAGE_PATH+image.filename} 
                    className="d-block w-100" 
                    alt={p.playgroundName + ' ' + index.toString()}
                    onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src=IMAGE_PATH+'thumb-default.jpg';
                      }}>
                </img>
            </div>
        );
    })

    return (
        <div id={p.playgroundId} className="carousel slide">
        <div className="carousel-indicators">
            {indicators}
        </div>
        <div className="carousel-inner">
            {carousels}
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target={"#"+p.playgroundId} data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target={"#"+p.playgroundId} data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
        </button>
        </div>
    );

    /*
    return (
        <div id={p.playgroundId} className="carousel slide">
        <div className="carousel-indicators">
            <button type="button" data-bs-target={"#"+p.playgroundId} data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target={"#"+p.playgroundId} data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target={"#"+p.playgroundId} data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div className="carousel-inner">
            <div className="carousel-item active">
            <img src="https://fwfjgiktqvipjjgrqljc.supabase.co/storage/v1/object/public/Swing&Slide/thumb-LionsPark.jpg" className="d-block w-100" alt="..."></img>
            </div>
            <div className="carousel-item">
            <img src="https://fwfjgiktqvipjjgrqljc.supabase.co/storage/v1/object/public/Swing&Slide/thumb-TownCenterPark.jpg" className="d-block w-100" alt="..."></img>
            </div>
            <div className="carousel-item">
            <img src="https://fwfjgiktqvipjjgrqljc.supabase.co/storage/v1/object/public/Swing&Slide/thumb-BlueMountainPark.jpeg" className="d-block w-100" alt="..."></img>
            </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target={"#"+p.playgroundId} data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target={"#"+p.playgroundId} data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
        </button>
        </div>
    );
    */

}

export default ImageCarousel;