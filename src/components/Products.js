import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleBidBtn = (product) =>
    navigate(`/products/bid/${product.name}/${product.price}`);

  useEffect(() => {
    const fetchProducts = () => {
      fetch("https://auction-api-micky.herokuapp.com/api")
        .then((res) => res.json())
        .then((data) => {
          setProducts(data.products);
          setLoading(false);
        });
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <div className="table__container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Last Bidder</th>
              <th>Creator</th>
            </tr>
          </thead>
          {/* Data for display, we will later get it from the server */}
          <tbody>
            {loading ? (
              <tr>
                <td>Loading...</td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={`${product.name}${product.price}`}>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.last_bidder || "None"}</td>
                  <td>{product.owner}</td>
                  <td>
                    <button
                      onClick={() => handleBidBtn(product)}
                      style={{
                        padding: "10px",
                        backgroundColor: "green",
                        color: "#fff",
                        border: "none",
                        borderRadius: "5px",
                        width: "90px",
                      }}
                    >
                      Bid
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <Link
          className="add__product"
          to="/products/add"
          style={{
            padding: "10px",
            listStyle: "none",
            border: "none",
            backgroundColor: "green",
            borderRadius: "5px",
            margin: "8px",
            color: "#fff",
          }}
        >
          ADD PRODUCT
        </Link>
      </div>
    </div>
  );
}

export default Products;
