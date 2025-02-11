
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchPosts } from '@/api/api';
import DataLoadingPage from '@/components/ui/loading/DataLoading';
import { PencilLine, RefreshCw, Trash } from 'lucide-react';
import { deletePost } from '@/api/api';


const FetchRQ = () => {
  const { data, isLoading, isError, error, failureCount,
    refetch } = useQuery({
      queryKey: ['posts'], queryFn: fetchPosts, retry: 3
    });

  const queryClient = useQueryClient();


  // ! mutation function to delete post
  const deleteMutation = useMutation({
    mutationFn: (id) => deletePost(id),
    onSuccess: (data, id) => {
      // console.log(data);
      queryClient.setQueryData(['posts'], (currData) => {
        return currData.filter((item) => item.id !== id);
      })

      alert(`Post with id ${id} has been deleted`);
    }
  })

  if (isLoading) {
    return (
      <DataLoadingPage />
    )
  }

  if (isError) {
    return (<div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
      <p>Error: {error.message}</p>
      <p>Retries: {failureCount}</p>
      <button onClick={refetch} className="mt-2 px-4 py-2 bg-red-500 text-white rounded">
        Retry
      </button>
    </div> || <DataLoadingPage />)
  }



  return (
    <div className="p-4">
      <h1 className="text-3xl text-center my-10">Fetch data using Tanstack Query</h1>
      <div className=" max-w-xl mx-auto flex flex-col items-end">
        <button className=' p-2 bg-amber-600 mt-5 rounded-sm  hover:bg-amber-700 transition-all duration-200' onClick={() => alert(`This post id is`)}><PencilLine /></button>
      </div>
      <ul
        className="p-4 flex flex-col gap-10 items-center"
      >
        {
          data?.map((items) => {
            const { id, title, body } = items;
            return (
              <li key={id} className="flex  flex-col p-4 bg-[#21303a] hover:bg-gray-600 border-l-4 border-green-500 rounded max-w-xl">
                <h2 className="text-xl font-semibold">{title}</h2>
                <p className="text-white mt-4">{body}</p>

                <div className='self-end flex gap-2'>
                  <button className=' p-2 bg-green-600 mt-5 rounded-sm  hover:bg-green-700 transition-all duration-200' onClick={() => alert(`This post id is ${id}`)}>
                    <RefreshCw />
                  </button>
                  <button className='p-2 bg-blue-600 mt-5 rounded-sm  hover:bg-red-700 transition-all duration-200' onClick={() => deleteMutation.mutate(id)}>
                    <Trash />
                  </button>
                </div>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default FetchRQ;
