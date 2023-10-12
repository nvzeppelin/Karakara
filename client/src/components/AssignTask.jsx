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
    IconButton, FormControl, FormLabel, Input,
} from "@chakra-ui/react";
import React, {useState} from "react";
import {GiNotebook} from "react-icons/gi";

export function AssignTask({task, assignTask}) {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [assignee, setAssignee] = useState("")

    return (
        <>
            <IconButton icon={<GiNotebook/>} isRound='true' onClick={onOpen}/>
            <Modal isCentered isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                <ModalContent w='90%'>
                    <ModalHeader>Wer soll diese Aufgabe erledigen?</ModalHeader>
                    <ModalBody>
                        <Text>{task.body}</Text>
                    </ModalBody>
                    <ModalFooter>

                        <form onSubmit={e => {
                            e.preventDefault();
                            console.log("e");
                            assignTask(task.task, assignee, onClose)
                        }} style={{width: "100%"}}>
                            <FormControl isRequired>
                                <FormLabel aria-label={"Dieses Feld ist erfordert"}>Name</FormLabel>
                                <Input
                                    type="text"
                                    value={assignee}
                                    onChange={(e) => setAssignee(e.target.value)}
                                />
                            </FormControl>
                            <Button mr={3} onClick={onClose} colorScheme={"red"}>
                                Abbrechen
                            </Button>
                            <Button mr={3} type={"submit"}>Abschicken</Button>
                        </form>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}