import { Tag } from "@chakra-ui/react";
import { useContext } from "react";
import { CategoryContext } from "./Category";

export const EventItem = ({ event }) => {
  const { categories } = useContext(CategoryContext);

  return (
    <div className="eventitem">
      {event.image !== "" &&
      event.image.startsWith("https://") &&
      (event.image.endsWith(".jpg") || event.image.endsWith(".jpeg")) ? (
        <img src={event.image} />
      ) : (
        <img src="https://www.shutterstock.com/blog/wp-content/uploads/sites/5/2018/05/Gradient-Roundup-Illustrator-02.jpg" />
      )}
      <h3>{event.title}</h3>
      <div className="categories">
        {event.categoryIds.map((id) => (
          <Tag key={id}>
            {categories.find((category) => category.id === id)?.name ||
              `This is ${id}`}
          </Tag>
        ))}
      </div>
      <p>{event.description}</p>
      <div className="timestamps">
        <h4>Starttime</h4>
        <p>
          {event.startTime.substring(0, 10)} |{" "}
          {event.startTime.substring(11, 16)}
        </p>
      </div>
      <div className="timestamps">
        <h4>Endtime</h4>
        <p>
          {event.endTime.substring(0, 10)} | {event.endTime.substring(11, 16)}
        </p>
      </div>
    </div>
  );
};
