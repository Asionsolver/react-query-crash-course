import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { fetchProductDetails } from "@/api/api";
import { Star } from "lucide-react";


const ProductDetails = () => {
    const { id } = useParams();
    // console.log(id);

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["product", id],
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
                            className="h-64 w-full object-cover md:h-full md:w-auto"
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
                                <Star color=' #FFFF00' />
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
