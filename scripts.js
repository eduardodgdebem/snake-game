
function jogo(){
    document.getElementsByClassName('custom-btn btn-3').disabled = true

    const style = document.createElement('style');
    style.innerHTML = `
        canvas {
            outline: none;
            -webkit-tap-highlight-color: rgba(255, 255, 255, 0); /* mobile webkit */
            box-shadow:inset 2px 2px 2px 0px rgba(73, 73, 73, 0.5)
        }
        #stage { 
            width: 400px;
            height: 400px;
            border: 8px solid white;
            border-radius: 5px;
            margin-top: 10px;
            margin-bottom: auto;
            margin-left: auto;
            margin-right: auto;
            display: block;
            box-shadow:inset 
   7px 7px 20px 0px rgba(0,0,0,.1),
   4px 4px 5px 0px rgba(0,0,0,.1);
    `
    document.head.appendChild(style);
            
    let stage = document.getElementById("stage");
    let ctx = stage.getContext("2d");
    document.addEventListener("keydown", keyPush);
    

    // intervalo para chamar uma funcao em segundos
    setInterval(game, 80);

    const vel = 1;

    //Comecar com a velocidade x e y igual a zero
    let vx = vy = 0
    // Comecar com a posicao x e y igual a dez
    let px = py = 10
    // Definindo o tamanho das pecas(lenght)
    let tp = 20
    // quantidade
    let qp = 20
    // posicao inical da maca(apple)
    let = ax = ay = 15

    // rastro da cobra
    let trail = [];
    tail = 5

    placarZerado()

    function morreu(){
        document.removeEventListener("keydown", keyPush)
        alert('Fim de jogo! sua pontuacao foi: ' + (trail.length - 5) + ' macas')
    }

    function placarZerado(){
        var divPlacar = document.getElementById('placar')
        var html = "    Pontos: 0" 
        divPlacar.innerHTML = html
    }
    function atualizaPlacar() {
        var divPlacar = document.getElementById('placar')
        var html = "    Pontos: " + (trail.length - 4)
        divPlacar.innerHTML = html
        }

    function game(){
        px += vx;
        py += vy;
        if (px <0) {
            px = qp-1
        }
        if (px > qp - 1) {
            px = 0;
        }
        if( py  < 0) {
            py = qp - 1
        }
        if ( py > qp-1) {
            py = 0;
        }

        ctx.fillstyle = "border-radius: 100%;"
        ctx.fillStyle = "#d0e0f7";
        ctx.fillRect(0,0, stage.width, stage.height);

        ctx.fillStyle = "red";
        ctx.fillRect(ax*tp, ay*tp, tp,tp);

        ctx.fillStyle = "#3a7830", "outline: 2px solid black";
        for (var i = 0; i < trail.length; i++) {
            ctx.fillRect(trail[i].x*tp, trail[i].y*tp, tp-1,tp-1);
            if (trail[i].x == px && trail[i].y == py)
            {
                vx = vy =0;
                tail =5;
                if(trail.length>5){
                morreu()
                }
            }
        }

        trail.push({x:px,y:py})
        while (trail.length > tail){
            trail.shift();
        }

        if (ax==px && ay==py){
            tail++;
            ax = Math.floor(Math.random()*qp);
            ay = Math.floor(Math.random()*qp);
            atualizaPlacar()
        }
    
    }
    function keyPush(event){                
        switch (event.keyCode) {
            case 37: // Left
                vx = -vel;
                vy = 0;
                break
            case 38: // up
                vx = 0;
                vy = -vel;
                break;
            case 39: // right
                vx = vel;
                vy = 0;
                break;
            case 40: // down
                vx = 0;
                vy = vel;
                break;          
        }
    }
}
