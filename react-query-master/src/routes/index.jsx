import { lazy } from "react";

import { useRoutes } from "react-router";

import AppLayout from '@/components/layout/AppLayout';
const Home = lazy(() => import("@/pages/Home"));
const FetchOld = lazy(() => import("@/pages/FetchOld"));
const FetchRQ = lazy(() => import("@/pages/FetchRQ"));
const UsersList = lazy(() => import("@/pages/UsersList"));
const ProductList = lazy(() => import("@/pages/ProductList"));
const ProductDetails = lazy(() => import("@/components/ui/product/ProductDetails"));
const UserProfile = lazy(() => import("@/components/ui/user/UserProfile"));


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
          path: "trad",
          element: <FetchOld />,
        },
        {
          path: "rq",
          element: <FetchRQ />,
        },
        {
          path: "users",
          element: <UsersList />,
        },
        {
          path: "users/:id",
          element: <UserProfile />,
        },
        {
          path: "products",
          element: <ProductList />,
        },
        {
          path: "products/:id",
          element: <ProductDetails />,
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