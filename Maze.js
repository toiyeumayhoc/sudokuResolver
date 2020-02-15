class Maze {

    constructor() {
        this.cols = 9;
        this.rows = 9;
        this.mazeCell = new Array(this.rows);
        this.sudokuMaze = new Array(this.rows);
        this.initMaze();
    }

    initMaze() {
        for (let i = 0; i < this.rows; i++) {
            this.mazeCell[i] = new Array(this.cols);
            this.sudokuMaze[i] = new Array(this.cols);
            for (let j = 0; j < this.cols; j++) {
                this.mazeCell[i][j] = new Cell(i, j);
            }
        }

    }

    setMaze(maze){
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.mazeCell[i][j].value = maze[i][j];
            }
        }

    }

    checkValidMaze(){
        for(let i =0; i<this.rows; i++){
            let rowValue = this.getRowValues(this.mazeCell[i][0]);
            if(!this.checkValueUnique(rowValue)){
                return false;
            }
        }
        for(let i =0; i<this.cols; i++){
            let colValue = this.getColValues(this.mazeCell[0][i]);
            if(!this.checkValueUnique(colValue)){
                return false;
            }
        }
        for(let i =0; i<9; i = i +3){
            for(let j = 0; j<9; j= j+3 ){
                let values = this.getSquadValue(this.mazeCell[i][j]);
                if(!this.checkValueUnique(values)){
                    return false;
                }
            }
        }
        return true;
    }

    checkValueUnique(values){
        for(let i =0; i<values.length; i++){
            if(values.indexOf(values[i])!== values.lastIndexOf(values[i])){
                return false;
            }
        }
        return true;
    }

    getNextUnsolveCell(){
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                if(this.mazeCell[i][j].value ===0) return this.mazeCell[i][j];
            }
        }
        return undefined;
    }

    getAvailableValues(cell){
        let result = [1,2,3,4,5,6,7,8,9];
        for(let i of this.getRowValues(cell)){
            let index = result.indexOf(i);
            if (index !== -1) result.splice(index, 1);
        }
        for(let i of this.getColValues(cell)){
            let index = result.indexOf(i);
            if (index !== -1) result.splice(index, 1);
        }
        for(let i of this.getSquadValue(cell)){
            let index = result.indexOf(i);
            if (index !== -1) result.splice(index, 1);
        }
        return result;
    }

    getRowValues(cell){
        let result = [];
        for(let i =0 ; i<this.cols; i++){
            if(this.mazeCell[cell.x][i].value!==0) result.push(this.mazeCell[cell.x][i].value);
        }
        return result;
    }

    getColValues(cell){
        let result = [];
        for(let i =0 ; i<this.rows; i++){
            if(this.mazeCell[i][cell.y].value!== 0) result.push(this.mazeCell[i][cell.y].value);
        }
        return result;
    }

    getSquadValue(cell){
        let result = [];
        let quadX = Math.floor(cell.x/3);
        let quadY = Math.floor(cell.y/3);
        for(let x = quadX*3; x< quadX*3+3; x++){
            for(let y = quadY*3; y< quadY*3+3; y++){
                if(this.mazeCell[x][y].value!== 0) result.push(this.mazeCell[x][y].value);
            }
        }
        return result;
    }

    setValueForCell(cell, value){
        this.mazeCell[cell.x][cell.y].value = value;
    }

    show() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.sudokuMaze[i][j] = this.mazeCell[i][j].value;
                document.getElementById("cellx" + i +"y"+ j).value = this.mazeCell[i][j].value;
            }
        }
        console.log(this.sudokuMaze);
    }

    cloneMazeCell(){
        let clone = new Array(this.rows);
        for (let i = 0; i < this.rows; i++) {
            clone[i] = new Array(this.cols);
            for (let j = 0; j < this.cols; j++) {
                clone[i][j] = this.mazeCell[i][j].value;
            }
        }
        let cloneMaze = new Maze();
        cloneMaze.setMaze(clone);
        return cloneMaze;

    }

}