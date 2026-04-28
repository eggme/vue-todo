export const totalItems = (state) => {
    return [...state.todoItems].sort((a, b) => {
        if (!a.regdt) return 1
        if (!b.regdt) return -1
        return new Date(b.regdt) - new Date(a.regdt)
    })
}