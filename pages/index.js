// pages/index.js
import WebcamImage from "./webcam";
import WebcamImageList from "./webcam-list";

export default function Home() {
  return (
    <div>
      <h1>Serverless Function Test</h1>
      <WebcamImage facingMode={{ exact: "environment" }} />
      <WebcamImage facingMode="user" />
      <WebcamImageList />
    </div>
  );
}
