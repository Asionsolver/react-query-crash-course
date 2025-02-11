
import { useQuery } from '@tanstack/react-query';
import { fetchPosts } from '@/api/api';
import DataLoadingPage from '@/components/ui/loading/DataLoading';

const FetchRQ = () => {
  const { data, isLoading, isError, error, failureCount,
    refetch } = useQuery({
      queryKey: ['posts'], queryFn: fetchPosts, retry: 3
    });

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
    <div className="">
      <h1 className="text-3xl text-center my-10">Fetch data using Tanstack Query</h1>
      <ul
        className="p-4 flex flex-col gap-10 items-center"
      >
        {
          data?.map((items) => {
            const { id, title, body } = items;
            return (
              <li key={id} className="p-4 bg-[#21303a] hover:bg-gray-600 border-l-4 border-green-500 rounded max-w-xl">
                <h2 className="text-xl font-semibold">{title}</h2>
                <p className="text-white mt-4">{body}</p>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default FetchRQ;
