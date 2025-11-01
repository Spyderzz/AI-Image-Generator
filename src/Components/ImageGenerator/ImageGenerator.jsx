import React, {useRef, useState } from 'react'
import './ImageGenerator.css'
import default_image from '../assets/default_image.svg'



  function ImageGenerator() {
  const [image_url, setImage_url] = useState("/");
  let inputRef = useRef(null);

  const imageGenerator = async () => {
    if (inputRef.current.value === "") {
      alert("Please enter a description!");
      return;
    }

    try {
      const response = await fetch(
        "https://router.huggingface.co/hf-inference/models/stabilityai/stable-diffusion-xl-base-1.0",
        {
          method: "POST",
          headers: {
            Authorization: "Bearer ${process.env.REACT_APP_HF_TOKEN}",  
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            inputs: inputRef.current.value, // text prompt
          }),
        }
      );

     if (!response.ok) {
  const errorText = await response.text();
  console.error("Error from API:", errorText);
  alert("The image generator model might be loading. Please wait a few seconds and try again.");
  return;
}


      const blob = await response.blob();
      const imageObjectUrl = URL.createObjectURL(blob);
      setImage_url(imageObjectUrl);
    } catch (error) {
      console.error("Error generating image:", error);
      alert("Something went wrong. Please try again.");
    }
  };






  return (
    <div className='ai-image-generator'>
    <div className="header">AI Image<span>Generator</span></div>
    <div className="img-loading">
      <div className="image">
        <img src={image_url==="/"?default_image:image_url} alt="" />
      </div>
    </div>
    <div className="search-box">
      <input type="text" ref={inputRef} className="search-input" placeholder='Describe what you want to see'/>
<div className="generate-btn" onClick={()=>{imageGenerator()}}>Generate</div>
    </div>
    </div>
  )
}

export default ImageGenerator
