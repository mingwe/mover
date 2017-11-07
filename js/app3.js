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
            {/*<div className="testCSS">*/}
        {/*<h3>They say...</h3>*/}
        {/*<Quotes slogans={mySlogans}/>*/}
        {/*</div>*/}

        <div className={'parent-block'}>
            <Mover>HEY</Mover>
        </div>
    );
    }
});


var Quotes = React.createClass({

    propTypes: {
        slogans: React.PropTypes.array.isRequired
    },

    render: function() {

        var slogans = this.props.slogans;
        var slogansTemplate;


        if (slogans.length > 0) {
            slogansTemplate = slogans.map(function (item, index) {
                return (
                    <div key={index}>
                        <Article slogans={item}/>
                    </div>
                )
            })
        }
        else {
            slogansTemplate = <p>We have nothing to say.</p>
        }


        // console.log(slogansTemplate);

        return (
            <div className="qoutes">
                {slogansTemplate}
                <p className={'slogans__cont ' + (slogans.length > 0 ? 'countEnabled':'hidden')}><strong>Total slogans: {slogans.length}</strong></p>
            </div>
        );
    }
});

var Article = React.createClass({

    propTypes: {
        slogans: React.PropTypes.shape({
            author: React.PropTypes.string.isRequired,
            text: React.PropTypes.string.isRequired,
            bigText: React.PropTypes.string.isRequired
        })
    },

    getInitialState: function() {
        return {
            visible: false,
            rating: 0,
            popularity: 'low'
        };
    },

    readmoreClick: function(e) {
        e.preventDefault();
        this.setState({
            visible: true,
            rating: 1337,
            popularity: 'high'
        });
    },

    render: function() {

        var author = this.props.slogans.author,
            text = this.props.slogans.text,
            bigText = this.props.slogans.bigText,
            visible = this.state.visible;

        console.log('render', this);

        return (
            <details>
                <summary className="slogan__author">{author}:</summary>
                <p className="slogan__text">{text}</p>
                <a href="#" onClick={this.readmoreClick} className={'slogan__readmore ' + (visible ? 'hidden' : '')}>Read more...</a>
                <p className={'slogan__big-text ' + (visible ? '': 'hidden')}>{bigText}</p>
            </details>
        )
    }
});

ReactDOM.render(
    <App />,document.getElementById('root')
);