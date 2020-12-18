const initialTasks = {
    statuses: [
        'todo',
        'progress',
        'review',
        'done',
    ],

    cards: [{
        id: 1,
        name: 'First Tasts',
        status: 'todo',
        priority: 2,
        oldStatus: ''
    },

        {
            id: 2,
            name: 'First Tasts',
            status: 'progress',
            priority: 2,
            oldStatus: ''
        },
        {
            id: 3,
            name: 'First Tasts',
            status: 'review',
            priority: 2
        },
        {
            id: 4,
            name: 'First Tasts',
            status: 'done',
            priority: 2,
            oldStatus: '',
        }
    ]
}

const cards = (state = initialTasks, action) => {
    switch (action.type) {

        case 'GET_CARDS' :
            return {
                ...state,
                cards: [state.cards, {title: action.payload, status: 'todo', done: false, id: Math.random()}]
            }


        case'DELETE_CARD':
            const newState = state.cards.filter(card => card.id !== action.payload);
            return {...state, cards: [...newState]}
        case'MOVE_CARD':
            const nextPlace = (currentIndex, value) => {
                return (
                    state.statuses[state.statuses.indexOf(currentIndex) + value])
            }

            const upgrateTasks = state.cards.map(el => el.id === action.payload.id ? {
                ...el,
                status: nextPlace(el.status, action.payload.value)
            } : el)
            return {
                ...state,
                cards: [...upgrateTasks]
            }


        case'CHANGE_CARD':
            const newCards = state.cards.map(card => {
                if (card.id === action.taskId)
                    return {...card, title: action.payload};
                return card;
            })
            return {...state, cards: [...newCards]}

        default:
            return state
    }
}
export default cards;