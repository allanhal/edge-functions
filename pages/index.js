// pages/index.js
import WebcamImage from "./webcam";
import WebcamImageList from "./webcam-list";

export default function Home() {
  return (
    <div>
      <h1>Serverless Function Test</h1>
      <p>environment</p>
      <WebcamImage facingMode="environment" />
      <p>exact: environment</p>
      <WebcamImage facingMode={{ exact: "environment" }} />
      <p>user</p>
      <WebcamImage facingMode="user" />
      <p>WebcamImageList</p>
      <WebcamImageList />
    </div>
  );
}
