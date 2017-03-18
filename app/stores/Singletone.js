export default class {
    constructor(){
        this.instance = this.instance || this;
        return this.instance;
    }
}
