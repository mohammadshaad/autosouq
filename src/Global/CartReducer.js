import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

export const CartReducer = (state, action) => {
  const { shoppingCart, totalPrice, totalQty } = state;

  let product;
  let index;
  let updatedPrice;
  let updatedQty;

  switch (action.type) {
    case "SET_CART_FROM_LOCAL_STORAGE":
      return {
        ...state,
        shoppingCart: action.cartData,
      };

    case "ADD_TO_CART":
      const check = shoppingCart.find(
        (product) => product.ProductID === action.id
      );
      if (check) {
        toast.info("This car is already in your wishlist", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "colored",
        });
        return state;
      } else {
        product = action.product;
        // product["qty"] = 1;
        // product["TotalProductPrice"] = product.ProductPrice * product.qty;
        // updatedQty = totalQty + 1;
        updatedPrice = totalPrice + product.ProductPrice;

        const updatedCart = [product, ...shoppingCart];

        // Update localStorage with the new cart data
        localStorage.setItem("cart", JSON.stringify(updatedCart));

        return {
          shoppingCart: updatedCart,
          totalPrice: updatedPrice,
          totalQty: updatedQty,
        };
      }

    case "INC":
      product = action.cart;
      // product.qty = ++product.qty;
      // product.TotalProductPrice = product.qty * product.ProductPrice;
      // updatedQty = totalQty + 1;
      updatedPrice = totalPrice + product.ProductPrice;
      index = shoppingCart.findIndex((cart) => cart.ProductID === action.id);
      shoppingCart[index] = product;

      // Update localStorage with the modified cart data
      localStorage.setItem("cart", JSON.stringify(shoppingCart));

      return {
        shoppingCart: [...shoppingCart],
        totalPrice: updatedPrice,
        totalQty: updatedQty,
      };

    case "DEC":
      product = action.cart;
      if (product.qty > 1) {
        // product.qty = product.qty - 1;
        // product.TotalProductPrice = product.qty * product.ProductPrice;
        // updatedPrice = totalPrice - product.ProductPrice;
        updatedQty = totalQty - 1;
        index = shoppingCart.findIndex((cart) => cart.ProductID === action.id);
        shoppingCart[index] = product;

        // Update localStorage with the modified cart data
        localStorage.setItem("cart", JSON.stringify(shoppingCart));

        return {
          shoppingCart: [...shoppingCart],
          totalPrice: updatedPrice,
          totalQty: updatedQty,
        };
      } else {
        return state;
      }

    case "DELETE":
      const filtered = shoppingCart.filter(
        (product) => product.ProductID !== action.id
      );
      product = action.cart;
      // updatedQty = totalQty - product.qty;
      // updatedPrice = totalPrice - product.qty * product.ProductPrice;

      // Update localStorage with the filtered cart data
      localStorage.setItem("cart", JSON.stringify(filtered));

      return {
        shoppingCart: [...filtered],
        totalPrice: updatedPrice,
        totalQty: updatedQty,
      };

    case "EMPTY":
      // Clear localStorage when the cart is emptied
      localStorage.removeItem("cart");
      return {
        shoppingCart: [],
        totalPrice: 0,
        totalQty: 0,
      };

    default:
      return state;
  }
};
