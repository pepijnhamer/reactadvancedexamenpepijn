import { useRef } from "react";
import {
  Button,
  AlertDialog,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
} from "@chakra-ui/react";

export const DeleteEvent = ({ onDelete }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const handleDeleteClick = () => {
    onOpen();
  };

  const handleDeleteConfirm = () => {
    onDelete();
    onClose();
  };

  return (
    <>
      <Button colorScheme="pink" variant="outline" onClick={handleDeleteClick}>
        Delete Event
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <h2>Delete Event</h2>

            <p>
              Are you sure you want to delete this event? This action cannot be
              undone.
            </p>

            <div>
              <Button ref={cancelRef} onClick={onClose} colorScheme="pink">
                Cancel
              </Button>
              <Button
                onClick={handleDeleteConfirm}
                ml={3}
                colorScheme="pink"
                variant="outline"
              >
                Delete
              </Button>
            </div>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
