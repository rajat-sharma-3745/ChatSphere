import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import { useAppContext } from "./context/AppContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Modal from "./components/common/Modal";
import ChannelPage from "./pages/ChannelPage";
import { ChannelProvider } from "./context/ChannelContext";
import { SocketProvider } from "./context/socketContext";

function App() {
  const { user } = useAppContext();
  const router = createBrowserRouter([
    {
      path: "/auth",
      element: (
        <ProtectedRoute user={!user} redirect="/">
          <Login />
        </ProtectedRoute>
      ),
    },

    {
      path: "/",
      element: (
        <ProtectedRoute user={user}>
          <SocketProvider>
            <ChannelProvider>
              <Layout />
            </ChannelProvider>
          </SocketProvider>
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/channel/:id",
          element: <ChannelPage />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
