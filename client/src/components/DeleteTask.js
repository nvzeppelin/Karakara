import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Button,
    Text,
    useDisclosure,
    IconButton,
} from "@chakra-ui/react";
import React from "react";
import {FiTrash2} from "react-icons/fi";


function DeleteTask({task, deleteTask}) {
    const {isOpen, onOpen, onClose} = useDisclosure();

    return (
        <>
            <IconButton icon={<FiTrash2/>} isRound='true' onClick={onOpen}/>

            <Modal isCentered isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                <ModalContent w='90%'>
                    <ModalHeader>Möchtest du wirklich diese Aufgabe löschen?</ModalHeader>
                    <ModalBody>
                        <Text>{task.body}</Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button mr={3} onClick={onClose}>
                            Nein
                        </Button>
                        <Button
                            colorScheme='red'
                            onClick={() => deleteTask(task.task, onClose)}
                        >
                            Ja
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export {DeleteTask};
