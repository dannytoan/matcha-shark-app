const VIEW_PRODUCTS = "products/VIEW_PRODUCTS";
const ADD_PRODUCTS = "products/ADD_PRODUCTS";
const DEL_PRODUCTS = "products/DEL_PRODUCTS";

const view = (products) => ({
  type: VIEW_PRODUCTS,
  products,
});

const add = (newProduct) => ({
  type: ADD_PRODUCTS,
  newProduct,
});

const remove = (product) => ({
  type: DEL_PRODUCTS,
  product,
});

export const viewProducts = () => async (dispatch) => {
  const response = await fetch("/api/products");
//   console.log("INSIDE VIEW PRODUCTS THUNK", response);

  if (response.ok) {
    const products = await response.json();

    dispatch(view(products.products));
    return products.products;
  } else {
    const errors = await response.json();
    return errors;
  }
};

export const addProduct = (payload) => async (dispatch) => {
  const response = await fetch("/api/products/new", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const newProduct = await response.json();
  // console.log("RESPONSE", response);
  // console.log("NEW PRODUCT", newProduct);

  if (newProduct) {
    dispatch(add(newProduct));
    return newProduct;
  }
};

export const removeProduct = (id) => async (dispatch) => {
  const response = await fetch(`/api/products/${id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(remove(id));
  }

  return response;
};

export const updateProduct = (payload, id) => async (dispatch) => {
    const response = await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })


    if (response.ok) {
      const editedProduct = await response.json();
      dispatch(add(editedProduct));
      return editedProduct;
    }
  }

const productsReducer = (state = {}, action) => {
  switch (action.type) {
    case VIEW_PRODUCTS:
      const normalizedProducts = {};
      action.products.forEach((product) => {
        normalizedProducts[product.id] = product;
      });
      // console.log("NORMALIZED PRODUCTS in Reducer", {...normalizedProducts})
      return { ...normalizedProducts };
    case ADD_PRODUCTS:
      const addState = { ...state, [action.newProduct.id]: action.newProduct };
      return addState;
    case DEL_PRODUCTS:
      const deleteState = { ...state };
      return deleteState;
    default:
      return state;
  }
};

export default productsReducer;
