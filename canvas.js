var canvas = document.createElement('canvas');
var b = canvas.getContext('2d');
document.body.appendChild(canvas);

canvas.width = 400;
canvas.height = 400;
setInterval(main, 100);

var posx = 0, posy = 0, xv = 0, yv = 0, grid = 20, tail_s = 1;
var left = 0, right = 0, up = 0, down = 0;
var randx = Math.floor(Math.random() * 18.5);
var randy = Math.floor(Math.random() * 18.5);
var s_location = [];
var gameOver = 0;

function main()
{
    posx += xv;//change in x position
    posy += yv;//change in y position

    b.fillStyle = "black";//black canvas
    b.fillRect(0,0,canvas.width, canvas.height);

    b.fillStyle = "white";//snake head
    b.strokeStyle = "black";
    b.strokeRect(posx*grid, posy*grid, grid, grid);
    b.fillRect(posx*grid, posy*grid, grid, grid);

    if(posx == randx && posy == randy)
    {
        randx = Math.floor(Math.random() * 18.5);
        randy = Math.floor(Math.random() * 18.5);
        tail_s++;
    }

    for(var i = 0;i<s_location.length;i++)//snake body
    {
        b.fillStyle = "white";
        b.strokeStyle = "black";
        b.strokeRect(s_location[i].x*grid, s_location[i].y*grid, grid, grid);
        b.fillRect(s_location[i].x*grid, s_location[i].y*grid, grid, grid);

        if(posx == s_location[i].x && posy == s_location[i].y)//snake dies if head hits tail
        {
            gameOver = 1;
        }
    }

    b.fillStyle = "red";//food
    b.fillRect(randx*grid, randy*grid, grid, grid);

    if(posx < -.2 || posx > 19)//gameOver if snake touches the wall
    {
        gameOver = 1;
    }
    if(posy < -.2 || posy > 19)
    {
        gameOver = 1;
    }
    if(gameOver == 1)
    {
        xv = 0;yv = 0;posx = 0;posy = 0;tail_s = 1;
    }
    gameOver = 0;

    s_location.push({x:posx , y: posy});
    while(s_location.length > tail_s)
    {
        s_location.shift();
    }

    document.addEventListener("keydown", keyHits);
    function keyHits(event)//keyEvents
    {
        if(event.keyCode == 37)//left
        {
            if(right != 1)
            {
                xv = -1;yv = 0;
                left = 1, up = 0, down = 0;
            }
        }else if(event.keyCode == 38)//up
        {
            if(down != 1)
            {
                xv = 0;yv = -1;
                up = 1, left = 0, right = 0;
            }
        }else if(event.keyCode == 39)//right
        {
            if(left != 1)
            {
                xv = 1;yv = 0;
                right = 1, up = 0, down = 0;
            }
        }else if(event.keyCode == 40)//down
        {
            if(up != 1)
            {
                xv = 0;yv = 1;
                down = 1, left = 0, right = 0;
            }
        }
    }
}
//main();