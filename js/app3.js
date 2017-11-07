// console.log(React);
// console.log(ReactDOM);

Date.prototype.daysInMonth = function() {
    return 33 - new Date(this.getFullYear(), this.getMonth(), 33).getDate();
};

var theDate = new Date();

console.log(theDate);
console.log(theDate.getMonth());
console.log(theDate.daysInMonth());
console.log(theDate.getDay());
console.log(theDate);



var mySlogans = [
    {
        author: 'Blackie',
        text: 'Wasp da best',
        bigText: 'do you know what is like... heaven`s hung in black',
    },
    {
        author: 'Kurt',
        text: 'sit and drink pennyroyal tea',
        bigText: 'Sit and drink Pennyroyal Tea\n' +
        'Distill the life that\'s inside of me\n' +
        'Sit and drink Pennyroyal Tea\n' +
        'I\'m anemic royalty',
    },
    {
        author: 'Iggy',
        text: 'its all messed up!',
        bigText: 'its all messed up!... and now i wonna... so come on',
    }
];

// mySlogans = '';

var App = React.createClass({
    render: function() {
        return (
        <div className={'parent-block'}>
            <Mover name={'I AM MOVER'}/>
            <Mover name={'I AM MOVER TOO'}/>
        </div>
    );
    }
});


var Mover = React.createClass({

    getInitialState: function() {
        return {
            left: 0,
            up: 0,
            direction: 'Right'
        };
    },

    componentDidMount() {
        this.interval = setInterval(() => this.tick(), 50);
    },

    tick() {
        if (this.state.direction == 'Right') {
            this.setState(prevState => ({
                left: prevState.left + 1
            }));
        }
        else {
            if (this.state.direction == 'Left') {
                this.setState(prevState => ({
                    left: prevState.left - 1
                }));
            }
            else {
                if (this.state.direction == 'Up') {
                    this.setState(prevState => ({
                        up: prevState.up - 1
                    }));
                }
                else {
                    if (this.state.direction == 'Down') {
                        this.setState(prevState => ({
                            up: prevState.up + 1
                        }));
                    }
                }
            }
        }
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
                    margin: "20px"
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