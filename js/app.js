// console.log(React);
// console.log(ReactDOM);

var mySlogans = [
    {
        author: 'Simon',
        text: 'Im doing breaking news'
    },
    {
        author: 'Blackie',
        text: 'Wasp da best'
    },
    {
        author: 'Kurt',
        text: 'sit and drink pennyroyal tea'
    },
    {
        author: 'Iggy',
        text: 'its all messed up!'
    }
];

// mySlogans = '';

var App = React.createClass({
    render: function() {
        return (
            <div className="testCSS">
                <h3>They say...</h3>
                <Quotes slogans={mySlogans}/>
            </div>
         );
    }
});

var Article = React.createClass({

   render: function() {

       var author = this.props.slogans.author,
           text = this.props.slogans.text;

       return (
           <details>
               <summary className="slogan__author">{author}:</summary>
               <p className="slogan__text">{text}</p>
           </details>
       )
   }
});

var Quotes = React.createClass({
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
                <p className={slogans.length > 0 ? 'countEnabled':'hidden'}><strong>Total slogans: {slogans.length}</strong></p>
            </div>
        );
    }
});

ReactDOM.render(
    <App />,document.getElementById('root')
);