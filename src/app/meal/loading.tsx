import React from 'react';

const loading = () => {
    return (
        <div className="max-w-7xl w-full mx-auto mt-10 px-4">


            <div className="mb-8">
                <div className="h-8 w-48 bg-gray-200 rounded-lg animate-pulse mb-2"></div>
                <div className="h-4 w-32 bg-gray-200 rounded-lg animate-pulse"></div>
            </div>


            <div className="mb-8">
                <div className="h-32 w-full bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl animate-pulse"></div>
            </div>

            <div className="mb-8">
                <div className="h-64 w-full bg-white rounded-2xl border border-gray-100 shadow-md p-6 animate-pulse">
                    <div className="h-6 w-40 bg-gray-200 rounded mb-4"></div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="h-24 bg-gray-100 rounded-xl"></div>
                        <div className="h-24 bg-gray-100 rounded-xl"></div>
                        <div className="h-24 bg-gray-100 rounded-xl"></div>
                    </div>
                    <div className="h-10 w-32 bg-gray-200 rounded-full"></div>
                </div>
            </div>


            <div className="mt-10 mb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                    <div key={item} className="bg-white rounded-2xl border border-gray-100 shadow-md overflow-hidden animate-pulse">

                        <div className="px-5 py-4 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-2.5 h-2.5 bg-gray-300 rounded-full"></div>
                                    <div className="h-6 w-16 bg-gray-200 rounded"></div>
                                </div>
                                <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
                            </div>
                            <div className="h-3 w-24 bg-gray-200 rounded mt-1 ml-3.5"></div>
                        </div>


                        <div className="p-4 space-y-3">
                            {[1, 2, 3].map((meal) => (
                                <div key={meal} className="flex items-center justify-between p-3">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-xl bg-gray-100">
                                            <div className="w-5 h-5 bg-gray-200 rounded"></div>
                                        </div>
                                        <div>
                                            <div className="h-4 w-16 bg-gray-200 rounded"></div>
                                            <div className="h-3 w-12 bg-gray-200 rounded mt-1"></div>
                                        </div>
                                    </div>
                                    <div className="w-12 h-6 bg-gray-200 rounded-full"></div>
                                </div>
                            ))}
                        </div>


                        <div className="px-5 py-3 bg-gray-50 border-t border-gray-100">
                            <div className="flex items-center justify-between">
                                <div className="h-3 w-32 bg-gray-200 rounded"></div>
                                <div className="flex gap-1.5">
                                    <div className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
                                    <div className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
                                    <div className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default loading;