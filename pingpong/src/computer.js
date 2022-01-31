export default class Computer
{
    constructor (car)
    {
        this.car = car;
    }
    update(ballx)
    {
        if(this.car.position.x<=ballx && ballx<=(this.car.position.x+this.car.width))
        {
            this.car.stop()
        }
        else if(ballx>this.car.position.x)
        {
            this.car.moveRight();
        }
        else
        {
            this.car.moveLeft();
        }


    }
}