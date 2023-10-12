import React from "react";
import {DeleteTask} from "./DeleteTask";
import {AssignTask} from "./AssignTask";
import {
    HStack,
    Box,
    VStack,
    Text,
    StackDivider,
    IconButton
} from "@chakra-ui/react";
import {Image} from "@chakra-ui/react";
import img from "../images/empty.svg";
import {FiCheckSquare} from "react-icons/fi";
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import constants from "../constants";

function TaskList({tasks, deleteTask, checkTask, cookies, assignTask}) {
    if (!tasks.length) {
        return (
            <>
                <Box maxW='80%'>
                    <Image
                        mt='20px'
                        w='98%'
                        maxW='350'
                        src={img}
                        alt='Die Liste ist leer!'
                    />
                </Box>
            </>
        );
    }
    const reorder = (list, startIndex, endIndex) => {
        let result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        result = result.map((task, index) => {
                let newtask = task
                newtask.index = index
                fetch(constants.url + "index", {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Authorization': cookies.Auth,
                        'Content-Type': "application/json"
                    },
                    body: JSON.stringify(newtask)
                })
                return newtask
            }
        )
        return result;
    };

    function onDragEnd(result) {
        // dropped outside the list
        if (!result.destination) {
            return;
        }


        const items = reorder(
            tasks,
            result.source.index,
            result.destination.index
        );
        tasks = items;
    }

    return (
        <>
            <VStack
                divider={<StackDivider/>}
                borderColor='gray.100'
                borderWidth='2px'
                p='5'
                borderRadius='lg'
                w='100%'
                maxW={{base: "90vw", sm: "80vw", lg: "50vw", xl: "30vw"}}
                alignItems='stretch'
            >
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="droppable">
                        {(provided, snapshot) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {tasks.map((task) => (

                                    <Draggable key={task.task} draggableId={task.task} index={task.index}>
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <HStack key={task.id} opacity={task.done === true ? "0.2" : "1"}
                                                        style={{position: 'relative', top: '0px'}} className={"todo"}
                                                        draggable={'true'}>
                                                    <Text
                                                        w='100%'
                                                        p='8px'
                                                        borderRadius='lg'
                                                        as={task.done === true ? "s" : ""}
                                                        cursor='pointer'
                                                    >
                                                        {task.task}
                                                    </Text>
                                                    <Text
                                                        w='100%'
                                                        p='8px'
                                                        borderRadius='lg'
                                                        as={task.done === true ? "s" : ""}
                                                        cursor='pointer'
                                                    >
                                                        {task.assignee}
                                                    </Text>
                                                    <DeleteTask
                                                        task={task}
                                                        deleteTask={deleteTask}
                                                    />
                                                    <AssignTask
                                                        task={task}
                                                        assignTask={assignTask}
                                                    />
                                                    <IconButton icon={<FiCheckSquare/>} isRound='true'
                                                                onClick={() => checkTask(task.task)}/>
                                                </HStack>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </VStack>


        </>
    );
}

export default TaskList;
