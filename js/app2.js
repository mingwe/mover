var myMonth = [
    {
        name: 'Jan'
    },
    {
        name: 'Feb'
    },
    {
        name: 'Mar'
    },
    {
        name: 'Apr'
    },
    {
        name: 'May'
    },
    {
        name: 'Jun'
    },
    {
        name: 'Jul'
    },
    {
        name: 'Aug'
    },
    {
        name: 'Sept'
    },
    {
        name: 'Oct'
    },
    {
        name: 'Nov'
    },
    {
        name: 'Dec'
    }

];

var App = React.createClass({
    render: function() {
        return (
            <div className="calendar">
                <Month monthnums={myMonth}/>
                <CalBody>
                    {/*<Quotes slogans={mySlogans}/>*/}
                </CalBody>
            </div>
        );
    }
});

var CalBody = React.createClass({
   render: function() {
       return (
           <p>here will be calendar body</p>
       )
   }
});

var Month = React.createClass({


   render: function() {

       var monthnums = this.props.monthnums;

       var monthTemp = monthnums.map(function (item, index) {
           return (
               <div key={index}>
                   {item}
               </div>
           )
       });

       console.log(monthTemp);

       return (
           // console.log(monthTemp);
           // console.log(monthnums);
           <div className='months'>
               <h3>Month</h3>
               {/*<div>{monthTemp}</div>*/}
           </div>
       )
   }
});

ReactDOM.render(
    <App />,document.getElementById('root')
);