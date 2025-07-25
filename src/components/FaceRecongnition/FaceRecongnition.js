import React from "react";
import './FaceRecongnition.css'


const FaceRecongnition = ({ imageUrl, box }) => {

    return (
        <div className="center">
            <div className="absolute mt2">
                <img id="inputImage" alt="" src={imageUrl === "" ? null : imageUrl} width='500px' heigh='auto'></img>
                <div className="bounding-box" style={{ top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol }}></div>
            </div>
        </div>
    )

}

export default FaceRecongnition