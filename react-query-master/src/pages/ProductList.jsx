import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../api/api";
import { NavLink } from "react-router";


const ProductList = () => {
    const { data, isLoading, isError, error, isFetching, dataUpdatedAt, isStale, refetch } = useQuery({
        queryKey: ["products"],
        queryFn: fetchProducts,
        staleTime: 1000, // Data is fresh for 5 seconds
    });

    if (isLoading) return <p>Loading products...</p>;
    if (isError) return <p>Error: {error.message}</p>;
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Product List</h1>
            <button onClick={refetch} className="px-4 py-2 bg-blue-500 text-white rounded">
                Refetch Data
            </button>
            {isFetching && <p className="text-sm text-gray-500">Updating...</p>}
            <p className="text-sm text-gray-400">Last updated: {new Date(dataUpdatedAt).toLocaleTimeString()}</p>
            <p className="text-sm">{isStale ? "Data is stale" : "Data is fresh"}</p>
            <ul className="grid grid-cols-2 gap-4 mt-4">
                {data.map((product) => (
                    <li key={product.id} className="p-4 bg-[#21303a] hover:bg-gray-600 border-l-4 border-green-500  shadow rounded-md">
                        <NavLink to={`/products/${product.id}`}>
                            <h3 className="font-semibold text-white">{product.title}</h3>
                            <p className="text-white">${product.price}</p>
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ProductList