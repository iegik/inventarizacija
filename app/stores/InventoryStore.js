import Singletone from './Singletone';
import actionTypes from './actionTypes';
const {
    INVENTORY_CREATE,
    INVENTORY_UPDATE,
    INVENTORY_DELETE,
    INVENTORY_FLUSH,
} = actionTypes;

export default class extends Singletone {
    reducer = (state = [], action = {}) => {
        let indexed = 'code';
        switch (action.type) {
            case INVENTORY_CREATE:
                state.push(action.value);
                return state;
            case INVENTORY_UPDATE:
                let updated = false;
                state = state.map((value) => {
                    if(value[indexed] === action.value[indexed]) {
                        updated = true;
                        return action.value;
                    }
                    return value;
                });
                if(!updated) {
                    return this.reducer(state, {type: INVENTORY_CREATE, value: action.value})
                }
                return state;
            case INVENTORY_DELETE:
                return state.filter(value=>value[indexed] !== action.value[indexed]);
            case INVENTORY_FLUSH:
                return [];
            default:
                return state;
        }
    }
}