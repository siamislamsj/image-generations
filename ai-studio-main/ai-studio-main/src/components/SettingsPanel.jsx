import React, { useEffect, useState } from 'react'

const SettingsPanel = ({ parameters, setParameters }) => {

    const [models, setModels] = useState([])

    useEffect(() => {
        const getModels = async () => {
            const response = await fetch('https://image.pollinations.ai/models')
            const data = await response.json()

            if (data) {
                setModels(data)
            }
        }

        getModels()
    }, [])

    const handleChange = (e) => {
        setParameters({
            ...parameters,
            [e.target.name]: e.target.value
        })
    }

    const handleRatioClick = (ratio) => {

        switch (ratio) {
            case '1:1':
                return setParameters({
                    ...parameters,
                    height: 1024,
                    width: 1024
                })
                break;
            case '16:9':
                return setParameters({
                    ...parameters,
                    height: 1080,
                    width: 1920
                })
                break;

            case '4:3':
                return setParameters({
                    ...parameters,
                    height: 1024,
                    width: 1365
                })
                break;

            case '3:2':
                return setParameters({
                    ...parameters,
                    height: 1024,
                    width: 1536
                })
                break;

            default:

                break;
        }

    }




    return (
        <div className="border border-zinc-700/70 mb-6 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium">Advanced Settings</h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* <!-- Model Selection --> */}
                <div>
                    <label htmlFor="model" className="block text-sm font-medium text-zinc-700 mb-1">Model</label>
                    <select id="model" name='model'
                        className="w-full px-3 py-2 bg-zinc-900/10 border border-zinc-700/70 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" onChange={handleChange} >
                        {models?.map((item, index) => (

                            <option key={index} className="bg-zinc-900" value={item} aria-selected>{item}</option>
                        ))}
                    </select>
                </div>

                {/* <!-- Seed Input : Auto Generated, readonly for user --> */}
                <div>
                    <label htmlFor="seed" className="block text-sm font-medium text-zinc-700 mb-1">Seed (for reproducible
                        results)</label>
                    <input type="number" id="seed" name='seed'
                        className="w-full bg-zinc-900/10 px-3 py-2 border border-zinc-700/70 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="Random" onChange={handleChange} value={parameters.seed} />
                </div>

                {/* <!-- Width Input --> */}
                <div>
                    <label htmlFor="width" className="block text-sm font-medium text-zinc-700 mb-1">Width</label>
                    <input type="number" id="width" value={parameters.width} name="width"
                        className="w-full bg-zinc-900/10 px-3 py-2 border border-zinc-700/70 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" onChange={handleChange} />
                </div>

                {/* <!-- Height Input --> */}
                <div>
                    <label htmlFor="height" className="block text-sm font-medium text-zinc-700 mb-1">Height</label>
                    <input type="number" id="height" value={parameters.height} name='height'
                        className="w-full bg-zinc-900/10 px-3 py-2 border border-zinc-700/70 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" onChange={handleChange} />
                </div>

                {/* <!-- Aspect Ratio Presets --> */}
                <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-1">Aspect Ratio Presets</label>
                    <div className="flex flex-wrap gap-2">
                        <button
                            className={`px-3 py-3 text-xs ${(parameters.height === 1024 && parameters.width === 1024) ? 'bg-zinc-800' : 'bg-zinc-900/10'}  hover:bg-zinc-800 rounded transition-colors`} onClick={() => handleRatioClick('1:1')}>1:1</button>
                        <button
                            className={`px-3 py-3 text-xs ${(parameters.height === 1080 && parameters.width === 1920) ? 'bg-zinc-800' : 'bg-zinc-900/10'}  hover:bg-zinc-800 rounded transition-colors`} onClick={() => handleRatioClick('16:9')}>16:9</button>
                        <button
                            className={`px-3 py-3 text-xs ${(parameters.height === 1024 && parameters.width === 1365) ? 'bg-zinc-800' : 'bg-zinc-900/10'}  hover:bg-zinc-800 rounded transition-colors`} onClick={() => handleRatioClick('4:3')}>4:3</button>
                        <button
                            className={`px-3 py-3 text-xs ${(parameters.height === 1024 && parameters.width === 1536) ? 'bg-zinc-800' : 'bg-zinc-900/10'}  hover:bg-zinc-800 rounded transition-colors`} onClick={() => handleRatioClick('3:2')}>3:2</button>
                    </div>
                </div>

                {/* <!-- No Logo Toggle --> */}

            </div>
        </div>
    )
}

export default SettingsPanel