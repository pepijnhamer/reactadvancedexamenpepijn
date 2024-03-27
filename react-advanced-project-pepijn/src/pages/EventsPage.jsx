import React, { useEffect, useState, useContext } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useLoaderData, Link } from "react-router-dom";
import { EventItem } from "../components/EventItem";
import { CategoryContext } from "../components/Category";
import { EventForm } from "../components/EventForm";
import { SearchBar } from "../components/SearchBar";

export const loader = async () => {
  const events = await fetch("http://localhost:3000/events");
  return {
    events: await events.json(),
  };
};

export const EventsPage = () => {
  const { events } = useLoaderData();
  const { categories } = useContext(CategoryContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("");
  const [filteredEvents, setFilteredEvents] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const toast = useToast();

  const initialFormData = {
    title: "",
    image: "",
    description: "",
    location: "",
    startTime: "",
    endTime: "",
    categoryIds: [],
    createdBy: 1,
  };

  useEffect(() => {
    if (events) {
      let filteredEvents = events;

      if (selectedCategoryFilter !== "") {
        filteredEvents = events.filter((event) =>
          event.categoryIds.some(
            (categoryId) =>
              categories.find((category) => category.id === categoryId)
                ?.name === selectedCategoryFilter
          )
        );
      }

      if (searchTerm !== "") {
        filteredEvents = filteredEvents.filter((event) =>
          event.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      setFilteredEvents(filteredEvents);
    }
  }, [searchTerm, selectedCategoryFilter, events]);

  const handleCategoryFilterChange = (category) => {
    setSelectedCategoryFilter(category);
  };

  const handleCheckedItemsUpdate = (checkedItems) => {
    setCheckedItems(checkedItems);
    console.log(checkedItems);
  };

  const handleAddEventSubmit = async (formData) => {
    setIsLoading(true);

    try {
      const highestEventId = Math.max(...events.map((event) => event.id));
      const newEventId = highestEventId + 1;
      formData.id = newEventId;
      formData.categoryIds = checkedItems;
      console.log(formData);

      const response = await fetch("http://localhost:3000/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: "Event created.",
          description: "Your event has been created!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setFilteredEvents((prevEvents) => [...prevEvents, formData]);

        onClose();
      }
    } catch (error) {
      console.error("Error creating event:", error);
      toast({
        title: "Error",
        description: "Failed to create event.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Searchbar, Category filter and items
  return (
    <div className="main">
      <p className="introduction">
        Welcome to <b>Events by Pepijn!</b> Your one-stop hub for discovering
        and hosting events. Find cultural, sports, and social gatherings
        tailored to <b>your interests</b>. Easily organize your own events
        hassle-free. Lets explore, connect, and celebrate together!
      </p>
      <div className="searchgrid">
        <div>
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          ></SearchBar>
        </div>
        <div>
          <select
            className="searchbar"
            id="category"
            value={selectedCategoryFilter}
            onChange={(e) => handleCategoryFilterChange(e.target.value)}
          >
            <option value="">All events</option>
            {categories &&
              categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
          </select>
        </div>
        <div>
          <button onClick={onOpen}>Add event</button>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <h2>Add event</h2>
              <ModalBody>
                <EventForm
                  initialValues={initialFormData}
                  onSubmit={handleAddEventSubmit}
                  isLoading={isLoading}
                  onClose={onClose}
                  updateCheckedItems={handleCheckedItemsUpdate}
                />
                <ModalCloseButton />
              </ModalBody>
            </ModalContent>
          </Modal>
        </div>
      </div>
      <div className="eventgrid">
        {filteredEvents.map((event) => (
          <Link key={event.id} to={`/events/${event.id}`}>
            <EventItem event={event}></EventItem>
          </Link>
        ))}
      </div>
    </div>
  );
};
