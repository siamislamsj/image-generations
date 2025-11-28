import React from 'react'

const LoadingSkeleton = () => {
    return (
        [...Array(6)].map((_, i) => (
            <div
                key={i}
                className="relative overflow-hidden rounded-xl bg-gray-200 dark:bg-gray-800 animate-pulse"
            >
                {/* Simulated image */}
                <div className="w-full h-48 bg-gray-300 dark:bg-gray-700" />

                {/* Simulated download icon */}
                <div className="absolute bottom-2 right-2">
                    <div className="h-6 w-6 rounded bg-gray-400 dark:bg-gray-600" />
                </div>
            </div>
        ))
    )
}

export default LoadingSkeleton