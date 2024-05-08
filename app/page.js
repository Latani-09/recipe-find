'use client'
import Image from "next/image";
import { InView } from "react-intersection-observer";

import { useEffect, useState,useRef } from "react";
import { LazyLoadComponent } from "react-lazy-load-image-component";
import RenderOnViewportEntry from "./RenderOnViewportEntry";
export default function Home() {
const isDevelopmentRun = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
  const isMountedRef = useRef(!isDevelopmentRun);
  let ignore = false;
  const [recipes,setRecipes]=useState([]);
  const [lastId,setLastId]=useState(0);
  useEffect(() => {
    if (!isMountedRef.current) {
      isMountedRef.current = true;
      return undefined;
    }
    getRecipes(0,8,ignore);


  }, []);
  const getRecipes = async (id,limit,ignore) => {
    debugger
    const link = `https://dummyjson.com/recipes?limit=${limit}&skip=${id}`;
    
    try {
      const response = await fetch(link);
      const recipesReceived = await response.json();
      if (recipesReceived && recipesReceived.recipes) {
        console.log('received',id,limit, [...recipes,recipesReceived.recipes]);
        if (ignore) return;
        setRecipes((prevRecipes) => [...prevRecipes, ...recipesReceived.recipes]);
    
        setLastId(id+limit);
        console.log('recipe',recipes)
      }
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };
 
  const redirectToDetail = (id) => {
    console.log("id is", id);
    window.location.href = `/Recipe/${id}`; // Navigate to the RecipeDetail page with the recipe ID
  };
  
  return (
    <main className="min-h-screen px-6 py-12">
      <div className="text-3xl font-bold mb-6">Home page</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {
      recipes.length > 0 && recipes.map((recipe, key) => (
        <InView as="div" key={key} onChange={(inView, entry)=>{  if (inView && key === recipes.length - 1) {
          debugger
          getRecipes(lastId, 4,false);}}} triggerOnce={true} threshold={1}>
        <RecipeCard key={key} recipe={recipe} redirectToDetail={redirectToDetail} />
        </InView>
      ))}    
      </div>
    </main>
  );


function RecipeCard({ recipe, redirectToDetail }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 cursor-pointer" key={recipe.id} onClick={() => redirectToDetail(recipe.id)}>
      <div className="relative h-40 overflow-hidden rounded-t-lg">
      <Image src={recipe.image} width={400} height={400} key={recipe.id } alt="" unoptimized={true}>

</Image>
      </div>
      
      <div className="mt-4" >
        <div className="text-lg font-semibold">{recipe.name}</div>
        <div className="flex justify-between mt-2">
          <div>
            <div className="text-gray-500">Prep time:</div>
            <div className="text-gray-700">{recipe.prepTimeMinutes} min</div>
          </div>
          <div>
            <div className="text-gray-500">Calories/servings:</div>
            <div className="text-gray-700">{recipe.caloriesPerServing} Cal</div>
          </div>
          <div>
            <div className="text-gray-500">Servings:</div>
            <div className="text-gray-700">{recipe.servings}</div>
          </div>
        </div>
        <div className="mt-2 text-gray-700">Cuisine: {recipe.cuisine}</div>
      </div>
    </div>
  );
}
}