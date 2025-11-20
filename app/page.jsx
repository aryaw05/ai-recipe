"use client";

import { DropdownComponent } from "../components/fragments/dropdown/index.jsx";
import { useState } from "react";
export default function Home() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const [loading, setLoading] = useState(false);

  const [selectedIngredients, setSelectedIngredients] = useState([]);

  async function generate() {
    setLoading(true);
    const res = await fetch("/api/gemini", {
      method: "POST",
      body: JSON.stringify({ ingredients: selectedIngredients }),
    });
    const data = await res.json();

    if (data.error) {
      setError(data.error.message);
      return;
    }
    console.log(data);
    setData(data);
    setLoading(false);
  }
  return (
    <div>
      <header className="w-full py-5 mb-10 border-b border-b-gray-300 flex justify-center">
        <h1>Ai Dessert Recipe Generator </h1>
      </header>
      <div className="space-y-10 mx-auto flex flex-col items-center">
        <DropdownComponent
          selectedIngredients={selectedIngredients}
          onIngredientsChange={setSelectedIngredients}
        />
        <button
          disabled={loading || selectedIngredients.length === 0}
          onClick={generate}
          className="bg-green-400 py-2 px-5 rounded-lg w-1/2"
        >
          Generate Resep
        </button>
      </div>
      <div className="container flex justify-center mx-auto my-10 h-fit">
        <div className="max-w-2xl  rounded-lg">
          {error && <div>{error}</div>}
          {data ? (
            <div>
              <h1 className="font-bold  text-xl">{data.result.name}</h1>
              <p>Durasi memasak : {data.result.cookingTime}</p>
              <p>{data.result.description}</p>
              <h2>Ingredients:</h2>
              <ul>
                {data.result.ingredients.map((ing, idx) => (
                  <div key={idx}>
                    <li>{ing.item}</li>
                    <li>{ing.quantity}</li>
                    <li>{ing.unit}</li>
                  </div>
                ))}
              </ul>
              <h2>Steps:</h2>
              <ol className="list-decimal">
                {data.result.steps.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ol>
            </div>
          ) : (
            "no data"
          )}
        </div>
      </div>
    </div>
  );
}
