export const CategorySelection = ({
  categories,
  checkedItems,
  onCategoryChange,
}) => {
  const handleCheckboxChange = (categoryId, isChecked) => {
    onCategoryChange(parseInt(categoryId), isChecked);
  };

  return (
    <div>
      {categories.map((category) => (
        <label key={category.id}>
          <input
            type="checkbox"
            value={category.id}
            checked={checkedItems.includes(category.id)}
            onChange={(e) =>
              handleCheckboxChange(category.id, e.target.checked)
            }
          />
          {category.name}
        </label>
      ))}
    </div>
  );
};
