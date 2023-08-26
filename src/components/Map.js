import React, { useEffect, useRef, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_SUPABASE_KEY);

function Map(p) {
    const [playgrounds, setPlaygrounds] = useState([]);
    const [map, setMap] = useState(null);
    const ref = useRef();
    const navigate = useNavigate();
    const location = useLocation();
    let selectedPoint = location.state;
    let selectedId = p.playgroundid;

    async function getPlaygrounds() {
        let query = supabase.from("playground")
                          .select("id, name, location->map_position, location ")
                          .eq('isVisible', true)
                          .neq('location->map_position', null)
                          .order('modified_at', { ascending: false });
        const { data } = await query;
        setPlaygrounds(data);
    }

    function requestLocation() {
        return new Promise((resolve, reject) => {
            if (window.ReactNativeWebView) {
                window.ReactNativeWebView.postMessage(JSON.stringify({ type:"REQ", value: "REQ_ACCESS_FINE_LOCATION" }));
                resolve(true);
            } else {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                        (position) => {
                            resolve( {
                                lat: position.coords.latitude,
                                lng: position.coords.longitude,
                            });
                        },
                        () => {
                            reject(false);
                        }
                    );
                }else {
                    reject(false);
                }
            }
        });
    }

    useEffect(()=>{
        // 현재 위치 정보 가져오기
        requestLocation().then(
            (resolve) => {
                mePosition = resolve;
                // alert('reqeustLoction ' + mePosition)
                // nearMeButton.classList.remove("d-none");
                nearMeButton.textContent = "Near Me";
            },
            (reject) => {
                toast.warn("Oops! Please allow me to access your location.", {
                    position: toast.POSITION.BOTTOM_CENTER
                });
            }
        )

        // 놀이터 정보 가져오기
        getPlaygrounds();

        // 지도 만들기
        // const point = { lat: 49.28413959871361, lng: -123.1300863557788}; // vancouver
        const point = selectedPoint?selectedPoint:{ lat: 49.248025491628304, lng: -122.98289123571041}; // burnaby
        const newMap = new window.google.maps.Map(ref.current, {
            center : point,
            zoom : 10,
            gestureHandling: "greedy",
            mapTypeControl: false,
            fullscreenControl: false,
            streetViewControl: false,
            mapTypeControlOptions: {
                position: window.google.maps.ControlPosition.LEFT_BOTTOM,
            },
        });     
        setMap(newMap);

        // 앱인 경우 위치 정보 받기
        function handleMessage(e) {
            try {
                // alert('handleMessage: ' + e.data)
                let message = JSON.parse(e.data);
                if(message.type === "GRANTED") {
                    mePosition = message.value;
                }else {
                    toast.error("Please allow the location permission.", {
                        position: toast.POSITION.BOTTOM_CENTER
                    });
                }
            }catch(e) {
                console.error(e)
            }
        }

        const userAgent = navigator.userAgent.toLowerCase();
        if(userAgent.indexOf('android') > -1) {
            // alert('android userAgent')
            document.addEventListener('message', handleMessage);
        }else {
            window.addEventListener('message', handleMessage); 
        }

        // near me 버튼 만들기
        const nearMeButton = document.createElement("button");
        nearMeButton.textContent = "Loading...";
        nearMeButton.classList.add("near-me");
        nearMeButton.classList.add("btn");
        nearMeButton.classList.add("btn-secondary");
        nearMeButton.classList.add("rounded-5");
        nearMeButton.classList.add("text-white");
        nearMeButton.classList.add("m-4");
        // nearMeButton.classList.add("d-none");
        newMap.controls[window.google.maps.ControlPosition.TOP_LEFT].push(nearMeButton);

        const meIcon = {
            path: window.google.maps.SymbolPath.CIRCLE,
            fillColor: "blue",
            fillOpacity: 0.6,
            strokeWeight: 0,
            rotation: 0,
            scale: 12,
        };
        let meMarker = null;
        let mePosition;

        nearMeButton.addEventListener("click", () => {
            nearMeButton.textContent = "Loading...";
            // alert(mePosition.lat + ", " + mePosition.lng)
            if(mePosition === null || mePosition === undefined) {
                console.error("Couldn't find the current location.")
            }else {
                newMap.setCenter(mePosition);

                if(meMarker !== null) {
                    meMarker.setMap(null);
                    meMarker=null;
                }

                meMarker = new window.google.maps.Marker({
                    position: mePosition,
                    title: 'You are here.',
                    icon: meIcon,
                    animation: window.google.maps.Animation.BOUNCE,
                });
                meMarker.setMap(newMap);
                newMap.setZoom(13)
                nearMeButton.textContent = "Near Me";
            }

        });

        return() => {
            document.removeEventListener('message', handleMessage);
            window.removeEventListener('message', handleMessage);
        }

    },[]);

    function search(id) {
        // navigate("/playground", { state: {id: id}});
        navigate("/detail/" + id);
    }

    let [markers, setMarkers] = useState([])
    var activeInfoWindow= null;
    useEffect(()=>{
        // 놀이터 정보가 불러와 지면 마커 만들기
        const marker_icon = process.env.REACT_APP_SUPABASE_STORAGE_DEFAULT_PATH + "map-flag.png";
        
        let tempMarkers = [];
        playgrounds.forEach((playground)=>{
            const marker = new window.google.maps.Marker({
                id: playground.id,
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

            tempMarkers.push(marker);
            marker.setMap(map);
        });
        setMarkers(tempMarkers);

        
    },[playgrounds]);

    function isSamePoint(a, b) {
        if(a === null) return false;
        if(b === null) return false;
        return a.lat === b.lat && a.lng === b.lng 
    }

    useEffect(()=>{
        if(selectedId === null || selectedId === undefined) return;
        markers.forEach((m)=> {
            if(m.id === selectedId) {
                new window.google.maps.event.trigger( m, 'click' );
            }else {
                m.setMap(null);
            }
        });
    },[markers, selectedId]);

    return (
        <>
        <div 
            ref={ref} 
            id="map" 
            className="map"/>
        <ToastContainer />
        </>
    )
}

export default Map;