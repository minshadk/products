import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import { useParams } from "react-router-dom";

/**
 * ProductDetails Component
 *
 * This component is responsible for displaying details of a specific product.
 *
 */
export default function ProductDetails() {
  // Extract the "id" parameter from the URL using the useParams hook.
  const { id } = useParams();

  // Initialize the navigate function from react-router-dom for programmatic navigation.
  const navigate = useNavigate();

  // State variables for handling loading, error, and product data.
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [product, setProduct] = useState(null);

  // Function to fetch product details from an API.
  const fetchProduct = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Send a request to the API to fetch product data by "id".
      const response = await fetch(
        `https://api.slingacademy.com/v1/sample-data/products?offset=${id}&limit=1`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Parse the response JSON data.
      const data = await response.json();

      // Set the retrieved product data in the state.
      setProduct(data.products[0]);
    } catch (error) {
      // Handle errors by setting the error state.
      setError(error);
    } finally {
      // Set loading to false once the request is complete.
      setIsLoading(false);
    }
  };

  // useEffect hook to trigger the fetchProduct function when the component mounts.
  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <section className={styles.page}>
      <div className={styles.container}>
        {isLoading && <p>Loading...</p>}
        {product && (
          <div className={styles.productContainer}>
            <div>
              {/* Display the product image, name, description, and a back button. */}
              <img
                className={styles.productImage}
                src={product.photo_url}
                alt={product.name}
              />
              <h1>{product.name}</h1>
              <p>{product.description}</p>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  // Navigate back to the previous page.
                  navigate(-1);
                }}
                className={styles.button}
              >
                &larr; Back
              </button>
            </div>
          </div>
        )}
        {error && <p>Error: {error.message}</p>}
      </div>
    </section>
  );
}
