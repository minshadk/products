import { BrowserRouter, Route, Routes, Link, Navigate } from "react-router-dom";
import ProductDetails from "./pages/product/ProductDetails";
import Products from "./pages/products/Products";

function App() {
  return (
    // Wrap the entire application in a BrowserRouter component to enable routing.
    <BrowserRouter>
      {/* Define the routing configuration using the Routes component. */}
      <Routes>
        {/* Define a route for the homepage, which renders the Products component. */}
        <Route path="/" element={<Products />} />

        {/* Define a route for displaying the details of a specific product.
             The ":id" is a route parameter that can capture the product ID from the URL. */}
        <Route path="product/:id" element={<ProductDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
