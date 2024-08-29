import { CartContext } from "@/contexts/cart-context-provider"
import { ProductContext } from "@/contexts/product-context-provider"
import { useContext } from "react"

export function useCartContext() {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error(
      "useCartContext must be used within a CartContextProvider component."
    )
  }

  return context
}

export function useProductContext() {
  const context = useContext(ProductContext)

  if (!context) {
    throw new Error(
      "useProductContext must be used within a ProductContextProvider component."
    )
  }

  return context
}
