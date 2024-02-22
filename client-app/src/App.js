import {
    createBrowserRouter,
    RouterProvider,
    Navigate,
} from "react-router-dom";
import { lazy, Suspense } from "react";

import MainLayout from "./layout/MainLayout.js";
import ErrorPage from "./pages/ErrorPage.js";
import LoginPage from "./pages/LoginPage";
const HomePage = lazy(() => {
    return import("./pages/HomPage.js");
});
const RegisterPage = lazy(() => {
    return import("./pages/RegisterPage.js");
});
const DetailPage = lazy(() => {
    return import("./pages/DetailPage.js");
});
const SearchPage = lazy(() => {
    return import("./pages/SearchPage.js");
});
const Stays = lazy(() => {
    return import("./layout/navbar/Stays.js");
});
const Flights = lazy(() => {
    return import("./layout/navbar/Flights.js");
});
const CarRentals = lazy(() => {
    return import("./layout/navbar/CarRentals.js");
});
const Attractions = lazy(() => {
    return import("./layout/navbar/Attractions.js");
});
const AirportTaxis = lazy(() => {
    return import("./layout/navbar/AirportTaxis.js");
});
const Transactions = lazy(() => {
    return import("./pages/Transactions.js");
});

function App() {
    const loading = <p style={{ textAlign: "center" }}>Loading page ...</p>;
    const router = createBrowserRouter([
        {
            path: "/",
            element: <MainLayout />,
            children: [
                {
                    index: true,
                    element: (
                        <Suspense fallback={loading}>
                            <HomePage />
                        </Suspense>
                    ),
                },
                {
                    path: "/register",
                    element: (
                        <Suspense fallback={loading}>
                            <RegisterPage />
                        </Suspense>
                    ),
                },
                {
                    path: "/login",
                    element: (
                        <Suspense fallback={loading}>
                            <LoginPage />
                        </Suspense>
                    ),
                },
                {
                    path: "/stays",
                    element: (
                        <Suspense fallback={loading}>
                            <Stays />
                        </Suspense>
                    ),
                },
                {
                    path: "/flights",
                    element: (
                        <Suspense fallback={loading}>
                            <Flights />
                        </Suspense>
                    ),
                },
                {
                    path: "/car-rentals",
                    element: (
                        <Suspense fallback={loading}>
                            <CarRentals />
                        </Suspense>
                    ),
                },
                {
                    path: "/attractions",
                    element: (
                        <Suspense fallback={loading}>
                            <Attractions />
                        </Suspense>
                    ),
                },
                {
                    path: "/airport-taxis",
                    element: (
                        <Suspense fallback={loading}>
                            <AirportTaxis />
                        </Suspense>
                    ),
                },
                {
                    path: "/search",
                    element: (
                        <Suspense fallback={loading}>
                            <SearchPage />
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
                    path: "/detail/:bookingId",
                    element: (
                        <Suspense fallback={loading}>
                            <DetailPage />
                        </Suspense>
                    ),
                },
                {
                    path: "*",
                    element: <ErrorPage />,
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
}

export default App;
