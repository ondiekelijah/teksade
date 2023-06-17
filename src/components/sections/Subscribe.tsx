import React from "react";
import Image from "next/legacy/image";
import Link from "next/link";
import { Button } from "@/components/Button";

export const Subscribe = () => {
  return (
    <section className="mx-auto max-w-screen-xl py-4 sm:py-6 md:py-8 lg:py-12 xl:py-16">
      <div className="h-full min-h-screen">
        <div>
          {/* CTA box */}
          <div className="relative rounded-none px-8 py-10 shadow-none sm:overflow-visible md:rounded-lg md:px-12 md:py-16 md:shadow-2xl">
            {/* Background illustration */}
            <div
              className="pointer-events-none absolute bottom-0 right-0 hidden lg:block"
              aria-hidden="true"
            >
              <svg width="428" height="328" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <radialGradient
                    cx="35.542%"
                    cy="34.553%"
                    fx="35.542%"
                    fy="34.553%"
                    r="96.031%"
                    id="ni-a"
                  >
                    <stop stopColor="#DFDFDF" offset="0%" />
                    <stop stopColor="#4C4C4C" offset="44.317%" />
                    <stop stopColor="#333" offset="100%" />
                  </radialGradient>
                </defs>
                <g fill="none" fillRule="evenodd">
                  <g fill="#FFF">
                    <ellipse
                      fillOpacity=".04"
                      cx="185"
                      cy="15.576"
                      rx="16"
                      ry="15.576"
                    />
                    <ellipse
                      fillOpacity=".24"
                      cx="100"
                      cy="68.402"
                      rx="24"
                      ry="23.364"
                    />
                    <ellipse
                      fillOpacity=".12"
                      cx="29"
                      cy="251.231"
                      rx="29"
                      ry="28.231"
                    />
                    <ellipse
                      fillOpacity=".64"
                      cx="29"
                      cy="251.231"
                      rx="8"
                      ry="7.788"
                    />
                    <ellipse
                      fillOpacity=".12"
                      cx="342"
                      cy="31.303"
                      rx="8"
                      ry="7.788"
                    />
                    <ellipse
                      fillOpacity=".48"
                      cx="62"
                      cy="126.811"
                      rx="2"
                      ry="1.947"
                    />
                    <ellipse
                      fillOpacity=".12"
                      cx="78"
                      cy="7.072"
                      rx="2"
                      ry="1.947"
                    />
                    <ellipse
                      fillOpacity=".64"
                      cx="185"
                      cy="15.576"
                      rx="6"
                      ry="5.841"
                    />
                  </g>
                  <circle fill="url(#ni-a)" cx="276" cy="237" r="200" />
                </g>
              </svg>
            </div>

            <div className="relative flex flex-col items-center justify-between lg:flex-row">
              {/* CTA content */}
              <div className="text-center lg:max-w-xl lg:text-left">
                <h2
                  className="mb-2 whitespace-nowrap text-3xl font-bold leading-tight tracking-tighter dark:text-white sm:text-4xl md:text-4xl
                        lg:text-5xl"
                >
                  Innovative Minds & News
                </h2>
                <p className="mb-6 font-normal leading-relaxed text-gray-600 dark:text-slate-400 sm:text-lg">
                  We're glad you're here! So why not subscribe today and stay
                  up-to-date on all the latest news and information about what's
                  going on in the tech community?
                </p>

                {/* CTA form */}
                <form>
                  <label className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Search
                  </label>
                  <div className="relative">
                    <input
                      type="search"
                      id="default-search"
                      className="block 
                    w-full rounded-full border border-gray-300 bg-gray-50 p-4 
                    pl-10 text-sm text-gray-900 
                    focus:border-indigo-700 focus:ring-indigo-700 dark:border-gray-600 
                    dark:bg-gray-700 dark:text-white dark:placeholder-gray-400
                     dark:focus:border-gray-700 dark:focus:ring-gray-700"
                      placeholder="Your Email"
                      required
                    />
                    <Button
                      variant="solid"
                      className="absolute bottom-2 right-2.5"
                    >
                      Subscribe
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// export const Subscribe = () => {
//   return (
//     <section className="mx-auto max-w-screen-xl md:py-4">
//       <div className="">
//         <div className="">
//           {/* CTA box */}
//           <div className="relative rounded-none py-10 px-8 shadow-none sm:overflow-visible md:rounded-lg md:py-16 md:px-12 md:shadow-2xl">
//             {/* Background illustration */}
//             <div
//               className="pointer-events-none absolute right-0 bottom-0 hidden lg:block"
//               aria-hidden="true"
//             >
//               <svg width="428" height="328" xmlns="http://www.w3.org/2000/svg">
//                 <defs>
//                   <radialGradient
//                     cx="35.542%"
//                     cy="34.553%"
//                     fx="35.542%"
//                     fy="34.553%"
//                     r="96.031%"
//                     id="ni-a"
//                   >
//                     <stop stopColor="#DFDFDF" offset="0%" />
//                     <stop stopColor="#4C4C4C" offset="44.317%" />
//                     <stop stopColor="#333" offset="100%" />
//                   </radialGradient>
//                 </defs>
//                 <g fill="none" fillRule="evenodd">
//                   <g fill="#FFF">
//                     <ellipse
//                       fillOpacity=".04"
//                       cx="185"
//                       cy="15.576"
//                       rx="16"
//                       ry="15.576"
//                     />
//                     <ellipse
//                       fillOpacity=".24"
//                       cx="100"
//                       cy="68.402"
//                       rx="24"
//                       ry="23.364"
//                     />
//                     <ellipse
//                       fillOpacity=".12"
//                       cx="29"
//                       cy="251.231"
//                       rx="29"
//                       ry="28.231"
//                     />
//                     <ellipse
//                       fillOpacity=".64"
//                       cx="29"
//                       cy="251.231"
//                       rx="8"
//                       ry="7.788"
//                     />
//                     <ellipse
//                       fillOpacity=".12"
//                       cx="342"
//                       cy="31.303"
//                       rx="8"
//                       ry="7.788"
//                     />
//                     <ellipse
//                       fillOpacity=".48"
//                       cx="62"
//                       cy="126.811"
//                       rx="2"
//                       ry="1.947"
//                     />
//                     <ellipse
//                       fillOpacity=".12"
//                       cx="78"
//                       cy="7.072"
//                       rx="2"
//                       ry="1.947"
//                     />
//                     <ellipse
//                       fillOpacity=".64"
//                       cx="185"
//                       cy="15.576"
//                       rx="6"
//                       ry="5.841"
//                     />
//                   </g>
//                   <circle fill="url(#ni-a)" cx="276" cy="237" r="200" />
//                 </g>
//               </svg>
//             </div>

//             <div className="relative flex flex-col items-center justify-between lg:flex-row">
//               {/* CTA content */}
//               <div className="text-center lg:max-w-xl lg:text-left">
//                 <h2
//                   className="mb-2 whitespace-nowrap text-3xl font-bold leading-tight tracking-tighter dark:text-white sm:text-4xl md:text-4xl
//                         lg:text-5xl"
//                 >
//                   Innovative Minds & News
//                 </h2>
//                 <p className="mb-6 font-normal leading-relaxed text-gray-600 dark:text-slate-400 sm:text-lg">
//                   We're glad you're here! So why not subscribe today and stay
//                   up-to-date on all the latest news and information about what's
//                   going on in the tech community?
//                 </p>

//                 {/* CTA form */}
//                 <form>
//                   <label className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white">
//                     Search
//                   </label>
//                   <div className="relative">
//                     <input
//                       type="search"
//                       id="default-search"
//                       className="block
//                     w-full rounded-full border border-gray-300 bg-gray-50 p-4
//                     pl-10 text-sm text-gray-900
//                     focus:border-indigo-700 focus:ring-indigo-700 dark:border-gray-600
//                     dark:bg-gray-700 dark:text-white dark:placeholder-gray-400
//                      dark:focus:border-gray-700 dark:focus:ring-gray-700"
//                       placeholder="Your Email"
//                       required
//                     />
//                     <Button
//                       variant="solid"
//                       className="absolute right-2.5 bottom-2"
//                     >
//                       Subscribe
//                     </Button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };
