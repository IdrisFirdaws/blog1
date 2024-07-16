import React from "react";
import "./styles/index.scss";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

// Layouts
import RootLayout from "./layout/RootLayout";
import AdminLayout from "./layout/AdminLayout"; // Import AdminLayout

// Pages
import NotFound from "./pages/NotFound";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import CreatePost from "./pages/CreatePost";
import PostPage from "./pages/PostPage";
import EditPost from "./pages/EditPost";
import VisitorHomePage from "./pages/home/VisitorHomePage";
import AdminHomepage from "./pages/home/AdminHomepage";
import VisitorLayout from "./layout/VisitorLayout";
import AboutUs from "./pages/AboutUs";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route path="/" element={<VisitorLayout />}>
        <Route index element={<VisitorHomePage />} />
        <Route path="post/:id" element={<PostPage />} />
        <Route path="edit/:id" element={<EditPost />} />

        <Route path="about" element={<AboutUs />} />
      </Route>

      <Route path="admin" element={<AdminLayout />}>
        <Route index element={<AdminHomepage />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="create" element={<CreatePost />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
  console.log(process.env.REACT_APP_API_URL);
}

export default App;
