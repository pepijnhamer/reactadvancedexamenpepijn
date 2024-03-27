import { useState, useContext } from "react";
import { Box, FormControl, Checkbox, Flex } from "@chakra-ui/react";
import { CategoryContext } from "./Category";
import { UserContext } from "./User";

export const EventForm = ({
  initialValues,
  onSubmit,
  isLoading,
  onClose,
  updateCheckedItems,
}) => {
  const { categories } = useContext(CategoryContext);
  const { users } = useContext(UserContext);
  const [formData, setFormData] = useState(initialValues);
  const [user, setUser] = useState(initialValues.createdBy);
  const [checkedItems, setCheckedItems] = useState(
    initialValues.categoryIds || []
  );
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const handleUserChange = (e) => {
    setUser(e.target.value);
    console.log(user);
  };

  const handleCategoryCheck = (categoryId, isChecked) => {
    setCheckedItems((prevCheckedItems) => {
      const updatedCheckedItems = isChecked
        ? [...prevCheckedItems, categoryId]
        : prevCheckedItems.filter((id) => id !== categoryId);
      updateCheckedItems(updatedCheckedItems);
      return updatedCheckedItems;
    });
  };

  const isCategoryChecked = (categoryId) => checkedItems.includes(categoryId);

  const handleSubmit = (e) => {
    e.preventDefault();
    setCheckedItems(checkedItems);
    onSubmit({
      ...formData,
      createdBy: parseInt(user),
      categoryIds: checkedItems,
    });
  };

  return (
    <Box as="form" onSubmit={handleSubmit}>
      {isLoading ? (
        <Flex>
          <p>Loading..</p>
        </Flex>
      ) : (
        <>
          <FormControl id="title" isRequired>
            <label>Name</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Type the name of the event here"
            />
          </FormControl>

          <FormControl id="image" isRequired>
            <label>Image URL</label>
            <input
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="Put the image URL here"
            />
          </FormControl>

          <FormControl id="description" isRequired>
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Type the event description here"
            />
          </FormControl>

          <FormControl id="location" isRequired>
            <label>Location</label>
            <input
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Type the event location here"
            />
          </FormControl>

          <FormControl id="startTime" isRequired>
            <label>Start Time</label>
            <input
              type="datetime-local"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl id="endTime" isRequired>
            <label>End Time</label>
            <input
              type="datetime-local"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl id="createdBy" isRequired>
            <label>Creator</label>
            <select value={user} onChange={handleUserChange}>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </FormControl>

          <FormControl id="categoryIds" isRequired={checkedItems.length === 0}>
            <label>Categories</label>
            <Flex flexdir={["column", "row"]} gap={2}>
              {categories.map((category) => (
                <Checkbox
                  key={category.id}
                  value={category.id}
                  isChecked={isCategoryChecked(category.id)}
                  onChange={(e) =>
                    handleCategoryCheck(category.id, e.target.checked)
                  }
                >
                  {category.name}
                </Checkbox>
              ))}
            </Flex>
          </FormControl>
          <Flex flexdir={["column", "row"]} gap={4} mt={2}>
            <button type="submit">Submit</button>
            <button onClick={onClose}>Cancel</button>
          </Flex>
        </>
      )}
    </Box>
  );
};
