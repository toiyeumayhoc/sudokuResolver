class SudokuResolver{
    constructor() {
    }

    solve(maze){
        let currentCell = maze.getNextUnsolveCell();
        //already solved maze
        if(currentCell===undefined) {
            return true;
        }
        let availableValues = maze.getAvailableValues(currentCell);
        for(let value of availableValues){
            maze.setValueForCell(currentCell,value);
            if(this.solve(maze)){
                return true;
            }
        }
        maze.setValueForCell(currentCell,0);

        return false;
    }

}
