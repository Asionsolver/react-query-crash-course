import { useState, useEffect } from 'react';

const DataLoadingPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    // Simulate data loading
    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setIsLoading(false);
                    return 100;
                }
                return prev + 10;
            });
        }, 300);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="min-h-screen bg-[#030711] p-8">
            <div className="max-w-4xl mx-auto">
                {/* Loading Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                        {isLoading ? 'Loading Data...' : 'Data Loaded!'}
                    </h1>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-blue-500 transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                {/* Loading Spinner */}
                {isLoading && (
                    <div className="flex justify-center my-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent" />
                    </div>
                )}

                {/* Skeleton Loaders */}
                <div className="space-y-4">
                    {[...Array(5)].map((_, index) => (
                        <div
                            key={index}
                            className={`p-4 bg-white rounded-lg shadow-sm ${isLoading ? 'animate-pulse' : ''
                                }`}
                        >
                            <div className="flex items-center space-x-4">
                                <div className={`rounded-full h-12 w-12 ${isLoading ? 'bg-gray-200' : 'bg-blue-500'
                                    }`} />
                                <div className="flex-1 space-y-2">
                                    <div className={`h-4 rounded ${isLoading ? 'bg-gray-200 w-3/4' : 'bg-blue-500'
                                        }`} />
                                    <div className={`h-4 rounded ${isLoading ? 'bg-gray-200 w-1/2' : 'bg-blue-500'
                                        }`} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Loaded Content */}
                {!isLoading && (
                    <div className="mt-8 text-center animate-fade-in">
                        <div className="text-green-500 text-xl font-semibold">
                            Data loaded successfully!
                        </div>
                        <button
                            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                            onClick={() => {
                                setIsLoading(true);
                                setProgress(0);
                            }}
                        >
                            Reload Data
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DataLoadingPage;