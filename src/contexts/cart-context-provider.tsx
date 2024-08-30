"use client";

import { createCheckoutSession } from "@/actions/actions";
import { CartItem } from "@/lib/types";
import { Cart, cartEssentialsSchema, Product } from "@/lib/validations";
import { createContext, useEffect, useState } from "react";

type CartContext = {
  clearCart: () => void;
  addQuantity: (productId: string) => void;
  addItemToCart: (productId: Product["id"]) => void;
  checkout: () => void;
  changeQuantityOnInput: (productId: string, quantity: number) => void;
  isCartLoading: boolean;
  numberOfItemsInCart: number;
  productsInCart: CartItem[] | null;
  removeItemFromCart: (productId: string) => void;
  subtotal: number;
  subtractQuantity: (productId: string) => void;
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
  const [cart, setCart] = useState<Cart[] | null>(null);
  const isCartLoading = !cart ? true : false;

  const productsInCart = cart
    ? products
        .map((p) => {
          const findProduct = cart.find((c) => c.productId === p.id);

          if (findProduct !== undefined) {
            return {
              ...p,
              quantity: findProduct.quantity,
            };
          }

          return null;
        })
        .filter((product) => product !== null)
    : null;

  const subtotal = productsInCart
    ? productsInCart.reduce((currentTotal, p) => {
        return currentTotal + (p.default_price.unit_amount * p.quantity || 0);
      }, 0) / 100
    : 0;

  const numberOfItemsInCart = productsInCart ? productsInCart.length : 0;

  const clearCart = () => {
    setCart(null);

    window.localStorage.setItem("gaming-ocean-cart", JSON.stringify([]));
  };

  const addQuantity = (productId: string) => {
    if (!cart) {
      return;
    }

    const updatedCart = cart.map((c) => {
      if (c.productId === productId) {
        c.quantity++;

        return c;
      }

      return c;
    });

    setCart(updatedCart);
  };

  const changeQuantityOnInput = (productId: string, quantity: number) => {
    // refined validation
    if (!cart) {
      return;
    }

    const updatedCart = cart.map((c) => {
      if (c.productId === productId) {
        c.quantity = quantity;

        return c;
      }

      return c;
    });

    setCart(updatedCart);
  };

  const addItemToCart = (productId: Product["id"]) => {
    if (!cart || !productsInCart) {
      return;
    }
    // check if the product exists in your cart <boolean>
    const findProductInCart = productsInCart.some(
      (cartItem) => cartItem.id === productId,
    );
    // if product does not exist in cart then will add product to cart
    if (!findProductInCart) {
      const updatedCart = [...cart, { productId, quantity: 1 }];

      setCart(updatedCart);
    } else {
      // if product exists in cart then will update the quantity by 1
      const updatedCart = cart.map((c) => {
        if (c.productId === productId) {
          c.quantity++;

          return c;
        }

        return c;
      });

      setCart(updatedCart);
    }
  };

  const checkout = async () => {
    if (!productsInCart) {
      return;
    }

    const checkoutItems = productsInCart.map((p) => {
      return {
        price: p.default_price.id,
        quantity: p.quantity,
      };
    });

    await createCheckoutSession(checkoutItems);
  };

  const removeItemFromCart = (productId: string) => {
    if (!cart) {
      return;
    }

    const updatedCart = cart.filter(
      (cartItem) => cartItem.productId !== productId,
    );

    setCart(updatedCart);
  };

  const subtractQuantity = (productId: string) => {
    if (!cart) {
      return;
    }

    const updatedCart = cart.map((c) => {
      if (c.productId === productId) {
        if (c.quantity <= 1) {
          return c;
        } else {
          c.quantity--;

          return c;
        }
      }

      return c;
    });

    setCart(updatedCart);
  };

  const verifyItemsExist = (cartFromLocalStorage: Cart[]) => {
    // return a list of products that exist
    const validatedProducts = cartFromLocalStorage.filter((item) => {
      const doesProductExist = products.some((p) => p.id === item.productId);

      if (doesProductExist) {
        return item;
      }
    });

    return validatedProducts;
  };

  // on mount we are getting the cart from the local storage
  useEffect(() => {
    if (!cart) {
      // get local storage cart
      const cartItemsFromLocalStorage =
        window.localStorage.getItem("gaming-ocean-cart");

      if (!cartItemsFromLocalStorage) {
        window.localStorage.setItem("gaming-ocean-cart", JSON.stringify([]));
      } else {
        const validatedCartItems = cartEssentialsSchema.safeParse(
          JSON.parse(cartItemsFromLocalStorage),
        );

        if (!validatedCartItems.success) {
          throw new Error("Something went wrong.");
        }

        // validate that each item is in the list of current products
        const verifiedCart = verifyItemsExist(validatedCartItems.data);

        setCart(verifiedCart);
      }
    } else {
      const validatedVartItems = verifyItemsExist(cart);
      window.localStorage.setItem(
        "gaming-ocean-cart",
        JSON.stringify(validatedVartItems),
      );
    }
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        productsInCart,
        clearCart,
        addQuantity,
        addItemToCart,
        checkout,
        changeQuantityOnInput,
        removeItemFromCart,
        subtractQuantity,
        numberOfItemsInCart,
        subtotal,
        isCartLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
