"use client";

import { createCheckoutSession } from "@/actions/actions";
import { TCartItems } from "@/lib/types";
import { CartItems, cartItemsSchema, Product } from "@/lib/validations";
import { createContext, useEffect, useState } from "react";

type CartContext = {
  cartItems: TCartItems[] | null;
  clearCart: () => void;
  addQuantity: (productId: string) => void;
  addItemToCart: (product: Product) => void;
  checkout: () => void;
  changeQuantityOnInput: (productId: string, quantity: number) => void;
  removeItemFromCart: (productId: string) => void;
  subtractQuantity: (productId: string) => void;
  isGettingCartItems: boolean;
  numberOfCartItems: number;
  subtotal: number;
};

type CartContextProviderProps = {
  children: React.ReactNode;
  products: Product[];
};

export const CartContext = createContext<CartContext | null>(null);

export default function CartContextProvider({
  children,
  products,
}: CartContextProviderProps) {
  const [cartItems, setCartItems] = useState<TCartItems[] | null>(null);
  const [isGettingCartItems, setIsGettingCartItems] = useState(true);

  const subtotal = cartItems
    ? cartItems.reduce((currentTotal, cartItem) => {
        return (
          currentTotal +
          (cartItem.default_price.unit_amount * cartItem.quantity || 0)
        );
      }, 0) / 100
    : 0;

  const numberOfCartItems = cartItems ? cartItems.length : 0;

  const clearCart = () => {
    setCartItems(null);

    window.localStorage.setItem("gaming-ocean-cart", JSON.stringify([]));
  };

  const addQuantity = (productId: string) => {
    console.log(`Adding quantity for product with id of ${productId}`);

    // refined validation
    if (!cartItems) {
      return;
    }

    const updatedCart = cartItems.map((cartItem) => {
      if (cartItem.id === productId) {
        cartItem.quantity++;

        return cartItem;
      }

      return cartItem;
    });

    setCartItems(updatedCart);
  };

  const changeQuantityOnInput = (productId: string, quantity: number) => {
    // refined validation
    if (!cartItems) {
      return;
    }

    const updatedCart = cartItems.map((cartItem) => {
      if (cartItem.id === productId) {
        cartItem.quantity = quantity;

        return cartItem;
      }

      return cartItem;
    });

    setCartItems(updatedCart);
  };

  const addItemToCart = (product: Product) => {
    if (!cartItems) {
      return;
    }
    // check if the product exists in your cart <boolean>
    const findProductInCart = cartItems.some(
      (cartItem) => cartItem.id === product.id,
    );
    // if product does not exist in cart then will add product to cart
    if (!findProductInCart) {
      const updatedCart = [...cartItems, { ...product, quantity: 1 }];

      setCartItems(updatedCart);
    } else {
      // if product exists in cart then will update the quantity by 1
      const updatedCart = cartItems.map((cartItem) => {
        if (cartItem.id === product.id) {
          cartItem.quantity++;

          return cartItem;
        }

        return cartItem;
      });

      setCartItems(updatedCart);
    }
  };

  const checkout = async () => {
    if (!cartItems) {
      return;
    }

    const checkoutItems = cartItems.map((cartItem) => {
      return {
        price: cartItem.default_price.id,
        quantity: cartItem.quantity,
      };
    });
    console.log("🚀 ~ checkoutItems ~ checkoutItems:", checkoutItems);

    await createCheckoutSession(checkoutItems);
  };

  const removeItemFromCart = (productId: string) => {
    if (!cartItems) {
      return;
    }

    const updatedCart = cartItems.filter(
      (cartItem) => cartItem.id !== productId,
    );

    setCartItems(updatedCart);
  };

  const subtractQuantity = (productId: string) => {
    console.log(`Adding quantity for product with id of ${productId}`);

    if (!cartItems) {
      return;
    }

    const updatedCart = cartItems.map((cartItem) => {
      if (cartItem.id === productId) {
        if (cartItem.quantity <= 1) {
          return cartItem;
        } else {
          cartItem.quantity--;

          return cartItem;
        }
      }

      return cartItem;
    });

    console.log("🚀 ~ updatedCart ~ updatedCart:", updatedCart);

    setCartItems(updatedCart);
  };

  const verifyItemsExist = (productsFromLocalStorage: CartItems) => {
    // return a list of products that exist
    const validatedProducts = productsFromLocalStorage.filter((product) => {
      const doesProductExist = products.some((p) => p.id === product.id);

      if (doesProductExist) {
        return product;
      }
    });

    return validatedProducts;
  };

  // on mount we are getting the cart from the local storage
  useEffect(() => {
    if (!cartItems) {
      // get local storage cart
      const cartItemsFromLocalStorage =
        window.localStorage.getItem("gaming-ocean-cart");

      if (!cartItemsFromLocalStorage) {
        window.localStorage.setItem("gaming-ocean-cart", JSON.stringify([]));
      } else {
        const validatedCartItems = cartItemsSchema.safeParse(
          JSON.parse(cartItemsFromLocalStorage),
        );

        if (!validatedCartItems.success) {
          throw new Error("Something went wrong.");
        }

        // validate that each item is in the list of current products
        const verifiedProducts = verifyItemsExist(validatedCartItems.data);

        setCartItems(verifiedProducts);
        setIsGettingCartItems(false);
      }
    } else {
      const validatedVartItems = verifyItemsExist(cartItems);
      window.localStorage.setItem(
        "gaming-ocean-cart",
        JSON.stringify(validatedVartItems),
      );
    }
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        clearCart,
        addQuantity,
        addItemToCart,
        checkout,
        changeQuantityOnInput,
        removeItemFromCart,
        subtractQuantity,
        numberOfCartItems,
        subtotal,
        isGettingCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
