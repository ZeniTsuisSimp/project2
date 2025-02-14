"use client"; // Mark as a Client Component in Next.js 13+
import { useEffect, useState } from "react";

interface TeachableMachineProps {
  image?: string; // Base64 image data (optional for webcam)
  onClose?: () => void; // Callback to close the output screen
}

const TeachableMachine = ({ image, onClose }: TeachableMachineProps) => {
  const [predictions, setPredictions] = useState<{ className: string; probability: number }[]>([]);
  const [isWebcamActive, setIsWebcamActive] = useState<boolean>(!image); // Enable webcam if no image is provided
  const [webcam, setWebcam] = useState<any>(null); // Store the webcam instance

  useEffect(() => {
    // Load TensorFlow.js and Teachable Machine scripts dynamically
    const loadScript = (src: string) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };

    const initTeachableMachine = async () => {
      // Load TensorFlow.js and Teachable Machine scripts
      await loadScript("https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@latest/dist/tf.min.js");
      await loadScript("https://cdn.jsdelivr.net/npm/@teachablemachine/image@latest/dist/teachablemachine-image.min.js");

      // Teachable Machine code
      const URL = "/my_model/"; // Path to your model files in the public directory
      let model: any;

      const init = async () => {
        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";

        // Load the model and metadata
        model = await (window as any).tmImage.load(modelURL, metadataURL);

        if (image) {
          // Predict using the uploaded image
          const img = new Image();
          img.src = image;
          img.onload = async () => {
            const prediction = await model.predict(img);
            setPredictions(prediction);
          };
        } else {
          // Set up the webcam
          const flip = true; // Whether to flip the webcam
          const webcamInstance = new (window as any).tmImage.Webcam(200, 200, flip); // Width, height, flip
          await webcamInstance.setup(); // Request access to the webcam
          await webcamInstance.play();
          setWebcam(webcamInstance); // Store the webcam instance

          // Append elements to the DOM
          const webcamContainer = document.getElementById("webcam-container");
          if (webcamContainer) {
            webcamContainer.appendChild(webcamInstance.canvas);
          }

          const loop = async () => {
            webcamInstance.update(); // Update the webcam frame
            await predict();
            window.requestAnimationFrame(loop);
          };

          const predict = async () => {
            const prediction = await model.predict(webcamInstance.canvas);
            setPredictions(prediction); // Update predictions state
          };

          loop();
        }
      };

      // Initialize the model
      await init();
    };

    initTeachableMachine();

    // Cleanup function to stop the webcam when the component unmounts
    return () => {
      if (webcam) {
        webcam.stop(); // Stop the webcam
      }
    };
  }, [image, webcam]);

  return (
    <div className="flex flex-col items-center space-y-4">
      {isWebcamActive && <div id="webcam-container" className="mb-4"></div>}
      <div id="label-container" className="w-full max-w-md">
        {predictions.map((prediction, index) => (
          <div key={index} className="flex justify-between p-2 bg-card rounded-lg mb-2">
            <span>{prediction.className}</span>
            <span>{(prediction.probability * 100).toFixed(2)}%</span>
          </div>
        ))}
      </div>
      {onClose && (
        <button className="mt-4" onClick={onClose}>
          Close
        </button>
      )}
    </div>
  );
};

export default TeachableMachine;