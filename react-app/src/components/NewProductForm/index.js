import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { addProduct } from "../../store/products";
import UploadPicture from "../UploadPicture";
import "./NewProductForm.css";

function NewProductForm() {
  const dispatch = useDispatch();
  const history = useHistory();

  const sessionUser = useSelector((state) => state.session.user);

  const [product_name, setProductName] = useState("");
  const [price, setPrice] = useState(0);
  const [inventory, setInventory] = useState(0);
  const [category_id, setCategoryId] = useState(1);
  const [description, setDescription] = useState("");
  const [image_url_2, setImageUrl2] = useState("");
  const [image_url_1, setImageUrl1] = useState("");
  const [image_url_3, setImageUrl3] = useState("");
  const [image_url_4, setImageUrl4] = useState("");
  const [image_url_5, setImageUrl5] = useState("");
  const [image_url_6, setImageUrl6] = useState("");

  

  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const errors = [];
    const imgUrlValidator = /(https?:\/\/.*\.(?:png|jpg|jpeg))/i;

    if (product_name.length > 50) {
      errors.push("Product name must be less than 50 characters");
    } else if (product_name.length <= 0) {
      errors.push("Please provide a Product Name");
    }

    if (price <= 0) {
      errors.push("Price must be greater than 0");
    } else if (price >= 10000) {
      errors.push("Price may not exceed over $10,0000");
    }

    if (inventory <= 0) {
      errors.push("Inventory must be 1 or more");
    } else if (inventory >= 10000) {
      errors.push("Inventory may not exceed 10,000 units");
    }

    if (description.length === 0) {
      errors.push("Please provide a description");
    } else if (description.length > 2000) {
      errors.push("Description length must not exceed 2000 characters");
    }

    if (image_url_1.length === 0) {
      errors.push("Please provide a .JPG/.JPEG or .PNG Image URL in the 'Image URL 1' field");
    }

    if (!image_url_1.match(imgUrlValidator)) {
      errors.push("Images must be in JPG/JPEG or PNG format")
    }

    setErrors(errors);
  }, [product_name, price, inventory, description, image_url_1]);





  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      user_id: sessionUser.id,
      inventory,
      product_name,
      price,
      description,
      category_id,
      image_url_1,
      image_url_2,
      image_url_3,
      image_url_4,
      image_url_5,
      image_url_6,
    };

    let createdProduct = await dispatch(addProduct(payload));
    console.log("CREATED PRODUCT", createdProduct);

    if (createdProduct) {
      setErrors([]);
      return history.push("/products/all");
    }
  };

  return (
    <div>
      <div id="new-product-form-body-container">
        <div id="styles-header-container">
          <div id="new-arrivals-text-all-products" className="text">
            Share the power
          </div>
          <h2 id="all-products-title" className="text">
            Create a New Product Listing
          </h2>
        </div>

        <UploadPicture />

        <form id="new-product-form" onSubmit={handleSubmit}>
          <label className="create-product-labels">Product Name* (Required)</label>
          <input
            name="product_name"
            className="create-product-input"
            type="text"
            value={product_name}
            onChange={(e) => setProductName(e.target.value)}
            placeholder={"Insert product name here..."}
            required
          />
          <div id="price-and-inv-ctnr">
            <div className="price-and-inv">
              <label className="create-product-labels">Price* (Required)</label>
              <input
                name="price"
                className="create-product-input price-and-inv-input"
                id="price-input"
                type="number"
                min="0.01"
                max="999999.99"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder={"Insert price here..."}
                required
              />
            </div>
            <div className="price-and-inv inv-input">
              <label className="create-product-labels ">Inventory* (Required)</label>
              <input
                name="inventory"
                className="create-product-input price-and-inv-input"
                type="integer"
                value={inventory}
                onChange={(e) => setInventory(e.target.value)}
                placeholder={"Insert inventory here..."}
                required
              />
            </div>
          </div>
          <label className="create-product-labels category-label">
            Category* (Required)
          </label>
          <select
            name="category_id"
            className="create-product-input"
            type="integer"
            value={category_id}
            onChange={(e) => setCategoryId(e.target.value)}
            required
          >
            <option value={1}>Womens</option>
            <option value={2}>Mens</option>
            <option value={3}>Accessories</option>
            <option value={4}>Supplements</option>
            <option value={5}>Equipment</option>
          </select>
          <label className="create-product-labels desc-label">
            Description* (Required)
          </label>
          <textarea
            name="description"
            className="create-product-input text"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={"Insert description here..."}
            required
          />
          <label className="create-product-labels">Image URL 1* (Required)</label>
          <input
            name="image_url_1"
            className="create-product-input"
            type="text"
            value={image_url_1}
            onChange={(e) => setImageUrl1(e.target.value)}
            placeholder={"Insert image URL here..."}
            required
          />
          <label className="create-product-labels">Image URL 2 (Optional)</label>
          <input
            name="image_url_2"
            className="create-product-input"
            type="text"
            value={image_url_2}
            onChange={(e) => setImageUrl2(e.target.value)}
            placeholder={"Insert image URL here..."}
          />
          <label className="create-product-labels">Image URL 3 (Optional)</label>
          <input
            name="image_url_3"
            className="create-product-input"
            type="text"
            value={image_url_3}
            onChange={(e) => setImageUrl3(e.target.value)}
            placeholder={"Insert image URL here..."}
          />
          <label className="create-product-labels">Image URL 4 (Optional)</label>
          <input
            name="image_url_4"
            className="create-product-input"
            type="text"
            value={image_url_4}
            onChange={(e) => setImageUrl4(e.target.value)}
            placeholder={"Insert image URL here..."}
          />
          <label className="create-product-labels">Image URL 5 (Optional)</label>
          <input
            name="image_url_5"
            className="create-product-input"
            type="text"
            value={image_url_5}
            onChange={(e) => setImageUrl5(e.target.value)}
            placeholder={"Insert image URL here..."}
          />
          <label className="create-product-labels">Image URL 6 (Optional)</label>
          <input
            name="image_url_6"
            className="create-product-input"
            type="text"
            value={image_url_6}
            onChange={(e) => setImageUrl6(e.target.value)}
            placeholder={"Insert image URL here..."}
          />
          <button disabled={errors.length > 0} className="submit-btn">
            Submit
          </button>
        </form>
      {errors.length > 0 ? (
          <div id="create-product-errors-container">
            <div className="create-product-errors-div">
              <ul className="create-product-errors-ul">
                {errors.map((error, idx) => (
                  <li className="create-product-errors-li" key={idx}>
                    {error}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default NewProductForm;
