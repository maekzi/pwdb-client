import { useRef } from 'react';
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button
} from '@chakra-ui/react';

type ConfirmDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onClick: () => void;
  header: string;
  message: string;
  actionButtonText: string;
};

const ConfirmationDialog = ({
  isOpen,
  onClose,
  onClick,
  header,
  message,
  actionButtonText
}: ConfirmDialogProps) => {
  const cancelRef = useRef(null);

  return (
    <>
      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {header}
            </AlertDialogHeader>

            <AlertDialogBody>{message}</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={onClick} ml={3}>
                {actionButtonText}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default ConfirmationDialog;
