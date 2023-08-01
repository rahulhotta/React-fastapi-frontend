// Function to delete tasks from existing list
export const deleteTaskFromList = (taskId,database, databaseSetter) => {
    const updatedList = database.filter(item => item.taskId !== taskId )
    databaseSetter(updatedList)
}

// Function to edit tasks in existing list
export const editTaskInList = (taskId, updatedTask, database, databaseSetter) => {
    const updatedList = database.map((item)=>{
        if(item.taskId === taskId){
            return {...taskId, taskName:updatedTask.taskName, taskDesc: updatedTask.taskDesc}
        }
        return item
    })
    databaseSetter(updatedList)
}