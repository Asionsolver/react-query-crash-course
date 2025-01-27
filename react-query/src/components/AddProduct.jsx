import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

export default function AddProduct() {
  const queryClient = useQueryClient();
  const [state, setState] = useState({
    title: "",
    description: "",
    price: 0,
    rating: 5,
    thumbnail: "",
  });

  const mutation = useMutation({
    mutationFn: (newProduct) => {
      axios.post("http://localhost:3000/products", newProduct);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      // this is manual update
      // queryClient.setQueryData(["products"], (old) => [...old, state]);
    },
    // this is called before the mutationFn is called
    // onMutate: (newProduct) => {
    //   queryClient.cancelQueries(["products"]);
    //   const previousProducts = queryClient.getQueryData(["products"]);
    //   queryClient.setQueryData(["products"], (old) => [
    //     ...old,
    //     newProduct,
    //   ]);
    //   return { previousProducts };
    // },
  });

  const submitData = (e) => {
    e.preventDefault();
    console.log(state);
    const newData = { ...state, id: crypto.randomUUID().toString() };
    mutation.mutate(newData);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value =
      e.target.value === "number" ? e.target.valueAsNumber : e.target.value;
    setState({ ...state, [name]: value });
  };

  if (mutation.isLoading) {
    return <div>Adding product...</div>;
  }

  if (mutation.isError) {
    return <div>Error occurred: {mutation.error.message}</div>;
  }

  return (
    <div className="m-2 p-2 bg-gray-100 w-1/5 h-1/2">
      <h2 className="text-3xl p-1 my-2">Add Product</h2>
      {mutation.isSuccess && <div>Product added successfully</div>}
      <form className="flex flex-col" onSubmit={submitData}>
        <input
          type="text"
          placeholder="Model No"
          className="border rounded p-1 m-1"
          value={state.title}
          name="title"
          onChange={handleChange}
        />

        <input
          type="number"
          placeholder="Price"
          className="border rounded-sm p-1 m-1"
          value={state.price}
          name="price"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Rating"
          className="border rounded-sm p-1 m-1"
          value={state.rating}
          name="rating"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Thumbnail URL"
          className="border rounded-sm p-1 m-1"
          value={state.thumbnail}
          name="thumbnail"
          onChange={handleChange}
        />
        <textarea
          type="text"
          placeholder="Description"
          className="border rounded-sm p-1 m-1"
          value={state.description}
          name="description"
          onChange={handleChange}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 my-6 rounded mx-auto w-1/2"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}
