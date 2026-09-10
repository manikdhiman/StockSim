"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Stock } from "../types";

interface Props {
  selectedStock: Stock | null;
  quantity: number;
  setQuantity: (v: number) => void;
  orderType: "buy" | "sell";
  setOrderType: (v: "buy" | "sell") => void;
  onTrade: () => void;
}

export default function TradePanel({
  selectedStock,
  quantity,
  setQuantity,
  orderType,
  setOrderType,
  onTrade,
}: Props) {
  if (!selectedStock) {
    return (
      <div className="glass-card p-6 h-fit sticky top-24 text-center text-muted-foreground">
        <p className="text-sm">Select a stock from the watchlist</p>
        <p className="text-xs mt-1">to place a trade</p>
      </div>
    );
  }

  const total = selectedStock.price * quantity;

  return (
    <div className="glass-card p-6 h-fit sticky top-24 space-y-6">
      <h2 className="font-display text-lg font-semibold">
        Place Order
      </h2>

      {/* Selected Stock */}
      <div className="p-4 bg-secondary/30 rounded-xl space-y-1">
        <div className="flex items-center justify-between">
          <span className="font-semibold">
            {selectedStock.symbol}
          </span>
          <span
            className={cn(
              "text-sm",
              selectedStock.change >= 0
                ? "text-success"
                : "text-destructive"
            )}
          >
            {selectedStock.change >= 0 ? "+" : ""}
            {selectedStock.changePercent}%
          </span>
        </div>

        <p className="font-display text-2xl font-bold">
          ₹{selectedStock.price.toLocaleString()}
        </p>
        <p className="text-sm text-muted-foreground">
          {selectedStock.name}
        </p>
      </div>

      {/* Buy / Sell Toggle */}
      <div className="flex rounded-xl bg-secondary/50 p-1">
        <button
          onClick={() => setOrderType("buy")}
          className={cn(
            "flex-1 py-2 rounded-lg text-sm font-medium transition-colors",
            orderType === "buy"
              ? "bg-success text-success-foreground"
              : "text-muted-foreground"
          )}
        >
          Buy
        </button>
        <button
          onClick={() => setOrderType("sell")}
          className={cn(
            "flex-1 py-2 rounded-lg text-sm font-medium transition-colors",
            orderType === "sell"
              ? "bg-destructive text-destructive-foreground"
              : "text-muted-foreground"
          )}
        >
          Sell
        </button>
      </div>

      {/* Quantity */}
      <div className="space-y-2">
        <label className="text-sm text-muted-foreground">
          Quantity
        </label>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
          >
            <Minus className="w-4 h-4" />
          </Button>

          <Input
            type="number"
            value={quantity}
            onChange={(e) =>
              setQuantity(
                Math.max(1, Number(e.target.value) || 1)
              )
            }
            className="text-center bg-secondary/50"
          />

          <Button
            variant="outline"
            size="icon"
            onClick={() => setQuantity(quantity + 1)}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Order Summary */}
      <div className="p-4 bg-secondary/30 rounded-xl space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">
            Price per share
          </span>
          <span>
            ₹{selectedStock.price.toLocaleString()}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">
            Quantity
          </span>
          <span>{quantity}</span>
        </div>

        <div className="border-t border-border pt-2 mt-2">
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>₹{total.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <Button
        size="lg"
        className="w-full"
        variant={orderType === "buy" ? "success" : "destructive"}
        onClick={onTrade}
      >
        {orderType === "buy" ? "Buy" : "Sell"}{" "}
        {selectedStock.symbol}
      </Button>
    </div>
  );
}
