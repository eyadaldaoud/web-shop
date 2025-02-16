"use client";

import { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { removeFromCart, updateQuantity } from "@/app/features/cartSlice";
import { RootState } from "@/app/store";

interface CartOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartOverlay({ isOpen, onClose }: CartOverlayProps) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const overlayRef = useRef<HTMLDivElement>(null);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        overlayRef.current &&
        !overlayRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
        >
          <motion.div
            ref={overlayRef}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 right-0 w-full max-w-sm bg-background shadow-lg p-6 overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Your Cart</h2>
              <Button variant="ghost" onClick={onClose}>
                <X className="h-6 w-6" />
                <span className="sr-only">Close</span>
              </Button>
            </div>
            {cartItems.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <>
                {cartItems.map((item: any) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-start justify-between border-b py-4"
                  >
                    <div className="flex items-center space-x-4">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt="3"
                        width={60}
                        height={60}
                        className="rounded-md"
                      />
                      <div>
                        <h3 className="font-semibold">{item.title}</h3>
                        <p className="text-sm text-gray-500">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          dispatch(
                            updateQuantity({
                              id: item.id,
                              quantity: Number.parseInt(e.target.value),
                            })
                          )
                        }
                        className="w-16"
                      />
                      <Button
                        variant="destructive"
                        onClick={() => dispatch(removeFromCart(item.id))}
                      >
                        Remove
                      </Button>
                    </div>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.2, delay: 0.1 }}
                  className="mt-4"
                >
                  <p className="text-xl font-bold">
                    Total: ${totalPrice.toFixed(2)}
                  </p>
                  <Button className="mt-2 w-full">Checkout</Button>
                </motion.div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
