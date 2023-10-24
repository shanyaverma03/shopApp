import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ShopItem from "./ShopItem";

const ProductDetail = () => {
  const { productId } = useParams();
  const [productDetails, setProductDetails] = useState({});

  useEffect(() => {
    const fetchProductDetails = async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get(`/product/${productId}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      console.log(response);
      console.log(productId);
      const id = response.data._id;
      const title = response.data.title;
      const description = response.data.description;
      const price = response.data.price;
      const image = response.data.image;
      const product = {
        id,
        title,
        description,
        price,
        image,
      };
      setProductDetails(product);
    };

    fetchProductDetails();
  }, [productId]);

  return (
    <div>
      <h1>Product component</h1>
      <ShopItem
        id={productDetails.id}
        title={productDetails.title}
        description={productDetails.description}
        price={productDetails.price}
        image={productDetails.image}
        showDetailsButton={false}
      />
    </div>
  );
};

export default ProductDetail;
