import {
    createBrowserRouter,
    RouterProvider,
    Navigate,
} from "react-router-dom";
import { Suspense, lazy } from "react";

import MainLayout from "./pages/MainLayout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

const Dasboard = lazy(() => {
    return import("./pages/Dashboard.js");
});
const Hotels = lazy(() => {
    return import("./pages/Hotels.js");
});
const NewHotel = lazy(() => {
    return import("./pages/NewHotel.js");
});
const NewRoom = lazy(() => {
    return import("./pages/NewRoom.js");
});
const Rooms = lazy(() => {
    return import("./pages/Rooms.js");
});
const Transactions = lazy(() => {
    return import("./pages/Transactions.js");
});
const Users = lazy(() => {
    return import("./pages/Users.js");
});

function App() {
    const loading = (
        <p style={{ textAlign: "center", marginTop: "3em" }}>
            Loading page ...
        </p>
    );

    const router = createBrowserRouter([
        {
            path: "/",
            element: <MainLayout />,
            children: [
                {
                    index: true,
                    element: (
                        <Suspense fallback={loading}>
                            <Dasboard />
                        </Suspense>
                    ),
                },
                {
                    path: "/hotel",
                    element: (
                        <Suspense fallback={loading}>
                            <Hotels />
                        </Suspense>
                    ),
                },
                {
                    path: "/room",
                    element: (
                        <Suspense fallback={loading}>
                            <Rooms />
                        </Suspense>
                    ),
                },
                {
                    path: "/new-hotel",
                    element: (
                        <Suspense fallback={loading}>
                            <NewHotel />
                        </Suspense>
                    ),
                },
                {
                    path: "/new-hotel/:hotelId",
                    element: (
                        <Suspense fallback={loading}>
                            <NewHotel />
                        </Suspense>
                    ),
                },
                {
                    path: "/new-room",
                    element: (
                        <Suspense fallback={loading}>
                            <NewRoom />
                        </Suspense>
                    ),
                },
                {
                    path: "/new-room/:roomId",
                    element: (
                        <Suspense fallback={loading}>
                            <NewRoom />
                        </Suspense>
                    ),
                },
                {
                    path: "/transactions",
                    element: (
                        <Suspense fallback={loading}>
                            <Transactions />
                        </Suspense>
                    ),
                },
                {
                    path: "/user",
                    element: (
                        <Suspense fallback={loading}>
                            <Users />
                        </Suspense>
                    ),
                },
                {
                    path: "/login",
                    element: <LoginPage />,
                },
                {
                    path: "/register",
                    element: <RegisterPage />,
                },
                {
                    path: "*",
                    element: <Navigate to="/"></Navigate>,
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
}

export default App;
