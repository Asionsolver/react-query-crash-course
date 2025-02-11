import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { fetchProductDetails } from "@/api/api";


const ProductDetails = () => {
    const { id } = useParams();
    // console.log(id);

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["user"],
        queryFn: () => fetchProductDetails(id),
        staleTime: 1000,
    });
    // console.log(data);

    if (isLoading) return <p>Loading products...</p>;
    if (isError) return <p>Error: {error.message}</p>;
    return (
        <div>
            <div className="max-w mx-auto bg-[#21303a]  rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="md:flex">
                    <div className="md:shrink-0">
                        <img
                            className="h-64 w-full object-cover md:h-full md:w-48"
                            src={data.image}
                            alt={data.title}
                        />
                    </div>
                    <div className="p-6 space-y-4 ">
                        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                            {data.category}
                        </div>
                        <h2 className="text-xl font-bold text-white">{data.title}</h2>
                        <p className="mt-2 text-white line-clamp-3">{data.description}</p>

                        <div className="flex items-center justify-between">
                            <span className="text-2xl font-bold text-green-600">
                                ${data.price}
                            </span>
                            <div className="flex items-center">
                                <span className="text-white mr-1">{data.rating.rate}</span>
                                <svg className="w-4 h-4 fill-current text-yellow-400" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <span className="text-white ml-2">({data.rating.count})</span>
                            </div>
                        </div>

                        <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails;
