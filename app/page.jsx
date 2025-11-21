"use client";

import { Spinner } from "@/components/ui/spinner";
import { DropdownComponent } from "../components/fragments/dropdown/index.jsx";
import { useState } from "react";
import { toast } from "sonner";
export default function Home() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [selectedIngredients, setSelectedIngredients] = useState([]);

  async function generate() {
    if (selectedIngredients.length === 0) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/gemini", {
        method: "POST",
        body: JSON.stringify({ ingredients: selectedIngredients }),
      });

      const data = await res.json();
      console.log("Response data:", data);
      toast.success("Resep berhasil dibuat", {
        position: "top-center",
      });
      if (data.error) {
        setError(data.error.message);
        return;
      }

      setData(data);
    } catch (err) {
      setError("An unexpected error occurred.");
      toast.error("Gagal membuat resep", {
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <header className="w-full py-5 mb-10 border-b border-b-gray-300 flex justify-center">
        <h1>Dessert Recomendation Powered by AI 🤖 </h1>
      </header>
      <div className="space-y-10 container mx-auto md:max-w-4xl max-w-2xl border p-10 mb-10  rounded-lg">
        <h1 className="text-xl">Pilih Bahan Dessert 🍰</h1>
        <DropdownComponent
          selectedIngredients={selectedIngredients}
          onIngredientsChange={setSelectedIngredients}
        />
        <button
          disabled={loading || selectedIngredients.length === 0}
          onClick={generate}
          className={`${
            loading ? "pointer-events-none bg-green-300" : "bg-green-400 "
          } py-2 px-5 rounded-lg w-full`}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <Spinner />
              <span className="ml-2">Generating...</span>
            </span>
          ) : (
            "✨Buat Resep Sekarang"
          )}
        </button>
      </div>
      <div className="container mx-auto  h-fit border  max-w-4xl p-10 rounded-lg">
        {error && <div>{error}</div>}
        {data ? (
          <div>
            <div>
              <h1 className="font-bold  text-xl">{data.result.name}</h1>
              <p>Durasi memasak : {data.result.cookingTime}</p>
              <p>{data.result.description}</p>
            </div>
            <div>
              <h2 className="font-bold text-xl">Bahan Bahan :</h2>
              <ul>
                {data.result.ingredients.map((ing, idx) => (
                  <div key={idx}>
                    <li>
                      {ing.quantity} {ing.item} {ing.unit}{" "}
                      {ing.note && `, ${ing.note}`}
                    </li>
                  </div>
                ))}
              </ul>
            </div>

            <h2 className="font-bold text-xl">Steps:</h2>
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
  );
}
