import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import Header from "@/components/Header"; // Import the Header component

const CropDiseaseDetectionPage: React.FC = () => {
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [predictedDisease, setPredictedDisease] = useState<string | null>(null);
  const [history, setHistory] = useState<any[]>([]);

  const farmerData = JSON.parse(localStorage.getItem("farmerData") || "null");
  console.log(farmerData);
  // Check if farmerData exists, if not handle the error or redirect to login page
  const userEmail = farmerData ? farmerData.email : null;
  console.log(userEmail);

  useEffect(() => {
    // Fetch history when component is mounted
    if (userEmail) {
      axios
        .get(`http://localhost:5000/get-disease-history/${userEmail}`) // Adjust URL if needed
        .then((response) => {
          setHistory(response.data.history || []); // Set the history including formatted timestamp
        })
        .catch((error) => {
          toast({
            title: "Error",
            description: "Failed to fetch history.",
            variant: "destructive",
          });
        });
    }
  }, [userEmail, toast]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUploadToBackend = async () => {
    const userEmail = farmerData ? farmerData.email : null;

    if (!selectedFile || !userEmail) {
      toast({
        title: "Error",
        description: "Please select a file and ensure you are logged in.",
        variant: "destructive",
      });
      return;
    }
    console.log(selectedFile);
    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("user_email", userEmail); // Pass the user email

    try {
      const { data } = await axios.post(
        "http://localhost:5000/predict-disease", // Backend URL
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setFileUrl(data.file_url);
      setPredictedDisease(data.predicted_disease);
      setHistory(data.history || []); // Update history with the response data

      toast({
        title: "Image uploaded successfully",
        description: `File URL: ${data.file_url}`,
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      toast({
        title: "Error",
        description: "Failed to upload image.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        isLoggedIn={true}
        onLogout={() => {
          localStorage.removeItem("isLoggedIn");
        }}
      />

      <main className="flex-1 pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">Crop Disease Detection</h1>
          <p className="text-muted-foreground mb-6">
            Upload a leaf or plant image to detect diseases.
          </p>

          <input type="file" accept="image/*" onChange={handleFileChange} />
          <Button className="mt-4" onClick={handleUploadToBackend}>
            Upload Image to S3 and Detect Disease
          </Button>

          {fileUrl && (
            <div className="mt-6 bg-muted p-4 rounded">
              <h2 className="text-lg font-medium mb-2">Uploaded Image URL:</h2>
              <p>{fileUrl}</p>
            </div>
          )}

          {predictedDisease && (
            <div className="mt-6 bg-muted p-4 rounded">
              <h2 className="text-lg font-medium mb-2">Predicted Disease:</h2>
              <p>{predictedDisease}</p>
            </div>
          )}

          {history.length > 0 && (
            <div className="mt-6 bg-muted p-4 rounded">
              <h2 className="text-lg font-medium mb-2">Prediction History:</h2>
              <ul>
                {history.map((item, index) => (
                  <li key={index} className="mb-2">
                    <p>
                      <strong>Predicted Disease:</strong>{" "}
                      {item.PredictedDisease}
                    </p>
                    <p>
                      {/* {item.ImageURL} */}
                      <strong>Image:</strong>{" "}
                      <img
                        src={item.ImageURL}
                        alt="Disease Image"
                        className="w-64 h-64 object-cover mt-2"
                      />
                    </p>
                    <p>
                      <strong>Timestamp:</strong> {item.FormattedTimestamp}{" "}
                      {/* Use the formatted timestamp */}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default CropDiseaseDetectionPage;
