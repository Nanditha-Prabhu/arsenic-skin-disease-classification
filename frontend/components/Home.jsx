import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl  text-center">
          <h2 className="mt-8 text-3xl font-bold leading-tight text-black sm:text-4xl lg:mt-12 lg:text-5xl">
            Welcome to{" "}
            <span className="border-b-8 border-yellow-300">DermaCare</span>!
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base text-gray-600 md:mt-10 lg:text-xl">
            We offer you an AI based tool for preliminary diagnosis of
            Arsenicosis.
          </p>

          <button
            type="button"
            className="mt-8 rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            <Link to="/upload">Take a test</Link>
          </button>
        </div>

        <div className="mx-auto max-w-3xl my-24  text-center">
          <h3 className="text-2xl font-bold my-4">
            Arsenic and its{" "}
            <span className="border-b-8 border-yellow-300">Occurance</span>
          </h3>
          <p className=" p-6 h-auto rounded-lg bg-yellow-100">
            Arsenic is a naturally occurring, semi-metallic element widely
            distributed in the Earth's crust whose levels in the environment can
            vary by locality. Contaminated drinking water is the most common
            source of arsenic exposure in humans, especially in groundwater
            sources like wells, affecting over 70 countries including Argentina,
            Bangladesh, Cambodia, Chile, China, India, Mexico, Pakistan,
            Vietnam, and the United States. Arsenic can be present in
            contaminated soil and water used to grow certain foods, such as
            rice. In India, some of the areas are affected due to the
            arsenic-rich sediments deposited in the Brahmaputra Gangetic River
            basin that was formed millions of years ago.
          </p>
        </div>

        <div className="mx-auto max-w-3xl my-24  text-center">
          <h3 className="text-2xl font-bold my-4">
            Arsenic and its{" "}
            <span className="border-b-8 border-yellow-300">Health Hazards</span>
          </h3>
          <p className=" p-6 h-auto rounded-lg bg-yellow-100">
            Arsenic can affect a broad range of organs and systems including the
            cardiovascular system, endocrine system, immune system, liver,
            kidney, bladder, nervous system, prostate glands, respiratory
            system, and mainly skin. Some of the dermatological manifestations
            of chronic arsenic toxicity include diffuse melanosis and keratosis.
            Arsenic keratosis is a premalignant condition and is commonly
            located on sites prone to friction or trauma-like palms and soles,
            but can also be present on the dorsum of extremities (dorsal
            keratosis), trunk, genitalia, and eyelids. Arsenic keratosis has
            been graded as mild, moderate, and severe types.
          </p>
        </div>

        <div class="space-y-4 mx-auto max-w-3xl my-24">
        <h3 className="text-2xl font-bold my-4 text-center">
            Frequently Asked 
            <span className="border-b-8 border-yellow-300"> Questions</span>
          </h3>
          <details
            class="group [&_summary::-webkit-details-marker]:hidden"
            open
          >
            <summary class="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg bg-yellow-100 p-4 text-gray-900">
              <h2 class="font-medium">
                How can this help us?
              </h2>

              <svg
                class="size-5 shrink-0 transition duration-300 group-open:-rotate-180"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </summary>

            <p class="mt-4 px-4 leading-relaxed text-gray-700">
            This tool will help discover the presence of illness without conducting expensive tests, just clicking a photograph. Healthcare providers will utilize the model for preliminary diagnostics of skin conditions promising ease of use and diagnostic support. Patients can make use of the solution for early detection, improving access to preliminary diagnosis, and empowerment of patients to seek timely medical advice.
            </p>
          </details>

          <details class="group [&_summary::-webkit-details-marker]:hidden">
            <summary class="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg bg-yellow-100 p-4 text-gray-900">
              <h2 class="font-medium">
                Is this tool 100% accurate?
              </h2>

              <svg
                class="size-5 shrink-0 transition duration-300 group-open:-rotate-180"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </summary>

            <p class="mt-4 px-4 leading-relaxed text-gray-700">
              Our model has achieved 98% accuracy while training, validating and testing. But we surely expect you to seek advice from dermatologists before taking any action. This can just be considered as a preliminary test instead of other expensive tests.
            </p>
          </details>
        </div>
      </div>
    </section>
  );
}
