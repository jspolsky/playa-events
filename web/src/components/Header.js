import React from "react";
import banner from "../assets/header.jpg";

export const Header = () => {

    // Image is from https://gallery.burningman.org/asset/e18ccfb6-4558-427e-8118-493bffe148e5?i=2&q=playa+info
    // Photo by Jini Sachse, 2019

    return (<img className="img-fluid w-100" src={banner} alt="Playa Info" style={{marginBottom:"2rem"}} />);

};