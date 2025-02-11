import { useEffect, useState } from "react";
import { getPosts } from "../api/api";
import DataLoadingPage from "../components/ui/loading/DataLoading";

const FetchOld = () => {
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);


  const getPostData = async () => {
    try {
      const response = await getPosts();
      if (response.status === 200) {
        // console.log(response.data);
        setPost(response.data);
        setLoading(false);
      } else {
        console.log('Error fetching data');
        setError(true);
      }
      // console.log(response);
    } catch (error) {
      console.error(error);
      setError(true);
      setLoading(false);
    }
  }

  useEffect(() => {
    getPostData();
  }, []);


  if (loading) {
    return (
      <DataLoadingPage />
    )
  }

  if (error) {
    return (<DataLoadingPage />)
  }



  return (
    <div className="">
      <h1 className="text-3xl text-center my-10">Fetch data using useEffect</h1>
      <ul
        className="p-4 flex flex-col gap-10 items-center"
      >
        {
          post?.map((items) => {
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

export default FetchOld;
