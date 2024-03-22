import { useContext, useState } from "react";
import {
  Button,
  Tag,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useToast,
} from "@chakra-ui/react";
import { CategoryContext } from "../components/CategoryContext";
import { UserContext } from "../components/UserContext";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useDisclosure } from "@chakra-ui/react";
import { EventForm } from "../components/EventForm";
import { DeleteEvent } from "../components/DeleteEvent";

export const loader = async ({ params }) => {
  const eventId = parseInt(params.eventId);
  const event = await (
    await fetch(`http://localhost:3000/events?id=${eventId}`)
  ).json();
  return [event];
};

export const EventPage = () => {
  const [event] = useLoaderData();
  const eventDetails = event.length > 0 ? event[0] : null;
  const { categories } = useContext(CategoryContext);
  const { users } = useContext(UserContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const toast = useToast();
  const navigate = useNavigate();
  const createdByUser = eventDetails?.createdBy
    ? users.find((user) => user.id === eventDetails.createdBy)
    : null;

  const handleCheckedItemsUpdate = (checkedItems) => {
    setCheckedItems(checkedItems);
    console.log(checkedItems);
  };

  // Submitter
  const handleEditSubmit = async (formData) => {
    setIsLoading(true);

    try {
      formData.categoryIds = checkedItems;

      const update = await fetch(
        `http://localhost:3000/events/${formData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (update.ok) {
        toast({
          title: "Event updated.",
          description: "The event was successfully updated",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        onClose();
      }
    } catch (error) {
      console.error("Error updating event:", error);
      toast({
        title: "Error",
        description: "Failed to update event.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Deleter
  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/events/${eventDetails.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to delete event. Status: ${response.status}`);
      }
      onClose();
      navigate("/");
    } catch (error) {
      console.error("Error updating event:", error);
      toast({
        title: "Error",
        description: `Failed to update event.`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Event Page
  return (
    <>
      {isLoading ? (
        <div className="flexboxloading">
          <p>Loading..</p>
        </div>
      ) : (
        <div className="item">
          <div className="eventinformation">
            <h1>{eventDetails.title}</h1>
            <div className="categories">
              {eventDetails.categoryIds.map((id) => (
                <Tag key={id}>
                  {categories.find((category) => category.id === id)?.name ||
                    `This is ${id}`}
                </Tag>
              ))}
            </div>
            <p>{eventDetails.description}</p>
            <div className="timestamps">
              <h4>Location</h4>
              <p>{eventDetails.location}</p>
            </div>
            <div className="timestamps">
              <h4>Starttime</h4>
              <p>
                {eventDetails.startTime.substring(0, 10)} |{" "}
                {eventDetails.startTime.substring(11, 16)}
              </p>
            </div>
            <div className="timestamps">
              <h4>Endtime</h4>
              <p>
                {eventDetails.endTime.substring(0, 10)} |{" "}
                {eventDetails.endTime.substring(11, 16)}
              </p>
            </div>
            <Button onClick={onOpen} colorScheme="pink">
              Edit event
            </Button>
            <DeleteEvent onDelete={handleDelete} />
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <h2>Edit event</h2>
                <ModalBody>
                  <EventForm
                    initialValues={eventDetails}
                    isLoading={isLoading}
                    onSubmit={handleEditSubmit}
                    onClose={onClose}
                    updateCheckedItems={handleCheckedItemsUpdate}
                  />
                  <ModalCloseButton />
                </ModalBody>
              </ModalContent>
            </Modal>
            <div className="useritem">
              <img src={createdByUser?.image} />
              <h2>{createdByUser?.name}</h2>
            </div>
          </div>
          <div className="eventbanner">
            {eventDetails.image !== "" &&
            eventDetails.image.startsWith("https://") &&
            (eventDetails.image.endsWith(".jpg") ||
              eventDetails.image.endsWith(".jpeg")) ? (
              <img src={eventDetails.image} />
            ) : (
              <img src="https://assets-global.website-files.com/64022de562115a8189fe542a/6417b40028f930d9c3a3c829_Why-Using-A-Smiley-Face-Survey-Can-Boost-Your-Response-Rate.jpeg" />
            )}
          </div>
        </div>
      )}
    </>
  );
};
