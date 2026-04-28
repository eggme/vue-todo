const pushItem = (state, item) => {
    console.log(item);
    state.todoItems.push(item)
    localStorage.setItem(item.uuid, JSON.stringify(item));
}
const removeItem = (state, uuid) => {
    const idx = state.todoItems.findIndex(f => f.uuid === uuid)
    if( idx !== -1 ) {
        state.todoItems.splice(idx, 1)
        localStorage.removeItem(uuid);
    }
}
const toggleComplete = (state, uuid) => {
    const idx = state.todoItems.findIndex(f => f.uuid === uuid)
    if( idx !== -1 ) {
        state.todoItems[idx].completed = !state.todoItems[idx].completed
        const data = JSON.parse(localStorage.getItem(uuid))
        data.completed = !data.completed
        localStorage.setItem(uuid, JSON.stringify(data)) // localStorage는 string 만 저장가능
    }
}
const clearItems = (state) => {
    state.todoItems = []
    localStorage.clear()
}

export { pushItem, removeItem, toggleComplete, clearItems }