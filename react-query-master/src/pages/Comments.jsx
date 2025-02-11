import { useState } from "react";
import { fetchComments } from "@/api/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";


const Comments = () => {
    const [page, setPage] = useState(1);
    const { data, isLoading, isError, error, isFetching } = useQuery({
        queryKey: ['comments', page],
        queryFn: () => fetchComments(page),
        placeholderData: keepPreviousData,
    });



    if (isLoading) return <p className="text-blue-500">Loading comments...</p>;
    if (isError) return <p className="text-red-500">Error: {error.message}</p>;
    return (
        <div> <div className="p-6 bg-[#21303a] rounded-md shadow-md">
            <h2 className="text-4xl font-bold mb-8 text-center">Comments</h2>

            {isFetching && isLoading && <p className="text-yellow-500">Fetching new page...</p>}

            <ul className="space-y-2">
                {data.map(comment => (
                    <li key={comment.id} className="p-3 border-l-4 border-amber-300 bg-gray-700 rounded-md shadow">
                        <p className="my-5">{comment.id}</p>
                        <h3 className=" my-3 font-semibold text-white">{comment.name}</h3>
                        <p className="font-semibold text-white">{comment.email}</p>
                        <p className="text-white">{comment.body}</p>
                    </li>
                ))}
            </ul>
            {
                data.length === 0 && <p className="text-center text-4xl p-8 text-red-500">There is no comment. Please go back.</p>
            }

            <div className="flex justify-between mt-4">
                <button
                    onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
                >
                    Previous
                </button>
                <span className="">Page {page}</span>
                <button
                    disabled={data.length === 0}
                    onClick={() => setPage(prev => prev + 1)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
                >
                    Next
                </button>
            </div>
        </div></div>
    )
}

export default Comments