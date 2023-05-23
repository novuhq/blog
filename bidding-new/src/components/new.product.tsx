"use client";

import { FC, useCallback, useState } from "react";

export const NewProduct: FC<{ addProduct: (name: string) => void }> = (
  props
) => {
  const { addProduct } = props;
  const [name, setName] = useState("");
  const addProductFunc = useCallback(() => {
    setName("");
    addProduct(name);
  }, [name]);
  return (
    <div className="flex mb-5">
      <input
        value={name}
        placeholder="Product Name"
        name="name"
        className="w-[23.5%]"
        onChange={(e) => setName(e.target.value)}
      />
      <button
        type="button"
        onClick={addProductFunc}
        className="w-[9%] bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        New Product
      </button>
    </div>
  );
};
