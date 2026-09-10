"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Minus,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Stock } from "../types";

interface Props {
  searchQuery: string;
  setSearchQuery: (v: string) => void;
  selectedStock: Stock | null;
  setSelectedStock: (s: Stock) => void;
}

const WATCHLIST: Stock[] = [
  {
    symbol: "RELIANCE",
    name: "Reliance Industries Ltd",
    price: 2450.75,
    change: 45.3,
    changePercent: 1.88,
    volume: "12.5M",
  },
  {
    symbol: "TCS",
    name: "Tata Consultancy Services",
    price: 3520.4,
    change: -28.6,
    changePercent: -0.81,
    volume: "5.2M",
  },
  {
    symbol: "INFY",
    name: "Infosys Limited",
    price: 1480.25,
    change: 12.15,
    changePercent: 0.83,
    volume: "8.7M",
  },
  {
    symbol: "HDFC",
    name: "HDFC Bank Ltd",
    price: 1650.8,
    change: 22.45,
    changePercent: 1.38,
    volume: "15.3M",
  },
];

const HOLDINGS = [
  {
    symbol: "RELIANCE",
    shares: 10,
    avgPrice: 2380,
    currentPrice: 2450.75,
  },
  {
    symbol: "TCS",
    shares: 5,
    avgPrice: 3480,
    currentPrice: 3520.4,
  },
  {
    symbol: "INFY",
    shares: 15,
    avgPrice: 1420,
    currentPrice: 1480.25,
  },
];

const HISTORY = [
  {
    id: 1,
    type: "buy",
    symbol: "RELIANCE",
    shares: 10,
    price: 2380,
    date: "Dec 20, 2024",
  },
  {
    id: 2,
    type: "buy",
    symbol: "TCS",
    shares: 5,
    price: 3480,
    date: "Dec 19, 2024",
  },
  {
    id: 3,
    type: "sell",
    symbol: "HDFC",
    shares: 8,
    price: 1620,
    date: "Dec 18, 2024",
  },
];

export default function StockTabs({
  searchQuery,
  setSearchQuery,
  selectedStock,
  setSelectedStock,
}: Props) {
  const filteredStocks = WATCHLIST.filter(
    (s) =>
      s.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="lg:col-span-2">
      <Tabs defaultValue="watchlist">
        <TabsList className="w-full mb-4 bg-secondary/50">
          <TabsTrigger value="watchlist" className="flex-1">
            Watchlist
          </TabsTrigger>
          <TabsTrigger value="holdings" className="flex-1">
            Holdings
          </TabsTrigger>
          <TabsTrigger value="history" className="flex-1">
            History
          </TabsTrigger>
        </TabsList>

        {/* WATCHLIST */}
        <TabsContent value="watchlist">
          <div className="glass-card p-4 sm:p-6 space-y-4">
            <Input
              placeholder="Search stocks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-secondary/50"
            />

            <div className="space-y-2">
              {filteredStocks.map((stock) => (
                <div
                  key={stock.symbol}
                  onClick={() => setSelectedStock(stock)}
                  className={cn(
                    "flex items-center justify-between p-4 rounded-xl cursor-pointer transition-colors",
                    selectedStock?.symbol === stock.symbol
                      ? "bg-primary/10 border border-primary/30"
                      : "bg-secondary/30 hover:bg-secondary/50"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center font-bold text-primary text-sm">
                      {stock.symbol.slice(0, 3)}
                    </div>
                    <div>
                      <p className="font-semibold">{stock.symbol}</p>
                      <p className="text-sm text-muted-foreground truncate max-w-45">
                        {stock.name}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold">
                      ₹{stock.price.toLocaleString()}
                    </p>
                    <p
                      className={cn(
                        "text-sm flex items-center gap-1 justify-end",
                        stock.change >= 0
                          ? "text-success"
                          : "text-destructive"
                      )}
                    >
                      {stock.change >= 0 ? (
                        <ArrowUpRight className="w-3 h-3" />
                      ) : (
                        <ArrowDownRight className="w-3 h-3" />
                      )}
                      {stock.changePercent}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* HOLDINGS */}
        <TabsContent value="holdings">
          <div className="glass-card p-4 sm:p-6 space-y-3">
            {HOLDINGS.map((h) => {
              const pnl =
                (h.currentPrice - h.avgPrice) * h.shares;
              const pnlPercent = (
                ((h.currentPrice - h.avgPrice) / h.avgPrice) *
                100
              ).toFixed(2);

              return (
                <div
                  key={h.symbol}
                  className="flex items-center justify-between p-4 bg-secondary/30 rounded-xl"
                >
                  <div>
                    <p className="font-semibold">{h.symbol}</p>
                    <p className="text-sm text-muted-foreground">
                      {h.shares} shares @ ₹{h.avgPrice}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">
                      ₹{(h.shares * h.currentPrice).toLocaleString()}
                    </p>
                    <p
                      className={cn(
                        "text-sm",
                        pnl >= 0
                          ? "text-success"
                          : "text-destructive"
                      )}
                    >
                      {pnl >= 0 ? "+" : ""}
                      ₹{pnl.toFixed(0)} ({pnlPercent}%)
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </TabsContent>

        {/* HISTORY */}
        <TabsContent value="history">
          <div className="glass-card p-4 sm:p-6 space-y-3">
            {HISTORY.map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between p-4 bg-secondary/30 rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center",
                      tx.type === "buy"
                        ? "bg-success/10"
                        : "bg-destructive/10"
                    )}
                  >
                    {tx.type === "buy" ? (
                      <Plus className="w-5 h-5 text-success" />
                    ) : (
                      <Minus className="w-5 h-5 text-destructive" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold">{tx.symbol}</p>
                    <p className="text-sm text-muted-foreground">
                      {tx.shares} shares @ ₹{tx.price}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={cn(
                      "font-semibold",
                      tx.type === "buy"
                        ? "text-success"
                        : "text-destructive"
                    )}
                  >
                    {tx.type === "buy" ? "-" : "+"}₹
                    {(tx.shares * tx.price).toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {tx.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
