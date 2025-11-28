import React, { useState } from 'react'
import Search from './Search'
import SettingsPanel from './SettingsPanel'

import Image1 from '../assets/images/ai-image-1.jpeg'
import Image2 from '../assets/images/ai-image-2.jpeg'
import Image3 from '../assets/images/ai-image-3.jpeg'
import Image4 from '../assets/images/ai-image-4.jpeg'
import Image5 from '../assets/images/ai-image-5.jpeg'
import Image6 from '../assets/images/ai-image-6.jpeg'
import LoadingSkeleton from './LoadingSkeleton'
import DownloadButton from './DownloadButton'

const CreateImage = ({ downloadedImages, setDownloadedImages, imageData, setImageData }) => {
    const [loading, setLoading] = useState(false)
    const [prompt, setPrompt] = useState()
    const [parameters, setParameters] = useState({
        model: 'flux',
        seed: 1,
        height: 1024,
        width: 1024
    })

    const handleGenerateImage = async (e) => {
        e.preventDefault();
        setLoading(true);
        const promptQuery = encodeURIComponent(prompt);
        const maxRetries = 3;

        const fetchSingleImage = async (index, retryCount = 0) => {
            const randomSeed = Math.floor(Math.random() * 1000000); // Fully random seed
            try {
                const res = await fetch(
                    `https://image.pollinations.ai/prompt/${promptQuery}&model=${parameters.model}&seed=true&nologo=true&height=${parameters.height}&width=${parameters.width}&seed=${randomSeed}`
                );
                if (res.ok) {
                    return res.url;
                }
            } catch (err) {
                console.error(`Image ${index} failed:`, err);
            }

            if (retryCount < maxRetries) {
                return fetchSingleImage(index, retryCount + 1); // Retry with new seed
            } else {
                return null;
            }
        };

        try {
            const images = [];
            let index = 0;

            while (images.length < 9) {
                const remaining = 9 - images.length;
                const promises = Array.from({ length: remaining }).map((_, i) => fetchSingleImage(index + i));
                const results = await Promise.all(promises);
                const valid = results.filter(Boolean);

                images.push(...valid);
                index += remaining; // Update index to avoid seed collisions
            }

            setImageData(images.slice(0, 9)); // In case extra valid ones came in
        } catch (error) {
            console.error("Image generation error:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = async (imageUrl) => {
        // const imageUrl = "https://image.pollinations.ai/prompt/Create%20an%20image%20of%20US%20white%20house&model=flux&seed=true&nologo=true&height=1024&width=1024&seed=747183";

        try {
            const response = await fetch(imageUrl, { mode: 'cors' });
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;
            link.download = 'pollinations-ai.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);

            if (!downloadedImages.includes(imageUrl)) {
                setDownloadedImages([
                    ...downloadedImages,
                    imageUrl
                ])
            }
        } catch (error) {
            console.error("Download failed", error);
        }
    };

    return (
        <main className="relative z-10">
            {/* <!-- Welcome Message --> */}
            <h2 className="text-4xl font-bold mb-8">Let's create a masterpiece, Alvian! <span className="text-2xl">👋</span>
            </h2>

            {/* <!-- Search Input --> */}

            <form onSubmit={(e) => handleGenerateImage(e)}>
                <div
                    className="relative mb-8 rounded-full overflow-hidden border border-zinc-700 bg-zinc-900/10 backdrop-blur-sm">
                    <div className="flex items-center">
                        <div className="pl-5 pr-2">
                            <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                        </div>
                        <input type="text" placeholder="Create with Prompts"
                            className="outline-none w-full py-4 px-2 bg-transparent text-white placeholder-zinc-400 text-lg" value={prompt} onChange={(e) => setPrompt(e.target.value)} />
                        <button className="bg-zinc-800 hover:bg-zinc-700 transition-colors p-4 mr-1 rounded-full" type='submit'>
                            <svg className="w-6 h-6 text-white transform rotate-90" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z">
                                </path>
                            </svg>
                        </button>
                    </div>
                </div>

            </form>

            {/* <!-- Suggestions Section -->
            <!-- Settings Panel --> */}
            <SettingsPanel parameters={parameters} setParameters={setParameters} />

            {/* <!-- Image Presets Section --> */}
            <div>
                <h3 className="text-zinc-200 mb-4 font-bold text-lg">Result</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                    {loading ? (
                        <LoadingSkeleton />
                    ) : (
                        imageData?.length ? (
                            imageData?.map((item) => (
                                <div className="image-card rounded-xl overflow-hidden cursor-pointer relative">
                                    <div className="absolute cursor-pointer bottom-2 right-2  p-1 ">
                                        <DownloadButton handleDownload={() => handleDownload(item)} />
                                    </div>
                                    <img src={item} alt="Anime character in kimono"
                                        className="w-full h-48 object-cover" />
                                </div>
                            ))
                        ) : (
                            <div className="image-card rounded-xl overflow-hidden cursor-pointer relative">
                                <div className="absolute bottom-2 right-2  p-1 ">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-image-down-icon lucide-image-down"><path d="M10.3 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10l-3.1-3.1a2 2 0 0 0-2.814.014L6 21" /><path d="m14 19 3 3v-5.5" /><path d="m17 22 3-3" /><circle cx="9" cy="9" r="2" /></svg>
                                </div>
                                <img src={Image1} alt="Anime character in kimono"
                                    className="w-full h-48 object-cover" />
                            </div>
                        )
                    )}

                    {/* <!-- Image Card 3 --> */}
                    {/* <div className="image-card rounded-xl overflow-hidden cursor-pointer relative">
                        <div className="absolute bottom-2 right-2  p-1 ">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-image-down-icon lucide-image-down"><path d="M10.3 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10l-3.1-3.1a2 2 0 0 0-2.814.014L6 21" /><path d="m14 19 3 3v-5.5" /><path d="m17 22 3-3" /><circle cx="9" cy="9" r="2" /></svg>
                        </div>
                        <img src={Image3} alt="Fantasy landscape with castle"
                            className="w-full h-48 object-cover" />
                    </div> */}

                    {/* <!-- Image Card 4 --> */}
                    {/* <div className="image-card rounded-xl overflow-hidden cursor-pointer relative">
                        <div className="absolute bottom-2 right-2  p-1 ">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-image-down-icon lucide-image-down"><path d="M10.3 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10l-3.1-3.1a2 2 0 0 0-2.814.014L6 21" /><path d="m14 19 3 3v-5.5" /><path d="m17 22 3-3" /><circle cx="9" cy="9" r="2" /></svg>
                        </div>
                        <img src={Image4} alt="Colorful anime character"
                            className="w-full h-48 object-cover" />
                    </div> */}

                    {/* <!-- Image Card 5 --> */}
                    {/* <div className="image-card rounded-xl overflow-hidden cursor-pointer relative">
                        <div className="absolute bottom-2 right-2  p-1 ">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round" className="lucide lucide-image-down-icon lucide-image-down"><path d="M10.3 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10l-3.1-3.1a2 2 0 0 0-2.814.014L6 21" /><path d="m14 19 3 3v-5.5" /><path d="m17 22 3-3" /><circle cx="9" cy="9" r="2" /></svg>
                        </div>
                        <img src={Image5} alt="Abstract art"
                            className="w-full h-48 object-cover" />
                    </div> */}

                    {/* <!-- Image Card 5 --> */}
                    {/* <div className="image-card rounded-xl overflow-hidden cursor-pointer relative">
                        <div className="absolute bottom-2 right-2  p-1 ">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round" className="lucide lucide-image-down-icon lucide-image-down"><path d="M10.3 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10l-3.1-3.1a2 2 0 0 0-2.814.014L6 21" /><path d="m14 19 3 3v-5.5" /><path d="m17 22 3-3" /><circle cx="9" cy="9" r="2" /></svg>
                        </div>
                        <img src={Image6} alt="Abstract art"
                            className="w-full h-48 object-cover" />
                    </div> */}
                </div>
            </div>
        </main>
    )
}

export default CreateImage