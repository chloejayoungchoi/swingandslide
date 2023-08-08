import React, { Children, useCallback, useEffect, useRef, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useNavigate, useLocation } from "react-router-dom";

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_SUPABASE_KEY);

function Map() {
    const [playgrounds, setPlaygrounds] = useState([]);
    const [map, setMap] = useState(null);
    const ref = useRef();
    const navigate = useNavigate();

    const location = useLocation();
    const selectedPoint = location.state;

    async function getPlaygrounds() {
        let query = supabase.from("playground")
                          .select("id, name, location->map_position, location ")
                          .eq('isVisible', true)
                          .neq('location->map_position', null)
                          .order('modified_at', { ascending: false });
        const { data } = await query;
        setPlaygrounds(data);
      }

    useEffect(()=>{
        getPlaygrounds();
        // const point = { lat: 49.28413959871361, lng: -123.1300863557788}; // vancouver
        const point = selectedPoint?selectedPoint:{ lat: 49.248025491628304, lng: -122.98289123571041}; // burnaby
        const newMap = new window.google.maps.Map(ref.current, {
            center : point,
            zoom : 10,
            gestureHandling: "greedy"
        });     
        setMap(newMap);

    },[]);

    var activeInfoWindow= null;
    function search(id) {
        navigate("/playground", {
            state: {id: id}
        });
    }
    useEffect(()=>{
        const marker_icon = process.env.REACT_APP_SUPABASE_STORAGE_DEFAULT_PATH + "map-flag.png";
        
        playgrounds.forEach((playground)=>{
            const marker = new window.google.maps.Marker({
                position: playground.map_position,
                title: playground.name,
                icon: marker_icon
            });

            marker.addListener("click", () => {
                if (activeInfoWindow) {
                    activeInfoWindow.close();
                }

                let content = document.createElement('div');
                content.innerHTML = playground.name;
                content.onclick = function(){search(playground.id)};
                content.style="font-family:Work;font-size:15px;font-weight:400;padding:0.5rem;"

                const infoWindow = new window.google.maps.InfoWindow({
                    content: content,
                    ariaLabel: playground.name,
                });
                
                infoWindow.open({
                    anchor: marker,
                    map,
                });

                activeInfoWindow = infoWindow;
            });

            if(isSamePoint(playground.map_position, selectedPoint)) {
                new window.google.maps.event.trigger( marker, 'click' );
            }

    
            marker.setMap(map);
        });

        
    },[playgrounds]);

    function isSamePoint(a, b) {
        if(a === null) return false;
        if(b === null) return false;
        return a.lat === b.lat && a.lng === b.lng 
    }

    return (
        <div 
            ref={ref} 
            id="map" 
            style={{width:"100%", height: "100vh"}} />
    )
}

export default Map;