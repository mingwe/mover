
var App = React.createClass({
    render: function() {
        return (
        <div className={'parent-block'}>
            <Mover name={'I AM MOVER'} speed={'5'}/>
            <Mover name={'I AM MOVER'} speed={'2'} bot={true} changedirinterval={500}/>
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
        [direct]: prevState[direct] + 1*fwards
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

    getInitialState: function() {
        return {
            left: 0,
            up: 0,
            direction: 'Right',
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight
        };
    },

    componentDidMount() {
        this.interval = setInterval(() => this.move(), this.props.speed);
        if (this.props.bot) {
            this.interval = setInterval(() => this.changeDirection(), this.props.changedirinterval);
        }
    },

    move() {
        doMove(this, this.state.direction);
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
            <div className={'mover'}
                 tabIndex="-1" // Enables key handlers on div
                 onKeyDown={this.handleKeyPress} style={
                {
                    background: "#eee",
                    left: this.state.left + 'px',
                    top: this.state.up + 'px',
                    margin: "50px"
                }
            }>
                {this.props.name}
            </div>
        );
    }
});


ReactDOM.render(
    <App />,document.getElementById('root')
);