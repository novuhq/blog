"use client";

import { FC, useCallback, useState, useTransition } from "react";

export const BidInput: FC<{
  id: number;
  addBid: (id: number, num: number) => void;
}> = (props) => {
  const { id, addBid } = props;
  const [input, setInput] = useState("");
  let [isPending, startTransition] = useTransition();

  const updateBid = useCallback(() => {
    startTransition(() => addBid(id, +input));
    setInput("");
  }, [input]);

  return (
    <div className="flex pt-3">
      <input
        placeholder="Place bid"
        className="flex-1 border border-black p-3"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="button" className="bg-black text-white p-2" onClick={updateBid}>
        Add Bid
      </button>
    </div>
  );
};
