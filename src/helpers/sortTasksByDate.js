export const sortTasksByDate = (prevTask, currentTask) => {
    const prevTaskCreated = prevTask.created;
    const currentTaskCreated = currentTask.created;

    let comparison = 0;

    if (prevTaskCreated < currentTaskCreated) {
        comparison = 1;
    } else if (prevTaskCreated > currentTaskCreated) {
        comparison = -1;
    }

    return comparison;
};
