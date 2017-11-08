function checkCatch(plx, ply, aix, aiy, modificator) {
    if ((((+plx)-(+modificator) < (+aix))) && (((+plx)+(+modificator)) > (+aix))) {
        if ((((+ply)-(+modificator)) < (+aiy)) && (((+ply)+(+modificator)) > (+aiy))) {
            console.log('CATCHED!');
            return true
        }
    }
    // console.log('------');
    // console.log((+plx)-(+modificator));
    // console.log((+aix));
    // console.log((+plx)+(+modificator));
}


var App = React.createClass({

    getInitialState: function () {
        return {
            enabled: true,
            catched: false,
            level: 2,
            plposition: '0/0',
            aiposition: '100/100',
        }
    },

    componentWillUpdate: function () {
        if (this.state.catched != true) {
            let plx = (this.state.plposition).split('/')[0];
            let aix = (this.state.aiposition).split('/')[0];
            let ply = (this.state.plposition).split('/')[1];
            let aiy = (this.state.aiposition).split('/')[1];
            let modificator = 15;
            if (checkCatch(plx, ply, aix, aiy, modificator)) {
                this.setState({
                    catched: true
                })
            }
        }
        console.log('upd');
    },

    position: function(value){
        if (value[1]) {
           this.setState({aiposition:value[0]});
        }
        else {
           this.setState({plposition:value[0]});
        }

    },

    render: function() {
        console.log(this.state.catched);
        return (
            <div>
                {!this.state.catched &&
                <div className={'parent-block'}>
                    <Mover name={'WEBVERSOR'} speed={1000 / this.state.level} bot={false} position={this.position} stop={this.state.catched}/>
                    <Mover name={''} speed={700 / this.state.level} bot={true} changedirinterval={2500}
                           position={this.position} stop={this.state.catched}/>
                </div>
                }
                {this.state.catched &&
                    <div className={'gratz'}>WE DID IT!</div>
                }
            </div>
    );
    }
});

function doMove (obj, dir) {

    var direct;
    var fwards;
    var opposite;

    if (dir == 'Left' || dir == 'Right') {
        direct = 'left';
        if (dir == 'Left') {
            opposite = 'Right';
        }
        else {
            opposite = 'Left';
        }
    }
    else {
        direct = 'up';
        if (dir == 'Up') {
            opposite = 'Down';
        }
        else {
            opposite = 'Up';
        }
    }
    if (dir == 'Left' || dir == 'Up') {
        fwards = -1;
        if (obj.state[direct] <= 0) {
            obj.setState({
                direction: opposite
            })
        }
    }
    else {
        if (!(((direct == 'up') && (obj.state.up >= obj.state.windowHeight)) || ((direct == 'left') && (obj.state.left >= obj.state.windowWidth)))) {
            fwards = 1;
        }
        else {
            fwards = -1;
            obj.setState({
                direction: opposite
            })
        }
    }
    obj.setState(prevState => ({
        [direct]: prevState[direct] + 20*fwards
    }));
}


function changeDir(obj, dir) {
    let directions = [
        'Left',
        'Right',
        'Up',
        'Down'
    ];
    let newDirection = directions[Math.round((Math.random()*3))];
    if (obj.state.direction != newDirection) {
        obj.setState ({
            direction: newDirection
        })
    }
}

var Mover = React.createClass({

    pickPosition: function(event) {
        this.props.position([(this.state.left + '/' + this.state.up), this.props.bot]);
    },

    getInitialState: function() {
        let startPos
        if (this.props.bot) {
            startPos = 100;
        }
        else {
            startPos = 0;
        }
        return {
            left: startPos,
            up: startPos,
            direction: 'Right',
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight
        };
    },

    componentDidMount() {

        if (this.props.bot) {
            this.interval = setInterval(() => this.changeDirection(), this.props.changedirinterval);
        }
        this.interval = setInterval(() => this.move(), this.props.speed);
        console.log(this.props.speed);

    },

    move() {
        doMove(this, this.state.direction);
        this.pickPosition();
        if (this.props.stop) {
            clearInterval(this.interval);
            console.log('stopped');
        }
    },

    changeDirection() {
        changeDir(this, this.state.direction);
    },

    handleKeyPress: function (event) {
        if(event.key == 'ArrowLeft' || event.key == 'ArrowRight' || event.key == 'ArrowUp' || event.key == 'ArrowDown'){
            let myDirection = event.key.substr(5, 5);
            this.setState({
                direction: myDirection
            })
        }
    },

    render: function() {
        return (
            <div className={(!this.props.bot ? 'webversor ':'deadline ') + 'mover'}
                 tabIndex="-1" // Enables key handlers on div
                 onKeyDown={this.handleKeyPress} style={
                {
                    left: this.state.left + 'px',
                    top: this.state.up + 'px',
                    margin: "0px"
                }
            }>
                {this.props.name}
            </div>
        );
    }
});


// ReactDOM.render(
//     <App />,document.getElementById('root')
// );


var app = ReactDOM.render(<App/>, document.getElementById('root'));
