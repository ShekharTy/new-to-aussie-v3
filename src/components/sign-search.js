import React, { useEffect, useState } from 'react';
import cv from '@techstark/opencv-js';
import safetySigns from "../data/safety_sign.json";
// import signsImage from "../data/signs_sift.json";
import Header from './header';
import Footer from './footer';

const signsData = safetySigns.map((sign) => ({
    name: sign.name,
    description: sign.description.trim(),
    image: sign.image
}));
console.log(signsData);

// console.log(signsSift);
function Signsearch() {
    useEffect(() => {
        document.title = `Sign Search`;
    }, []); // Empty dependency array to run effect only once on mount
    // const [result, setResult] = useState(null);
    const [imageData, setImageData] = useState(null);
    const [result, setResult] = useState(null);

    window.cv = cv;

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.getElementById('output');
                    const ctx = canvas.getContext('2d');

                    const maxWidth = canvas.width;
                    const maxHeight = canvas.height;
                    let imageWidth = img.width;
                    let imageHeight = img.height;
                    if (imageWidth > maxWidth || imageHeight > maxHeight) {
                        const ratio = Math.min(maxWidth / imageWidth, maxHeight / imageHeight);
                        imageWidth *= ratio;
                        imageHeight *= ratio;
                    }

                    canvas.width = imageWidth;
                    canvas.height = imageHeight;

                    ctx.drawImage(img, 0, 0, imageWidth, imageHeight);


                    const inputImg = document.getElementById('imageInput');
                    inputImg.src = img.src;

                    setImageData(ctx.getImageData(0, 0, imageWidth, imageHeight));
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    };      

    const searchSign = () => {
        if (!imageData) return;
        const src = cv.matFromImageData(imageData);
        let gray = new cv.Mat();
        cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);
        cv.threshold(gray, gray, 200, 255, cv.THRESH_BINARY); //Remove the background
        let grayVec = new cv.MatVector();
        grayVec.push_back(gray);
        let mask = new cv.Mat();
        let inputHist = new cv.Mat();
        cv.calcHist(grayVec, [0], mask, inputHist, [256], [0, 256], false);
        console.log(inputHist);
        cv.normalize(inputHist, inputHist);
        console.log(inputHist);
        
        const histogramArray = [];
        for (let i = 0; i < 256; i++) {
            histogramArray.push(inputHist.data32F[i]);
        }

        gray.delete();
        grayVec.delete();
        mask.delete();
        inputHist.delete();

        console.log(histogramArray);
      
        
        try{
            var best_similarity = 1;
            var best_name;
            const signsHist = require('../data/signs_histogram.json');
            for (const [name, hist] of Object.entries(signsHist)) {
                let similarity = euclideanDistance(hist, histogramArray);
                if (similarity < best_similarity) {
                  best_similarity = similarity;
                  best_name = name;  
                  console.log(best_similarity);
                  console.log(best_name);
                }
            }
        } catch (error) {
            console.error(error);
        }            

        const matchedSign = signsData.find((sign) => sign.image === best_name);
        console.log(best_name);

        let match_name = null;
        let match_description = null;

        if (matchedSign) {
            match_name = matchedSign.name;
            match_description = matchedSign.description;
        }

        console.log(match_name);
        console.log(match_description);
        
        const results = {
            'similarity': best_similarity,
            'matchName': match_name,
            'matchDescription': match_description
        };
        
        setResult(results);
    };

    function euclideanDistance(arr1, arr2) {
        if (arr1.length !== arr2.length) {
            throw new Error("need to same length");
        }
        let sum = 0;
        for (let i = 0; i < arr1.length; i++) {
            sum += Math.pow(arr1[i] - arr2[i], 2);
        }
        return Math.sqrt(sum);
    }

    return (
        <div className="min-h-screen flex flex-col">
        <Header />
        <div>
            <section>
            <h1>Please input the image to search for.</h1>
            <input type="file" id="imageInput" aria-label="Input the image" onChange={handleFileChange} />
            </section>
            <canvas id="output" width="300" height="300"></canvas>
            <div>
            <button onClick={searchSign}>Search Signs</button>
            {result !== null && (
                <><section>
                    <h1>The information about the inputed image below:</h1>
                    {result.similarity < 0.1 ? (
                        <><p>Sign name: {result.matchName}</p><p>Description: {result.matchDescription}</p></>
                    ) : (
                        <p>We can't find the information for the image.</p>
                    )}
                </section></>
            )}
            </div>
        </div>
        <Footer />
        </div>
    );

}

export default Signsearch;