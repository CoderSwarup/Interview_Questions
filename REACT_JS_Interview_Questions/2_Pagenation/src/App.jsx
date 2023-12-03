import { useEffect, useState } from "react";

import "./App.css";

function App() {
  const [products, setProcucts] = useState([]);
  const [page, sePage] = useState(1);
  const ProductsLength = products?.length / 10;

  const FetchProduct = async () => {
    const res = await fetch("https://dummyjson.com/products?limit=100");
    const data = await res.json();

    setProcucts(data.products);
  };

  const SelectPageHandler = (selectPage) => {
    if (selectPage > 0 && selectPage !== page && selectPage <= ProductsLength)
      sePage(selectPage);
  };

  useEffect(() => {
    FetchProduct();
  }, []);

  return (
    <>
      {
        <div className="container">
          <h1>Products Pagination</h1>
          <ul>
            {products
              ?.slice((page - 1) * ProductsLength, page * ProductsLength)
              .map((product) => (
                <li key={product.id}>
                  <img src={product.thumbnail} alt={product.title} />
                  <div className="details">
                    <p>{product.id}</p>
                    <p>{product.title} </p>
                    <p>${product.price}</p>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      }

      {products?.length > 0 && (
        <div className="pagination">
          <button
            disabled={page === 1 ? true : false}
            onClick={() => SelectPageHandler(page - 1)}
          >
            ⏮️
          </button>
          {[...Array(ProductsLength)].map((_, i) => {
            // Determine the range of pages to display
            const pageRange = 3; // Adjust this value as needed
            const startPage = Math.max(1, page - pageRange);
            const endPage = Math.min(ProductsLength, page + pageRange);

            // Display buttons only for the determined range
            if (i + 1 >= startPage && i + 1 <= endPage) {
              return (
                <button
                  className={`btn ${page === i + 1 ? "selectedPage" : ""}`}
                  onClick={() => SelectPageHandler(i + 1)}
                  key={i}
                >
                  {i + 1}
                </button>
              );
            }

            // Show ellipsis (...) for pages outside the range
            if (i + 1 === startPage - 1 || i + 1 === endPage + 1) {
              return (
                <span className="dots" key={i}>
                  ...
                </span>
              );
            }

            return null; // Hide other pages
          })}
          <button
            disabled={page === ProductsLength ? true : false}
            onClick={() => SelectPageHandler(page + 1)}
          >
            ⏭️
          </button>
        </div>
      )}
    </>
  );
}

export default App;
