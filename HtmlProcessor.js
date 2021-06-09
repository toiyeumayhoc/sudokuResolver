class HtmlProcessor{
    constructor(maze,mazeWidth, mazeHeight){
        this.maze = maze;
        this.mazeWidth = mazeWidth;
        this.mazeHeight = mazeHeight;
        this.colorQuad = [
            ["#3b5999","#0084ff","#55acee"],
            ["#21759b","#1ab7ea","#0077b5"],
            ["#4c75a3","#007ee5","#00AFF0"]
        ];
        this.initMaze();
    }


    initMaze(){
        let mazeDiv = document.getElementById("mainMaze");
        
        mazeDiv.style.height = this.mazeHeight+"px";
        mazeDiv.style.border = "1px solid";
        mazeDiv.style.display = "table";
        mazeDiv.style.margin = "auto";
        for(let i =0; i<this.maze.rows;i++){
            let cellRow = document.createElement("div");
            cellRow.id = "row"+i;
            cellRow.style.display = "table-row";
            mazeDiv.appendChild(cellRow);
            for(let j =0 ; j<this.maze.cols; j++)
            {
                let cell = document.createElement("input");
                cell.id = "cellx"+i+"y"+j;
                cell.style.display = "table-cell";
                cell.style.border = "1px solid";
                cell.style.width = (this.mazeWidth/this.maze.cols - 2) + "px";
                cell.style.height = (this.mazeHeight/this.maze.rows - 2) + "px";
                cell.style.backgroundColor = this.getBackGroundColr(i,j);
                cell.style.fontSize = "35px";
                cell.style.textAlign = "center";
                cell.value = "0";
                cell.onchange = function() {
                    let regex = "^[0-9]$";
                    if(!cell.value.match(regex)){
                        document.getElementById("status").innerHTML  = "Invalid input number. Reset number to 0";
                        cell.value = 0;
                    }
                    else{
                        document.getElementById("status").innerHTML  = "Click solve button when your maze is ready";
                    }
                }
                cellRow.appendChild(cell);
            }
        }
    }

    getBackGroundColr(x,y){
        let quadX = Math.floor(x/3);
        let quadY = Math.floor(y/3);
        return this.colorQuad[quadX][quadY];

    }

    getInputMaze(){
        let inputMaze = new Array(this.maze.rows);
        for(let i =0; i<this.maze.rows;i++){
            inputMaze[i] = new Array(this.maze.cols);
            for(let j =0 ; j<this.maze.cols; j++)
            {
                inputMaze[i][j] = Number(document.getElementById("cellx" + i +"y"+ j).value);
            }
        }
        return inputMaze;
    }

    animate(animateMaze){
        let index = 0;
        let intervalID = setInterval(function(){
            console.log(index);
            if (index == animateMaze.length-1) {
                document.getElementById("status").innerHTML = "Finish!!!";
                clearInterval(intervalID);
            }
            animateMaze[index].show();
            index = index+1;
        }, 1);

    }
}
