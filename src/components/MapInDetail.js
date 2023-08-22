import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function MapInDetail(p) {
    console.log("*************");
    console.log(p)
    const ref = useRef();


    useEffect(()=>{
        if(p.playground === null) return;
        let selected = p.playground;
        let selectedPoint = selected.location.map_position;
        console.log('userEffect')

        // 지도 만들기
        const point = selectedPoint?selectedPoint:{ lat: 49.248025491628304, lng: -122.98289123571041}; // burnaby
        const newMap = new window.google.maps.Map(ref.current, {
            center : point,
            zoom : 11,
            gestureHandling: "greedy",
            mapTypeControl: false,
            fullscreenControl: false,
            streetViewControl: false,
            mapTypeControlOptions: {
                position: window.google.maps.ControlPosition.LEFT_BOTTOM,
            },
        });     


        // 마커 만들기
        const marker_icon = process.env.REACT_APP_SUPABASE_STORAGE_DEFAULT_PATH + "map-flag.png";
        const marker = new window.google.maps.Marker({
            position: selectedPoint,
            title: selected.name,
            icon: marker_icon
        });
        marker.setMap(newMap);

        marker.addListener("click", () => {
            let content = document.createElement('div');
            content.style="font-family:Work;padding:0.5rem;"

            let name = document.createElement('p');
            name.innerHTML = selected.name;
            // name.onclick = function(){search(selected.id)};
            name.style="font-size:17px;font-weight:400:margin-bottom:1rem;"

            let aTag = document.createElement('a');
            aTag.innerHTML = 'Get directions';
            aTag.target = "_blank";
            aTag.href = `https://www.google.com/maps/dir/?api=1&destination=${selected.location.map_position.lat},${selected.location.map_position.lng}`; // 경로

            content.append(name);
            content.append(aTag);

            const infoWindow = new window.google.maps.InfoWindow({
                content: content,
                ariaLabel: selected.name,
            });
            
            infoWindow.open({
                anchor: marker,
                newMap,
            });

        });

        return() => {
        }

    },[p]);

    return (
        <div 
            ref={ref} 
            id="map" 
            className="map"/>
    )
}

export default MapInDetail;