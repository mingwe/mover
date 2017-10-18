// console.log(React);
// console.log(ReactDOM);

var myNews = [
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
    }
];

var App = React.createClass({
    render: function() {
        return (
            <div className="testCSS">
                im App!
                <News slogans={myNews}/> {/*data added*/}
                <Comments/>
            </div>
         );
    }
});

var News = React.createClass({
    render: function() {

        var slogans = this.props.slogans;
        var slogansTemplate = slogans.map(function (item, index) {
            return (
              <div key={index}>
                <details>
                    <summary className="slogan__author">
                        {item.author}:
                    </summary>
                    <p className="slogan__text">{item.text}</p>
                </details>
              </div>
            )
        })

        return (
            <div className="news">
                {slogansTemplate}
            </div>
        );
    }
});

var Comments = React.createClass({
    render: function() {
        return (
          <div className="comment">Нет новостей - комментировать нечего.</div>
        );
    }
})

ReactDOM.render(
    <App />,document.getElementById('root')
);