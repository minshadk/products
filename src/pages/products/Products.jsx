import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import ProductCard from "../../components/ProductCard";
import { Link } from "react-router-dom";

/**
 * Products Component
 *
 * This component is responsible for displaying all products.
 *
 */

// Define the functional component Products
export default function Products() {
  //  state variables for products, error, loading indicator, and pagination offset
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [offset, setOffset] = useState(0);

  // Function to fetch products from an API
  const fetchProducts = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.slingacademy.com/v1/sample-data/products?offset=${offset * 10}&limit=10`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      const newProducts = data.products;

      if (newProducts.length > 0) {
        // Only update the products state if new products were fetched
        setProducts((prevProducts) => [...prevProducts, ...newProducts]);
        setOffset((prevOffset) => prevOffset + 1);
      }
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect to fetch initial data when the component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  // Function to handle scrolling and trigger additional data fetching
  const handleScroll = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollPosition = window.scrollY;

    if (windowHeight + scrollPosition >= documentHeight - 100) {
      fetchProducts();
    }
  };

  // useEffect to attach the scroll event listener and clean it up when unmounting
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  // Render the component JSX
  return (
    <section className={styles.page}>
      <div className={styles.container}>
        {isLoading && <p>Loading...</p>}
        {products.map((product) => (
          <Link
            // Create a link to the product detail page
            to={`product/${parseInt(product.id - 1)}`}
            style={{ textDecoration: "none" }}
            key={product.id}
          >
            {/* Render ProductCard component with product information */}
            <ProductCard
              name={product.name}
              description={product.description}
              imageUrl={product.photo_url}
            />
          </Link>
        ))}
        {error && <p>Error: {error.message}</p>}
      </div>
    </section>
  );
}
