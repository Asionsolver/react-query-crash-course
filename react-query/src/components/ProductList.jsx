import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const retrieveProducts = async ({ queryKey }) => {
  // console.log(obj);
  // Before pagination implementation.
  // const response = await axios.get(`http://localhost:3000/${queryKey[0]}`);

  // After pagination implementation.
  const response = await axios.get(
    `http://localhost:3000/products?_page=${queryKey[1].page}&_per_page=5`
  );
  // console.log(response.data);
  return response.data;
};

export default function ProductList() {
  const [page, setPage] = useState(1);
  const {
    data: products,
    error,
    isLoading,
  } = useQuery({
    // Before pagination implementation.
    // queryKey: ["products"],
    // After pagination implementation.
    queryKey: ["products", { page }],
    queryFn: retrieveProducts,
    // staleTime: 5000,
    // refetchInterval: 1000,
    // refetchInterval:()=>{
    //   // if new product is added, refetch the data
    //   if (products){
    //     return 1000;
    //   }
    //   return false;
    // }
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>An Error occurred: {error.message}</div>;
  }
  return (
    <div className=" flex flex-col justify-center items-center w-3/5">
      <h2 className="text-3xl my-2">Product List</h2>
      <ul className="flex flex-wrap justify-center items-center">
        {products.data &&
          products.data.map((product) => (
            <li
              key={product.id}
              className="flex flex-col items-center m-2  border rounded-sm"
            >
              <img
                className="object-cover h-64 w-96 rounded-sm"
                src={product.thumbnail}
                alt={product.title}
              />
              <p className="text-xl my-3">{product.title}</p>
            </li>
          ))}
      </ul>
      <div>
        {products.prev && (
          <button
            className="p-1 mx-1 bg-gray-100 border cursor-pointer rounded-sm"
            onClick={() => setPage(products.prev)}
          >
            Previous
          </button>
        )}
        {products.next && (
          <button
            className="p-1 mx-1 bg-gray-100 border cursor-pointer rounded-sm"
            onClick={() => setPage(products.next)}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}
