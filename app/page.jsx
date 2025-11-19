"use client";

import { useState } from "react";

export default function Home() {
  const [data, setData] = useState(null);
  async function generate() {
    const res = await fetch("/api/gemini", {
      method: "POST",
      body: JSON.stringify({ ingredients: ["pisang"] }),
    });

    const data = await res.json();
    setData(data);
    console.log(data);
  }
  return (
    <div>
      <header className="w-full py-5 mb-10 border-b border-b-gray-300 flex justify-center">
        <h1>Ai Dessert Recipe Generator </h1>
      </header>
      <div>
        <button onClick={generate} className="">
          Click
        </button>
      </div>
      <div className="container flex justify-center mx-auto my-10">
        <div className="max-w-2xl  rounded-lg">
          {data ? (
            <div>
              <h1>{data.name}</h1>
              <p>{data.description}</p>
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
