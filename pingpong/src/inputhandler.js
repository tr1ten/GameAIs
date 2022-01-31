export default class InputHandler {
    constructor(car,controls={right:"ArrowRight",left:"ArrowLeft"})
    {
        document.addEventListener("keydown",(e)=>{
            switch(e.key)
            {
                case controls.right:
                    car.moveRight();
                    break;
                case controls.left:
                    car.moveLeft();
            }
        })
        document.addEventListener("keyup",(e)=>{
            switch(e.key)
            {
                case controls.right:
                    if(car.speed>0) car.stop();
                    break;
                case controls.left:
                    if (car.speed<0) car.stop();
                    break;
            }
        })
    }
}