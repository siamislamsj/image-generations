import { useState } from "react"
import CreateImage from "./components/CreateImage"
import Downloads from "./components/Downloads"
import Glow from "./components/Glow"
import Header from "./components/Header"


function App() {
  const [route, setRoute] = useState('create')
  const [imageData, setImageData] = useState([])
  const [downloadedImages, setDownloadedImages] = useState([])


  let page;

  if (route === 'create') {
    page = <CreateImage downloadedImages={downloadedImages} setDownloadedImages={setDownloadedImages} imageData={imageData} setImageData={setImageData} />
  } else if (route === 'download') {
    page = <Downloads downloadedImages={downloadedImages} />
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* <!-- Header/Logo --> */}
      <Header setRoute={setRoute} />

      {/* <!-- Glow --> */}
      <Glow />

      {/* <!-- Main Content --> */}
      {page}
    </div>
  )
}

export default App
