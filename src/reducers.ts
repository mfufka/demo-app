export default function reducer(state = {}, action: any) {
    switch (action.type) {
        case 'ORDER_REQUESTED':
            return {...action.payload}
        default:
            return state
    }
}