import { lazy } from "react";

import { useRoutes } from "react-router";

const Home = lazy(() => import("@/pages/Home"));
import AppLayout from '@/components/layout/AppLayout';
const FetchOld = lazy(() => import("@/pages/FetchOld"));
const FetchRQ = lazy(() => import("@/pages/FetchRQ"));


function Routes() {
  const routeElements = useRoutes([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path:"trad",
          element:<FetchOld/>,
        },
        {
          path:"rq",
          element:<FetchRQ/>,
        }
      ],
    },
    {
      path: "*",
      element: <div>404 Not Found</div>,
    },
  ]);
  return routeElements;
}
export default Routes;