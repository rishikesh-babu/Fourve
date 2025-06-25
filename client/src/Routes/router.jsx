import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Home from "../Page/Home/Home";
import CreatePost from "../Page/CreatePost/CreatePost";

const router = createBrowserRouter([
    {
        path: '/', 
        element: <Layout />,
        children: [
            {
                path: '/', 
                element: <Home />
            }, 
            {
                path: 'create-post', 
                element: <CreatePost />
            }
        ] 
    }, 
])

export default router