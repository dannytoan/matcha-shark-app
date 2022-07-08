const VIEW_PRODUCTS = "products/VIEW_PRODUCTS";
const ADD_PRODUCTS = "products/ADD_PRODUCTS";

const view = (products) => ({
  type: VIEW_PRODUCTS,
  products,
});

const add = (newProduct) => ({
  type: ADD_PRODUCTS,
  newProduct,
});

export const viewProducts = () => async (dispatch) => {
  const response = await fetch("/api/products");

  if (response.ok) {
      const products = await response.json();

      dispatch(view(products.products));
      return products.products;
    } else {
        const errors = await response.json();
        return errors;
    }
};

export const addProduct = (formData) => async (dispatch) => {
    const response = await fetch("/api/products/new", {
        method: "POST",
        body: formData,
    });

    console.log("RESPONSE IN THUNK", response)

  const newProduct = await response.json();
//   console.log("NEW PRODUCT", newProduct)

  if (newProduct) {
    dispatch(add(newProduct));
    return newProduct;
  }

};

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
    default:
      return state;
  }
};

export default productsReducer;
