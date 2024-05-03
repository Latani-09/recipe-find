'use client'
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [recipes,setRecipe]=useState([]);

  useEffect(()=>{
    const getRecipes=async()=>{
      const  response= await fetch('https://dummyjson.com/recipes');
      const recipes=await response.json();
      if (recipes){
        console.log('received',recipes.recipes)
      setRecipe(recipes.recipes)}
    
    }
    getRecipes();

    
  },[])
  return (
    <main className="  min-h-screen   justify-between ">
     <div>Home page</div>
  
     <div className=" grid  grid-cols-12 box-border ">{recipes.map((recipe,id)=>{
      return(
<RecipeCard recipe={recipe}/>)
     })}</div>
     
    </main>
  );
}
/* Recipe card */
function RecipeCard({recipe}){
  console.log(recipe);
  return(<>
    <div className=" relative col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3 max-w-80 my-10 mx-10 border-2 ">
      <div className="absolute w-full h-full  card-bg -z-10"></div>
      <div className="text-black font-extrabold text-right">{recipe.name}</div>
      <div className="grid grid-cols-12 max-sm:text-center  ">
      <div className="col-span-12 sm:col-span-7 p-3 "><img className="object-cover w-40 h-auto max-sm:m-auto " src={recipe.image}></img></div>
      <div className="col-span-12 sm:col-span-5  p-3 font-serif text-wrap ">
      <div className=" text-details  ">Prep time:</div><div className="text-value">{recipe.prepTimeMinutes}min</div>
      <div className=" text-details ">Cal/servings:</div><div className="text-value">{recipe.caloriesPerServing}Cal </div>
      <div className="text-details ">servings:</div><div className="text-value">{recipe.servings}</div>
      </div>
      </div>
      <div className="text-black ">Cuisine:{recipe.cuisine}</div>
      </div>
      </>)
}



