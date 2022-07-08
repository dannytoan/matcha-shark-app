import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { addProduct } from "../../store/products";
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
  const [image_url_2, setImageUrl2] = useState(null);
  const [image_url_1, setImageUrl1] = useState(null);
  const [image_url_3, setImageUrl3] = useState(null);
  const [image_url_4, setImageUrl4] = useState(null);
  const [image_url_5, setImageUrl5] = useState(null);
  const [image_url_6, setImageUrl6] = useState(null);

  const [errors, setErrors] = useState([]);

  const [image, setImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);

  const updateImage1 = (e) => {
    const file = e.target.files[0];
    setImageUrl1(file);
  };

  useEffect(() => {
    const errors = [];
    if (product_name.length > 50) {
      errors.push("Label must be less than 50 characters");
    } else if (product_name.length <= 0) {
      errors.push("Please provide a Product Name");
    }

    if (price <= 0) {
      errors.push("Must enter an price greater than 0");
    }

    setErrors(errors);
  }, [product_name, price]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    const user_id = sessionUser.id;

    formData.append("user_id", user_id);
    formData.append("inventory", inventory);
    formData.append("product_name", product_name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("category_id", category_id);
    formData.append("image", image_url_1);
    formData.append("image_url_2", image_url_2);
    formData.append("image_url_3", image_url_3);
    formData.append("image_url_4", image_url_4);
    formData.append("image_url_5", image_url_5);
    formData.append("image_url_6", image_url_6);

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

    let createdProduct = await dispatch(addProduct(formData));
    // console.log("CREATED PRODUCT", createdProduct)

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
        <div className="create-product-errors-div">
          <ul className="create-product-errors-ul">
            {errors.map((error, idx) => (
              <li className="create-product-errors-li" key={idx}>
                {error}
              </li>
            ))}
          </ul>
        </div>
        <form id="new-product-form" onSubmit={handleSubmit}>
          <label className="create-product-labels">Product Name</label>
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
              <label className="create-product-labels">Price</label>
              <input
                name="price"
                className="create-product-input price-and-inv-input"
                id="price-input"
                type="float"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder={"Insert price here..."}
                required
              />
            </div>
            <div className="price-and-inv inv-input">
              <label className="create-product-labels ">Inventory</label>
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
            Category
          </label>
          <select
            name="category_id"
            className="create-product-input"
            type="integer"
            value={category_id}
            onChange={(e) => setCategoryId(e.target.value)}
            required
          >
            <option>Womens</option>
          </select>
          <label className="create-product-labels desc-label">
            Description
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
          <label className="create-product-labels">Image URL 1</label>
          <input
            name="image_url_1"
            className="create-product-input"
            type="file"
            accept="image/*"
            onChange={updateImage1}
            required
          />
          <label className="create-product-labels">Image URL 2</label>
          <input
            name="image_url_2"
            className="create-product-input"
            type="text"
            value={image_url_2}
            onChange={(e) => setImageUrl2(e.target.value)}
            placeholder={"Insert image URL here..."}
          />
          <label className="create-product-labels">Image URL 3</label>
          <input
            name="image_url_3"
            className="create-product-input"
            type="text"
            value={image_url_3}
            onChange={(e) => setImageUrl3(e.target.value)}
            placeholder={"Insert image URL here..."}
          />
          <label className="create-product-labels">Image URL 4</label>
          <input
            name="image_url_4"
            className="create-product-input"
            type="text"
            value={image_url_4}
            onChange={(e) => setImageUrl4(e.target.value)}
            placeholder={"Insert image URL here..."}
          />
          <label className="create-product-labels">Image URL 5</label>
          <input
            name="image_url_5"
            className="create-product-input"
            type="text"
            value={image_url_5}
            onChange={(e) => setImageUrl5(e.target.value)}
            placeholder={"Insert image URL here..."}
          />
          <label className="create-product-labels">Image URL 6</label>
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
      </div>
    </div>
  );
}

export default NewProductForm;
