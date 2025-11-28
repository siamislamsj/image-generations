import React from 'react'
import Image1 from '../assets/images/ai-image-1.jpeg'
import Image2 from '../assets/images/ai-image-2.jpeg'
import Image3 from '../assets/images/ai-image-3.jpeg'
import Image4 from '../assets/images/ai-image-4.jpeg'
import Image5 from '../assets/images/ai-image-5.jpeg'
import Image6 from '../assets/images/ai-image-6.jpeg'

const Downloads = ({ downloadedImages }) => {
    return (
        // <!-- Main Content -->
        <main className="relative z-10">
            {/* <!-- Welcome Message --> */}
            <h2 className="text-4xl font-bold mb-8">Downloaded <span className="text-2xl">👋</span>
            </h2>

            {/* <!-- Image Presets Section --> */}
            <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">

                    {/* <!-- Image Card 1 --> */}


                    {downloadedImages.length > 0 ? (
                        downloadedImages.map((item) => (
                            < div class="image-card rounded-xl overflow-hidden cursor-pointer relative">
                                <div class="absolute bottom-2 right-2  p-1 ">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round" class="lucide lucide-image-down-icon lucide-image-down">
                                        <path
                                            d="M10.3 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10l-3.1-3.1a2 2 0 0 0-2.814.014L6 21" />
                                        <path d="m14 19 3 3v-5.5" />
                                        <path d="m17 22 3-3" />
                                        <circle cx="9" cy="9" r="2" />
                                    </svg>
                                </div>
                                <img src={item} alt="Anime character in kimono"
                                    class="w-full h-48 object-cover" />
                            </div>
                        ))
                    ) : (
                        < div class="image-card rounded-xl overflow-hidden cursor-pointer relative">
                            <p>Download is empty</p>
                        </div>
                    )}
                </div>
            </div>
        </main >
    )
}

export default Downloads