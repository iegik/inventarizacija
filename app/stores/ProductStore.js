import Singletone from './Singletone';
import actionTypes from './actionTypes';
const {
    CURRENT_PRODUCT_INCRIMENT,
    CURRENT_PRODUCT_DECRIMENT,
    CURRENT_PRODUCT_UPDATE,
    SET_CURRENT_PRODUCT_CODE,
    SET_CURRENT_PRODUCT_PRICE,
    SET_CURRENT_PRODUCT_AMOUNT,
    SET_CURRENT_PRODUCT_MEASUREMENT,
} = actionTypes;

export default class extends Singletone {
    reducer = (state = {}, action = {}) => {
        switch (action.type) {
            case CURRENT_PRODUCT_INCRIMENT:
                state.amount++;
                return state;
            case CURRENT_PRODUCT_DECRIMENT:
                state.amount--;
                return state;
            case CURRENT_PRODUCT_UPDATE:
                return action.value;
            case SET_CURRENT_PRODUCT_CODE:
                state.code = action.value;
                return state;
            case SET_CURRENT_PRODUCT_PRICE:
                state.price = action.value;
                return state;
            case SET_CURRENT_PRODUCT_AMOUNT:
                state.amount = action.value;
                return state;
            case SET_CURRENT_PRODUCT_MEASUREMENT:
                state.measurement = action.value;
                return state;
            default:
                return state;
        }
    }
}