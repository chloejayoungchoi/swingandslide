import React from "react";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

function ImageAttribution(p) {
    const IMAGE_PATH = process.env.REACT_APP_SUPABASE_STORAGE_DEFAULT_PATH;
    const navigate = useNavigate();

    function goBack() {
        navigate(-1);
    }

    return (
        <div className="terms p-3">
            <BiArrowBack class="fs-2 text-muted me-3" onClick={goBack} />
            <h5 className="text-center text-muted">Image Attribution</h5>
            <img 
                src={IMAGE_PATH+'thumb-default.jpg'} 
                className="d-block w-100" 
                alt="Default Playground">
            </img>
            <a href="https://www.freepik.com/free-vector/playground-park-composition-with-empty-playground-with-swings-toys-green-spaces_10346774.htm#page=2&query=kids%20playground&position=49&from_view=search&track=ais">Image by macrovector</a> on Freepik
            <br/><br/><br/>
            <img 
                src={IMAGE_PATH+'contribute.jpg'} 
                className="d-block w-100" 
                alt="Default Playground">
            </img>
            <a href="https://fr.freepik.com/vecteurs-libre/vecteur-fond-petite-entreprise-dans-design-plat_16264723.htm#query=vecteur-fond-petite-entreprise-dans-design-plat&position=2&from_view=search&track=sph">Image by rawpixel.com</a> on Freepik
            <br/><br/><br/>
            <img 
                src={IMAGE_PATH+'email.jpg'} 
                className="d-block w-100" 
                alt="Default Playground">
            </img>
            <a href="https://www.freepik.com/free-vector/emails-concept-illustration_7119119.htm#query=email&position=4&from_view=search&track=sph">Image by storyset</a> on Freepik
        </div>
    );
}

export default ImageAttribution;