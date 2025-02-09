export async function POST(request) {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
        return new Response(JSON.stringify({ error: "No file uploaded" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }

    // Send the file to the Flask backend
    const backendResponse = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        body: formData,
    });

    if (!backendResponse.ok) {
        return new Response(JSON.stringify({ error: "Prediction failed" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }

    const data = await backendResponse.json();
    return new Response(JSON.stringify(data), {
        headers: { "Content-Type": "application/json" },
    });
}