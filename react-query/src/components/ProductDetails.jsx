/* eslint-disable react/prop-types */
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const retrieveProducts = async ({ queryKey }) => {
  // console.log(obj)
  const response = await axios.get(
    `http://localhost:3000/${queryKey[0]}/${queryKey[1]}`
  );

  return response.data;
};

export default function ProductDetails({ id }) {
  const {
    data: product,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["products", id],
    queryFn: retrieveProducts,
    // refetchInterval: 5000,
  });
  if (isLoading) {
    return <div>Product details data fetching</div>;
  }
  if (error) {
    return <div>Error occurred: {error.message}</div>;
  }
  return (
    <div className="w-1/5">
      <h1 className=" text-3xl my-2">Product Details</h1>
      <div className="border bg-gray-100 text-md rounded flex flex-col">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="object-cover h-24 w-full"
        />
        <p className=" pl-3 m-1">ModelNo: {product.title}</p>
        <p className=" pl-3 m-1">Description: {product.description}</p>
        <p className=" pl-3 m-1">Price: ${product.price}</p>
        <p className=" pl-3 m-1">{product.rating}/5</p>
      </div>
    </div>
  );
}
