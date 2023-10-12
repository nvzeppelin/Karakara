import {
    Heading,
    IconButton,
    VStack,
    useColorMode,
} from "@chakra-ui/react";
import TaskList from "./components/tasks";
import AddTask from "./components/AddTask";
import {FaSun, FaMoon} from "react-icons/fa";
import {useState, useEffect} from "react";
import constants from "./constants";
import {useCookies} from 'react-cookie'

function App() {
    const [cookies] = useCookies(['Auth']);
    const [tasks, setTasks] = useState(
        () => []
    );

    function fetchdata() {
        fetch(constants.url + "notes", {
            headers: {
                'Authorization': cookies.Auth
            },
            mode: 'cors',
        }).then(res => res.json().then(data => {
            const newTasks = [...data]
            data.forEach(element => {
                newTasks[element.index] = element
            });
            setTasks(newTasks)
        }))
    }

    useEffect(() => {
        const interval = setInterval(() => {
            fetchdata();
        }, 1000);
        return () => clearInterval(interval);
    }, [])

    async function deleteTask(id, callback) {
        const task = tasks.filter((task) => {
            return task.task === id
        })[0]
        await fetch(constants.url + "rmnote", {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': cookies.Auth
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(task)
        })

        const newTasks = tasks.filter((task) => {
            return task.id !== id;
        });
        newTasks.forEach(async e => {
            let t = e
            if (t.index > task.index) t.index -= 1
            await fetch(constants.url + "index", {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Authorization': cookies.Auth,
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(t)
            })
        })
        setTasks(newTasks);
        callback()
    }

    function checkTask(id) {
        const newTasksCheck = tasks.map(async (task, index, array) => {
            if (task.task === id) {
                await fetch(constants.url + "update", {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': cookies.Auth
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: JSON.stringify(task).replace("}", ",\"update\":" + !task.done + "}")
                })
                task.done = !task.done;

            }

            return task;
        });
        setTasks(newTasksCheck)
    }

    function assignTask(id, assignee, callback) {
        console.log(id, assignee)
        const newTasksWithAssignee = tasks.map(async (task, index, array) => {
            if (task.task === id) {
                await fetch(constants.url + "assign", {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': cookies.Auth
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: JSON.stringify(task).replace(new RegExp("\"assignee\":[^,]*"), `"assignee":\"${assignee}\"`)
                })
                task.assignee = assignee

            }

            return task;
        });
        setTasks(newTasksWithAssignee)
        callback()
    }

    async function addTask(task) {
        await fetch(constants.url + "note", {
            method: 'POST',

            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': cookies.Auth
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(task)
        })
        setTasks([...tasks, task]);
    }


    const {colorMode, toggleColorMode} = useColorMode();

    return (
        <VStack p={4} minH='100vh' pb={28}>
            <IconButton
                icon={colorMode === "light" ? <FaSun/> : <FaMoon/>}
                isRound='true'
                size='md'
                alignSelf='flex-end'
                onClick={toggleColorMode}
                aria-label='toogle-dark-mode'
            />

            <Heading
                p='5'
                fontWeight='extrabold'
                size='xl'
                bgGradient='linear(to-r, red.500, yellow.500)'
                bgClip='text'
            >
                Aufgabenliste
            </Heading>
            <AddTask addTask={addTask}/>
            <TaskList
                tasks={tasks}
                deleteTask={deleteTask}
                checkTask={checkTask}
                cookies={cookies}
                assignTask={assignTask}
            />
        </VStack>
    );
}

export default App;
