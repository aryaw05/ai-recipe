import { dessertIngredientCategories } from "../../../lib/data.js";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, X } from "lucide-react";

export function DropdownComponent({
  selectedIngredients,
  onIngredientsChange,
}) {
  const [open, setOpen] = useState(false);
  const toggleIngredient = (ingredient) => {
    if (selectedIngredients.includes(ingredient)) {
      onIngredientsChange(selectedIngredients.filter((i) => i !== ingredient));
    } else {
      onIngredientsChange([...selectedIngredients, ingredient]);
    }
  };

  function removeIngredient(ingredient) {
    onIngredientsChange(selectedIngredients.filter((i) => i !== ingredient));
  }
  return (
    <div className="space-y-5">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button className="bg-gray-300 py-2 px-5 rounded-lg">
            Pilih Bahan Baku <ChevronDown className="inline-block ml-2" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-4">
          <Command>
            <CommandInput placeholder="Search ingredients..." />
            <CommandList>
              <CommandEmpty>
                Bahan baku yang dicari tidak ditemukan
              </CommandEmpty>
              {Object.entries(dessertIngredientCategories).map(
                ([category, items]) => (
                  <CommandGroup key={category} heading={category}>
                    {items.map((item) => (
                      <CommandItem
                        key={item}
                        onSelect={() => toggleIngredient(item)}
                        className="cursor-pointer"
                      >
                        {item}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {selectedIngredients.length > 0 && (
        <div>
          <div className="flex gap-5">
            {selectedIngredients.map((ingredient) => (
              <Badge
                variant="secondary"
                key={ingredient}
                className="gap-2"
                onClick={() => removeIngredient(ingredient)}
              >
                {ingredient}
                <X />
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
