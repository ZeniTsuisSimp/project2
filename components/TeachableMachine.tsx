"use client"; // Mark as a Client Component in Next.js 13+
import { useEffect, useState } from "react";

const TeachableMachine = () => {
  const [predictions, setPredictions] = useState<{ className: string; probability: number }[]>([]);

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
      let model: any, webcam: any, maxPredictions: number;

      const init = async () => {
        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";

        // Load the model and metadata
        model = await (window as any).tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();

        // Set up the webcam
        const flip = true; // Whether to flip the webcam
        webcam = new (window as any).tmImage.Webcam(200, 200, flip); // Width, height, flip
        await webcam.setup(); // Request access to the webcam
        await webcam.play();
        window.requestAnimationFrame(loop);

        // Append elements to the DOM
        const webcamContainer = document.getElementById("webcam-container");
        if (webcamContainer) {
          webcamContainer.appendChild(webcam.canvas);
        }
      };

      const loop = async () => {
        webcam.update(); // Update the webcam frame
        await predict();
        window.requestAnimationFrame(loop);
      };

      const predict = async () => {
        const prediction = await model.predict(webcam.canvas);
        setPredictions(prediction); // Update predictions state
      };

      // Initialize the model and webcam
      await init();
    };

    initTeachableMachine();
  }, []);

  return (
    <div className="flex flex-col items-center space-y-4">
      <div id="webcam-container" className="mb-4"></div>
      <div id="label-container" className="w-full max-w-md">
        {predictions.map((prediction, index) => (
          <div key={index} className="flex justify-between p-2 bg-card rounded-lg mb-2">
            <span>{prediction.className}</span>
            <span>{(prediction.probability * 100).toFixed(2)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeachableMachine;