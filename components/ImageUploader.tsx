"use client";

import { useState } from "react";

export default function ImageUploader() {
    const [file, setFile] = useState<File | null>(null);
    const [prediction, setPrediction] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async () => {
        if (!file) {
            setError("Please select an image.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch("/api/predict", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Prediction failed");
            }

            const data = await response.json();
            setPrediction(data.class);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred");
            setPrediction(null);
        }
    };

    return (
        <div className="flex flex-col items-center space-y-4">
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="border p-2"
            />
            <button
                onClick={handleSubmit}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Upload and Predict
            </button>
            {error && <p className="text-red-500">{error}</p>}
            {prediction && (
                <p className="text-green-500">Predicted Class: {prediction}</p>
            )}
        </div>
    );
}