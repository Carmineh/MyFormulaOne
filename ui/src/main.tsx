import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

//ALL THE ROUTERS OF THE PAGE
import HomePage from "./pages/Homepage";

import DriverPage from "./pages/DriverPage";
import DriversPage from "./pages/DriversPage";

import RacePage from "./pages/RacePage";
import RacesPage from "./pages/RacesPage";

import CircuitPage from "./pages/CircuitPage";
import CircuitsPage from "./pages/CircuitsPage";
import HallOfFamePage from "./pages/HallOfFamePage";

const router = createBrowserRouter([
	{
		path: "/",
		element: <HomePage />,
		errorElement: <h1>404 Not Found</h1>,
	},
	{
		path: "/drivers",
		element: <DriversPage />,
	},
	{
		path: "/drivers/:id",
		element: <DriverPage />,
	},
	{
		path: "/races",
		element: <RacesPage />,
	},
	{
		path: "/races/:id",
		element: <RacePage />,
	},
	{
		path: "/hof",
		element: <HallOfFamePage />,
	},
	{
		path: "/circuits",
		element: <CircuitsPage />,
	},
	{
		path: "/circuits/:id",
		element: <CircuitPage />,
	},
]);
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
