import React, { useEffect, useRef, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        const point = selectedPoint?selectedPoint:{ lat: 49.248025491628304, lng: -122.98289123571041}; // burnaby
        const newMap = new window.google.maps.Map(ref.current, {
            center : point,
            zoom : 10,
            gestureHandling: "greedy",
            fullscreenControl: false,
            mapTypeControlOptions: {
                position: window.google.maps.ControlPosition.LEFT_BOTTOM,
            },
        });     
        setMap(newMap);

        const nearMeButton = document.createElement("button");
        nearMeButton.textContent = "Near Me";
        nearMeButton.classList.add("btn");
        nearMeButton.classList.add("btn-secondary");
        nearMeButton.classList.add("rounded-5");
        nearMeButton.classList.add("text-white");
        nearMeButton.classList.add("mt-5");
        newMap.controls[window.google.maps.ControlPosition.TOP_CENTER].push(nearMeButton);

        const meIcon = {
            path: window.google.maps.SymbolPath.CIRCLE,
            fillColor: "blue",
            fillOpacity: 0.6,
            strokeWeight: 0,
            rotation: 0,
            scale: 12,
        };
        let meMarker = null;

        nearMeButton.addEventListener("click", () => {
            nearMeButton.textContent = "loading...";

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const pos = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                        };
                        newMap.setCenter(pos);

                        if(meMarker !== null) {
                            meMarker.setMap(null);
                            meMarker=null;
                        }

                        meMarker = new window.google.maps.Marker({
                            position: pos,
                            title: 'You are here.',
                            icon: meIcon,
                            animation: window.google.maps.Animation.BOUNCE,
                        });
                        meMarker.setMap(newMap);
                        newMap.setZoom(13)
                        nearMeButton.textContent = "Near Me";

                    },
                    () => {
                        toast.error("Oops! Please allow me to access your location.", {
                            position: toast.POSITION.BOTTOM_CENTER
                        });
                        nearMeButton.textContent = "Near Me";
                    }
                );
            }else {
                toast.error("Your browser doesn't support geolocation.", {
                    position: toast.POSITION.BOTTOM_CENTER
                });
            }
        });

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
                content.style="font-family:Work;padding:0.5rem;"

                let name = document.createElement('p');
                name.innerHTML = playground.name;
                name.onclick = function(){search(playground.id)};
                name.style="font-size:17px;font-weight:400:margin-bottom:1rem;"

                let aTag = document.createElement('a');
                aTag.innerHTML = 'Get directions';
                aTag.target = "_blank";
                // aTag.href = 'https://www.google.com/maps/search/?api=1&query=waterfront+park'; // 이름으로 검색
                aTag.href = `https://www.google.com/maps/dir/?api=1&destination=${playground.map_position.lat},${playground.map_position.lng}`; // 경로
                // aTag.href = `https://maps.google.com/maps?ll=${playground.map_position.lat},${playground.map_position.lng}&z=12&t=m&hl=en-US&gl=US&mapclient=apiv3&cid=615890954450113111`; // cid까지 잘 넣어야 함

                content.append(name);
                content.append(aTag);

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
        <>
        <div 
            ref={ref} 
            id="map" 
            style={{width:"100%", height: `calc(100vh - 70px)`}} />
        <ToastContainer />
        </>
    )
}

export default Map;