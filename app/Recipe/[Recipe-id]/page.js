'use client'
import { useEffect, useState, } from "react";

import { usePathname } from "next/navigation";

export default function RecipeView() {
    const [recipe, setRecipe] = useState();
    let pathname = usePathname();
    let recipeID = (pathname.split('/'))[2];
    console.log(recipeID)
    const link = `https://dummyjson.com/recipes/${recipeID}`;
    useEffect(() => {


        const fetchRecipe = async () => {
            let response = await fetch(link);
            let recipeReceived = await response.json();
            console.log('received json', recipeReceived);
            setRecipe(recipeReceived);
            console.log(recipe);
        }
        fetchRecipe();

    }, []);

    return <>
        {recipe ? (<div className="grid grid-cols-2 p-5 m-10 ">
            <div className="col-span-2 lg:col-span-1 md:row-span-10 ">
                <h3 className="backdrop-blur-md  text-xl text-center font-extrabold">
                    {recipe.name}
                </h3>
                <div className="flex flex-wrap">
                    <div className=" flex-auto border-2  text-center m-5 p-4 ">Calories/Servings : <span className="font-extrabold text-lg">{recipe.caloriesPerServing}Cal</span></div>
                    <div className="  flex-auto border-2 text-center m-5 p-4">Cook Time : <span className="font-extrabold text-lg">{recipe.cookTimeMinutes} min </span></div>
                </div>
                <div className=" m-5 p-4 col ">
                    <h5 className="text-md text-center font-bold">Ingredients</h5>
                    <ul className="p-5 ">
                        {recipe.ingredients.map((ingredient, key) => (<li key={key} className="border-2 m-3  p-2">{ingredient}</li>))}
                    </ul>

                </div>
                <div className=" m-5 p-4 ">
                    <h5 className="text-md text-center font-bold" >Instructions</h5>
                    <ol >
                        {recipe.instructions.map((step, key) => (<li className="m-3 border-2 p-2" key={key}>{step}</li>))}
                    </ol>
                </div>
            </div>

            <div className="col-span-2 lg:col-span-1  "> <div className=" relative"><img src={recipe.image} className="w-full"></img></div></div>
        </div>
        ) : (<div>Loading...</div>)}
    </>
}

/**
 * caloriesPerServing
: 
300
cookTimeMinutes
: 
15
cuisine
: 
"Italian"
difficulty
: 
"Easy"
id
: 
1
image
: 
"https://cdn.dummyjson.com/recipe-images/1.webp"
ingredients
: 
(6) ['Pizza dough', 'Tomato sauce', 'Fresh mozzarella cheese', 'Fresh basil leaves', 'Olive oil', 'Salt and pepper to taste']
instructions
: 
(6) ['Preheat the oven to 475°F (245°C).', 'Roll out the pizza dough and spread tomato sauce evenly.', 'Top with slices of fresh mozzarella and fresh basil leaves.', 'Drizzle with olive oil and season with salt and pepper.', 'Bake in the preheated oven for 12-15 minutes or until the crust is golden brown.', 'Slice and serve hot.']
mealType
: 
['Dinner']
name
: 
"Classic Margherita Pizza"
prepTimeMinutes
: 
20
rating
: 
4.6
reviewCount
: 
3
servings
: 
4
tags
: 
(2) ['Pizza', 'Italian']
 */