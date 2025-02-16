"use client";

import { ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "./ui/badge";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { useState } from "react";
import { CartOverlay } from "./cart-overlay";

export default function CartClient() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <>
      <Button
        variant="outline"
        className="relative"
        onClick={() => setIsCartOpen(true)}
      >
        <ShoppingCart className="h-5 w-5" />
        <span className="sr-only">Shopping cart</span>
        <AnimatePresence>
          {cartItemCount > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              <Badge
                variant="destructive"
                className="absolute -top-2 -right-2 px-2 py-1 text-xs"
              >
                {cartItemCount}
              </Badge>
            </motion.div>
          )}
        </AnimatePresence>
      </Button>
      <CartOverlay isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
