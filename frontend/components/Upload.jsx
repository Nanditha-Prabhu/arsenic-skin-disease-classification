import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import axios from "axios";

export default function Upload() {
  const [image, setImage] = useState(null);
  const [predictedClass, setPredictedClass] = useState(null);
  const [predictedSeverity, setPredictedSeverity] = useState(null);
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
      const predict = r.data["predictions"][0]["class_label"];
      setPredictedClass(predict);
      const severity = r.data["predictions"][0]["severity"];
      setPredictedSeverity(severity)
      console.log('class ', predict, ' severity ', severity);
      setIsLoading(false)
    } catch (error) {
      console.error("Error uploading image: ", error);
    }
  };

  return (
    <>
      {/* main content */}
      <div className="mx-auto max-w-2xl  text-center">
          <h2 className="mt-8 text-3xl font-bold leading-tight text-black sm:text-4xl lg:mt-12 lg:text-5xl">
            Take a{" "}
            <span className="border-b-8 border-yellow-300">Test</span>
          </h2>
        </div>
        <div className="mx-auto max-w-3xl my-16">
            <h3 className="text-2xl font-bold my-4 text-center"><span className="border-b-8 border-yellow-300">Instructions</span></h3>
            <ul className=" p-6 h-auto rounded-lg bg-yellow-100  text-left mx-6">
                <li>The model is trained on images of arsenic toxicity instances located on sites prone to friction like palms and soles.</li>
                <li>Thus, it is advised to upload images of palm and soles for the best results.</li>
                <li>The model is not 100% accurate nor it considers medical history of the user.</li>
                <li>This is just for the preliminary diagnosis for immediate action.</li>
            </ul>
        </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8 m-6">
        <div className="h-auto rounded-lg bg-gray-200">
          <form
            onSubmit={handleUpload}
            className="flex flex-col mx-auto items-center justify-center text-center space-x-6"
          >
            <h2 className="text-3xl font-bold mt-10">
            <span className="border-b-8 border-yellow-300">Upload</span> a photo
            </h2>
            <div className=" p-4 md:p-8 my-8 mx-auto border-2 border-slate-800 rounded-lg">
              <label className="block">
                <span className="sr-only">Choose or drag and drop a skin photo</span>
                <input
                  type="file"
                  className="block w-full text-sm text-slate-500
                    file:py-2 file:px-4
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
        <div className=" h-auto rounded-lg bg-yellow-100">
          {/* Results */}
          {isLoading ? (
          <Loading />
        ) : (
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-3xl font-bold m-10"><span className="border-b-8 border-yellow-300">Results</span></h2>
            {predictedClass && (
              <p
                className={` text-center font-semibold text-xl mb-10 ${
                  predictedClass == "Healthy"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                The skin is {predictedClass}.
                {predictedClass=='Arsenic infected' ? (<p>Predicted severity is {predictedSeverity}.</p>) : (<p></p>) }
              </p>
            )}
          </div>
        )}
        </div>
      </div>
    </>
  );
}
