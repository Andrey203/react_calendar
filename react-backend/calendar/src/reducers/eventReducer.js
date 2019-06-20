const eventReducer = (state = [], action) => {
    switch(action.type) {
        case "ADD_EVENT":
            console.log(action);
            return state.concat([action.data]);
        case "REMOVE_EVENT":
            const stateUpdated = state.filter(elem => elem.id !== action.id);
            return stateUpdated;
        case "CHANGE_EVENT":
            return state.map( el => {
                console.log(el.id + " " + action.id);
                if( el.id === action.id ) {
                    return {...el,
                        width: "97px"}
                } else
                    return el;

            } );
        default:
            return state;
    }
};

export default eventReducer;