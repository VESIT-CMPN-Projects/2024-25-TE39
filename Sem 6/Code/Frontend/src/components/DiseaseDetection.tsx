import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

const CropDiseaseDetection: React.FC = () => {
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUploadImage = async () => {
    if (!selectedFile) {
      toast({
        title: "No file selected",
        description: "Please select an image to upload.",
        variant: "destructive",
      });
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/upload-image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast({
        title: "Image uploaded successfully",
        description: `File URL: ${response.data.fileUrl}`,
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      toast({
        title: "Error",
        description: "Failed to upload the image. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto mt-28">
      <h1 className="text-2xl font-bold mb-4">Crop Disease Detection</h1>
      <p className="text-muted-foreground mb-6">
        Upload a leaf or plant image to detect diseases.
      </p>

      <input type="file" accept="image/*" onChange={handleFileChange} />
      <Button className="mt-4" onClick={handleUploadImage}>
        Upload Image to S3
      </Button>
    </div>
  );
};

export default CropDiseaseDetection;
