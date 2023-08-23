import { BiMeteor } from "react-icons/bi";
import Swing from "../icons/Swing.png";
import Slide from "../icons/Slide.png";
import SprayPark from "../icons/SprayPark.png";
import Pool from "../icons/Pool.png";
import PicnicTable from "../icons/PicnicTable.png";
import Sandbox from "../icons/Sandbox.png";
import Field from "../icons/Field.png";
import Washroom from "../icons/Washroom.png";

export const FACILITIES = {
    hasSwing: {icon:<img src={Swing} className="icon" alt="Swing" />, title:'Swing', column:'hasSwing'},
    hasSlide: {icon:<img src={Slide} className="icon" alt="Slide" />, title:'Slide', column:'hasSlide'},
    hasSandbox: {icon:<img src={Sandbox} className="icon" alt="Sandbox" />, title:'Sandbox', column:'hasSandbox'},
    hasField: {icon:<img src={Field} className="icon" alt="Sandbox" />, title:'Field', column:'hasField'},
    hasSprayPark: {icon:<img src={SprayPark} className="icon" alt="Spray Park" />, title:'Spray Park', column:'hasSprayPark'},
    hasPool: {icon:<img src={Pool} className="icon" alt="Pool" />, title:'Pool', column:'hasPool'},
    hasPicnicTable: {icon:<img src={PicnicTable} className="icon" alt="Picnic Table" />, title:'Picnic Table', column:'hasPicnicTable'},
    hasWashroom: {icon:<img src={Washroom} className="icon" alt="Washroom" />, title: 'Washroom', column:'hasWashroom'}
};

export const SEARCH_TAGS = [
    'ZipLine', 'Concession', 'AccessibleSwing', 'Hiking', 'Library', 'Skateboard', 'Basketball', 'Volleyball'
];

export const LABEL_ON_IMAGE = [
    <span className="label-right">new</span>,
    <span className="label-right bg-yellow">updated</span>,
    <span className="label-left">event</span>
];