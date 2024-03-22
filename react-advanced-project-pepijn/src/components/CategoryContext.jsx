import { createContext, useState, useEffect } from "react";

export const CategoryContext = createContext({});
CategoryContext.displayName = "CategoryContext";

export const CategoryContextProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch("http://localhost:3000/categories");
      const categoriesData = await response.json();
      const parsedCategories = categoriesData.map((category) => ({
        ...category,
        id: parseInt(category.id),
      }));

      setCategories(parsedCategories);
    };
    fetchCategories();
  }, []);

  return (
    <CategoryContext.Provider value={{ categories }}>
      {children}
    </CategoryContext.Provider>
  );
};
