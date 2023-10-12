import {useState} from "react";
import {Button, HStack, Input, useToast} from "@chakra-ui/react";

function AddTask({addTask}) {
    const toast = useToast();
    const [content, setContent] = useState("");
    const [assignee, setAssignee] = useState("");
    const [statusInput, setStatusInput] = useState(true);

    function handleSubmit(e) {
        e.preventDefault();
        const taskText = content.trim();
        const name = assignee.trim();
        if (!taskText) {
            toast({
                title: "Gebe eine Aufgabe ein",
                position: "top",
                status: "warning",
                duration: 2000,
                isClosable: true,
            });
            setStatusInput(false);

            return setContent("");
        }

        const task = {
            task: taskText,
            done: false,
            assignee: name,
            index: -1
        };
        addTask(task);
        setContent("");
        setAssignee("")
    }

    if ((content && !statusInput) || (assignee && !statusInput)) {
        setStatusInput(true);
    }

    return (
        <form onSubmit={handleSubmit}>
            <HStack mt='4' mb='4'>
                <Input
                    h='46'
                    borderColor={!statusInput ? "red.300" : "transparent"}
                    variant='filled'
                    placeholder='Gebe eine Aufgabe ein'
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <Input
                    h='46'
                    borderColor={!statusInput ? "red.300" : "transparent"}
                    variant='filled'
                    placeholder='Gebe den Zugewiesenen ein'
                    value={assignee}
                    onChange={(e) => setAssignee(e.target.value)}
                />
                <Button
                    colorScheme='twitter'
                    px='8'
                    pl='10'
                    pr='10'
                    h='46'
                    type='submit'
                >
                    Hinzufügen
                </Button>
            </HStack>
        </form>
    );
}

export default AddTask;
