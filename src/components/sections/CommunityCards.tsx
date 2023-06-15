import { Button } from "@/components/Button";

export const CommunityCards = () => {
    const featuredGroups = [
        {
          id: 1, // Unique ID for the group
          tags: ["#Open-Source", "#Africa", "#SpaceYaTech", "#TwitterSpaces"], // Diversified tags to be used for filtering: Programming Languages, Frameworks, Technologies, etc.
          group: "Space ya Tech", // Community name
          description: "Space ya Tech is a community of African developers who are passionate about open-source and its ecosystem.",
          images: [ // an array of images
            { id: 1, src: "/img/groups/space-ya-tech/space-ya-tech-2.jpg", alt: "image", width: 100, height: 100, },
            { id: 2, src: "/img/groups/space-ya-tech/space-ya-tech.jpg", alt: "image", width: 100, height: 100, },
            { id: 3, src: "/img/groups/space-ya-tech/space-ya-tech-3.jpg", alt: "image", width: 100, height: 100, },
          ],
      
        },
          {
            id : 2,
            tags: ["#Open-Source", "#Figma", "#UI/UX", "#TwitterSpaces"],
            group: "Friends of Figma, Nairobi",
            description: "Friends of Figma, Nairobi is a community of designers and developers who are passionate about Figma and its ecosystem.",
            images: [ 
              { id: 1, src: "/img/groups/fof/fof-1.jpg", alt: "image", width: 100, height: 100, },
              { id: 2, src: "/img/groups/fof/fof-2.jpg", alt: "image", width: 100, height: 100, },
              { id: 3, src: "/img/groups/fof/fof.jpg", alt: "image", width: 100, height: 100, },
            ],
        },
        {
          id : 3,
          tags: ["#PhyicalEvents", "#Mentorship", "#SoftwareEngineeering", "#TwitterSpaces"],
          group: "Lux Tech Academy",
          description: "Lux Tech Academy is a community of software engineers who are passionate about software engineering and its ecosystem.",
          images: [ 
            { id: 1, src: "/img/groups/lux-tech/lux-tech-1.jpg", alt: "image", width: 100, height: 100, },
            { id: 2, src: "/img/groups/lux-tech/lux-tech-2.jpg", alt: "image", width: 100, height: 100, },
            { id: 3, src: "/img/groups/lux-tech/lux-tech.jpg", alt: "image", width: 100, height: 100, },
          ],
        },
        {
          id : 4,
          tags: ["#Kotlin", "#Kotlin254", "#Android", "#TwitterSpaces"],
          group: "Kotlin254",
          description: "Kotlin254 is a community of software engineers who are passionate about Kotlin and its ecosystem.",
          images: [ 
            { id: 1, src: "/img/groups/kotlin254/kot-1.webp", alt: "image", width: 100, height: 100, },
            { id: 2, src: "/img/groups/kotlin254/kot-2.webp", alt: "image", width: 100, height: 100, },
            { id: 3, src: "/img/groups/kotlin254", alt: "image", width: 100, height: 100, },
          ],
        },
      ];

    return(

        <div className="flex flex-col gap-8 pt-10">
                {featuredGroups.map((item) => (
                    <div className="relative flex flex-col gap-4 md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-md shadow-lg p-3 max-w-xs md:max-w-3xl border border-white">
                      <div className="w-full md:w-1/3 grid place-items-center">
                          <img src={item.images[0].src} alt="" className="rounded-xl" />
                      </div>
                      <div className="w-full md:w-2/3 flex flex-col space-y-2 p-3">
                          <div className="flex justify-between item-center">
                              <p className="text-gray-500 font-medium hidden md:block">Nairobi, KE</p>
                              <div className="flex items-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20"
                                      fill="currentColor">
                                      <path
                                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                  <p className="text-gray-600 font-bold text-sm ml-1">
                                      4.96
                                      <span className="text-gray-500 font-normal">(76 reviews)</span>
                                  </p>
                              </div>
                              <div className="">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-500" viewBox="0 0 20 20"
                                      fill="currentColor">
                                      <path fill-rule="evenodd"
                                          d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                          clip-rule="evenodd" />
                                  </svg>
                              </div>
                              <div className="bg-gray-200 px-3 py-1 rounded-full text-xs font-medium text-gray-800 hidden md:block">
                                  All Tech</div>
                          </div>
                          <h3 className="text-black dark:text-slate-300 md:text-2xl text-xl">{item.group}</h3>
                          <p className="md:text-lg text-gray-500 text-base">{item.description.length > 50 ? item.description.substring(0, 80) + '...' : item.description}</p>

                          
                          <div className="flex flex-wrap gap-2">
                            {item.tags.map((tag, i) => (                
                                <span key={i} className="inline-flex items-center justify-center px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                                {tag}
                                </span>
                            ))
                            }
                          
                          
                          </div>
                          <Button variant="solid" className="mt-5">Join this group</Button>
                      </div>
                    </div>
                ))
                }
              
               
        </div>
    )
}