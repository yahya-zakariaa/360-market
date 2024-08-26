import React, { useContext, useEffect } from 'react'
import CategoriesPageSections from '../../components/categories/CategoriesPageSections'
import { CategoriesContext } from '../../Context/CategoriesContext';

export default function Categories() {

    const { getCategories, categories } = useContext(CategoriesContext);
    // handel get all Categories
    async function handelGetCategories() {

        try {
            await getCategories();
            console.log(categories);
        } catch (err) {}
        
    }
    useEffect(() => {
      handelGetCategories();
    }, []);
  return (
  <section className='lg:pt-36 min-h-screen pt-[80px] '>
    <header className='bg-black w-[60%] min-w-fit px-3 mx-auto py-3 rounded-lg'>
    <h1 className='text-center text-xl sm:text-2xl lg:text-3xl font-bold text-white'>Discover All You Need</h1>
    </header>
    <div className="container w-[90%] mx-auto py-16">

        {
          categories?.map((category) => (
            <CategoriesPageSections id={category._id} name={category.name} key={category._id}/>
          ))
        }

    </div>
  </section>
  )
}
