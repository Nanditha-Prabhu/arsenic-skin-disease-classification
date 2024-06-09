import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import axios from "axios";

export default function Upload() {
  const [image, setImage] = useState(null);
  const [predictedClass, setPredictedClass] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for 2 seconds
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = async (event) => {
    setIsLoading(true)
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", image);

    try {
      const r = await axios.post("http://localhost:8080/predict", formData);
      console.log(r.data);
      const data = r.data["predictions"][0]["class_label"];
      setPredictedClass(data);
      console.log(data);
      setIsLoading(false)
    } catch (error) {
      console.error("Error uploading image: ", error);
    }
  };

  return (
    <>
      {/* main content */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8 m-6">
        <div className="h-auto rounded-lg bg-gray-200">
          <form
            onSubmit={handleUpload}
            className="flex flex-col items-center justify-center text-center space-x-6"
          >
            <h2 className="text-3xl font-bold mt-10">
              Upload a photo
            </h2>
            <div className=" p-8 m-8 border-2 border-slate-800 rounded-lg">
              <label className="block">
                <span className="sr-only">Choose or drag and drop a skin photo</span>
                <input
                  type="file"
                  className="block w-full text-sm text-slate-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-slate-50 file:text-slate-700
                    hover:file:bg-violet-100
                    "
                  onChange={handleImageChange}
                />
              </label>
              <button
                type="submit"
                className="mt-4 w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className=" h-auto rounded-lg bg-gray-200">
          {/* Results */}
          {isLoading ? (
          <Loading />
        ) : (
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-3xl font-bold m-10">Results</h2>
            {predictedClass && (
              <p
                className={` font-semibold text-xl shadow-2xl mb-10 ${
                  predictedClass == "Healthy"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                Your skin is {predictedClass}.
              </p>
            )}
          </div>
        )}
        </div>
      </div>
    </>
  );
}
