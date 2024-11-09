import Webcam from "react-webcam";
import React, { useState, useRef, useCallback, useEffect } from "react";

export default function WebcamImage() {
  const webcamRef = useRef(null);
  const [img, setImg] = useState(null);

  const [message, setMessage] = useState("");

  useEffect(() => {
    if (img) {
      fetch("/api/hello", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: img.split("data:image/jpeg;base64,")[1],
          customer_code: "string",
          measure_datetime: "datetime",
          measure_type: "WATER",
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.message && typeof data.message === "string") {
            setMessage(data.message);
          }
        })
        .catch((error) => console.error("Error:", error));
    }
  }, [img]);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImg(imageSrc);
  }, [webcamRef]);

  const videoConstraints = {
    width: 390,
    height: 390,
    facingMode: "user",
  };

  return (
    <div className="Container">
      {img === null ? (
        <>
          <Webcam
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            audio={false}
            height={500}
            width={500}
            ref={webcamRef}
            mirrored={true}
          />
          <button onClick={capture}>Capture photo</button>
        </>
      ) : (
        <>
          <p>img: {img}</p>
          <p>{message}</p>
          <img src={img} alt="screenshot" />
          <button onClick={() => setImg(null)}>Recapture</button>
        </>
      )}
    </div>
  );
}
