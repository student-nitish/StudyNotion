import React, { useEffect, useState } from 'react'
import Footer from '../components/common/Footer'
import { useParams } from 'react-router-dom'
import { apiConnector } from '../services/apiconnector';
import { categories } from '../services/apis';
import { getCatalogaPageData } from '../services/operations/pageAndComponentData';
import Course_Card from '../components/core/Catalog/Course_Card';
import CourseSlider from '../components/core/Catalog/CourseSlider';

const Catalog = () => {

    const {catalogName} = useParams();
    const [catalogPageData, setCatalogPageData] = useState(null);
    const [categoryId, setCategoryId] = useState("");

    //Fetch all categories
    useEffect(()=> {
        const getCategories = async() => {
            const res = await apiConnector("GET", categories.CATEGORIES_API);
            const category_id = 
            res?.data?.data?.filter((ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName)[0]._id;
            setCategoryId(category_id);
        }
        getCategories();
    },[catalogName]);

    useEffect(() => {
        const getCategoryDetails = async() => {
            try{
                const res = await getCatalogaPageData(categoryId);
                console.log("PRinting res: ", res);
                setCatalogPageData(res);
            }
            catch(error) {
                console.log(error)
            }
        }
        if(categoryId) {
            getCategoryDetails();
        }
        
    },[categoryId]);


  return (
  <div className="bg-gray-900 text-white min-h-screen flex flex-col">
    
    <div className="max-w-6xl mx-auto w-full px-4 py-8 space-y-3">
      <p className="text-sm text-gray-400">
        Home / Catalog /
        <span className="text-yellow-400 font-medium">
          {" "}
          {catalogPageData?.data?.selectedCategory?.name}
        </span>
      </p>

      <h1 className="text-3xl md:text-4xl font-bold text-blue-400">
        {catalogPageData?.data?.selectedCategory?.name}
      </h1>

      <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-3xl">
        {catalogPageData?.data?.selectedCategory?.description}
      </p>
    </div>

    
    <div className="max-w-6xl mx-auto w-full px-4 py-10 border-t border-gray-800">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-5">
        <h2 className="text-2xl font-semibold text-yellow-400">
          Courses to Get You Started
        </h2>

        <div className="flex gap-3 mt-3 md:mt-0">
          <button className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-sm font-semibold transition duration-200">
            Most Popular
          </button>
          <button className="px-4 py-2 rounded-md bg-gray-800 hover:bg-gray-700 text-sm font-semibold transition duration-200">
            New
          </button>
        </div>
      </div>

      <div>
        <CourseSlider
          Courses={catalogPageData?.data?.selectedCategory?.courses}
        />
      </div>
    </div>

    {/* ====== Courses Section 2 ====== */}
    <div className="max-w-6xl mx-auto w-full px-4 py-10 border-t border-gray-800">
      <h2 className="text-2xl font-semibold text-yellow-400 mb-5">
        Top Courses in{" "}
        <span className="text-blue-400">
          {catalogPageData?.data?.selectedCategory?.name}
        </span>
      </h2>
      <CourseSlider
        Courses={catalogPageData?.data?.differentCategory?.courses}
      />
    </div>

    {/* ====== Courses Section 3 ====== */}
    <div className="max-w-6xl mx-auto w-full px-4 py-10 border-t border-gray-800">
      <h2 className="text-2xl font-semibold text-yellow-400 mb-6">
        Frequently Bought
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {catalogPageData?.data?.mostSellingCourses
          ?.slice(0, 4)
          .map((course, index) => (
            <Course_Card
              course={course}
              key={index}
              Height="h-[380px]"
            />
          ))}
      </div>
    </div>

    {/* ====== Footer ====== */}
    <Footer />
  </div>
);

}

export default Catalog
