class SudokuResolver{
    constructor() {

    }

    solve(maze){
        let animateMaze = [];

        function resolveMaze(maze){
            let currentCell = maze.getNextUnsolveCell();
            //already solved maze
            if(currentCell===undefined) {
                return true;
            }
            let availableValues = maze.getAvailableValues(currentCell);
            for(let value of availableValues){
                maze.setValueForCell(currentCell,value);
                let clone = maze.cloneMazeCell();
                animateMaze.push(clone);
                if(resolveMaze(maze)){
                    return true;
                }
            }
            maze.setValueForCell(currentCell,0);

            return false;
        }

        if(resolveMaze(maze)){
            return animateMaze;
        }
        else
        {
            return undefined;
        }

    }

}
