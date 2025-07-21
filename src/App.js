import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import {
	HomePage,
	NavBar,
	Checkout,
	SearchResults,
	ProductPage,
	NotFound,
} from "./components";

const App = () => {
	const [showBanner, setShowBanner] = useState(true);

	return (
		<BrowserRouter>
			{/* Dismissible Top Banner */}
			{showBanner && (
				<div className="flex justify-between items-center bg-red-600 text-white h-[30px] text-sm font-semibold px-4">
					<p className="text-center w-full">
						Welcome to <strong>Amazon Clone!</strong> This website is a clone of
						Amazon and is built for educational purposes only.
					</p>
					<button
						onClick={() => setShowBanner(false)}
						className="ml-4 text-white font-bold px-2 hover:text-gray-200"
						aria-label="Close banner"
					>
						X
					</button>
				</div>
			)}

			{/* Navigation */}
			<NavBar />

			{/* Main Content */}
			<main>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/search" element={<SearchResults />} />
					<Route path="/product/:id" element={<ProductPage />} />
					<Route path="/checkout" element={<Checkout />} />
					<Route path="*" element={<NotFound />} /> {/* 404 route */}
				</Routes>
			</main>
		</BrowserRouter>
	);
};

export default App;
