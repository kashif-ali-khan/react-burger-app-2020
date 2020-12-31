const redux = require('redux');

const reduxStore = redux.createStore;

const initialState = {
    counter: 0
}

// reducers
const reducer = (state = initialState, action) => {
    if (action.type === 'INC_COUNTER') {
        return {
            ...state,
            counter: state.counter + 1
        }
    }
    if (action.type === 'ADD_COUNTER') {
        return {
            ...state,
            counter: state.counter + action.value
        }
    }
    return state;

}
//create store
const store = reduxStore(reducer);

//subscription

store.subscribe(()=>{
    console.log('[Subscription]',store.getState())  
})

// dispatch action
store.dispatch({ type: 'INC_COUNTER' })
store.dispatch({ type: 'ADD_COUNTER',value:10 })
//console.log(store.getState())

