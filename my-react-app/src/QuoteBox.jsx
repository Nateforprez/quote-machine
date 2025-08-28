import React, { Component } from 'react'; 

const quotesURL = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
//
class QuoteBox extends Component {

    constructor(props) {
        super(props); 
        this.handleClick = this.handleClick.bind(this);  
        this.generateColour = this.generateColour.bind(this); 
        this.fetchData = this.fetchData.bind(this); 
        this.state = {
            quote_index: 0, //Math.floor(Math.random() * this.state.quotes.length) 
            colour: this.generateColour(), 
            list_quotes: []
        }
    }

    handleClick() {
        var color = this.generateColour(); 
        this.setState({
            quote_index: Math.floor(Math.random() * this.state.list_quotes.length), 
            colour: color 
        }, () => {
            console.log(this.state.quote_index); 
            console.log(this.state.list_quotes.length); 
        }); 
    }

    generateColour() {
        var letters = '0123456789ABCDEF'; 
        var color = '#'; 
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];  
        }
        return color; 
    }

    async fetchData() {
        try {
            const res = await fetch(quotesURL); 
            const data = await res.json(); 
            const { quotes } = data; 
            this.setState({list_quotes: quotes}, () => {
                console.log(this.state.list_quotes); 
                this.handleClick(); 
            }); 
        } catch(err) {
            console.log("There was an error retrieving the data."); 
        }
    }
    componentDidMount() {
        this.fetchData(); 
    }
    render() {
        /**const mystyle = {
            backgroundColor: this.getRandomColour()
        }*/
        //const { quote, author } = this.state.quotes;  
        
        //console.log("this is all the quotes: " );
        //const { quotes } = this.state.quotes; 
        return (
            <div id="wrapper" style={{backgroundColor: this.state.colour, transition: "background-color 1s ease-in"}}>
                <header><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.0/css/all.min.css"></link></header>
                <div id="quote-box">
                    <div className="text-box" id="text-box" key={this.state.list_quotes[this.state.quote_index]?.quote}>
                        <h2 className="text" style={{color: this.state.colour}} id="text"><i style={{fontSize: '35px'}} class="fa-solid fa-quote-left"></i> {this.state.list_quotes[this.state.quote_index]?.quote || "Loading"}</h2>
                        <div id="author">
                            <h3 className="text" style={{color : this.state.colour}} id="author-name">- {this.state.list_quotes[this.state.quote_index]?.author}</h3>
                        </div>
                    </div>
                    <div id="bottom-bar">
                        <div id="bottom-bar-split">
                            <a id="tweet-quote" href="twitter.com/intent/tweet" target="_top">
                                <button className="btn" title="Tweet this Quote!" style={{backgroundColor: this.state.colour, transition: "background-color 1s ease-in"}} id="twitter-btn">
                                    <i className="fa-brands fa-twitter" style={{fontSize: '20px'}}></i>
                                </button>
                            </a>
                            <button className="btn" title="Post this quote on tumblr!" style={{backgroundColor: this.state.colour, transition: "background-color 1s ease-in"}} id="tumblr-btn"><i className="fa-brands fa-tumblr" style={{fontSize: '20px'}}></i></button>
                        </div>
                        <button className="btn" id="new-quote" onClick={this.handleClick} style={{backgroundColor: this.state.colour, fontSize: "13px", transition: "background-color 1s ease-in"}}>New Quote</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default QuoteBox