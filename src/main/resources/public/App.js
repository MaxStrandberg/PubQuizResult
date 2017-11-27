import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class App extends React.Component {
	constructor(props) {
	      super(props);
	      this.addResult = this.addResult.bind(this);
	      this.deleteResult = this.deleteResult.bind(this);

	      this.state = {
	          results: [],
	      };
	   }
	
	  componentDidMount() {
		    this.loadResults();
		  }
	  
	  loadResults() {
	      fetch('http://localhost:8080/api/results', 
	      {credentials: 'same-origin'}) 
	      .then((response) => response.json()) 
	      .then((responseData) => { 
	          this.setState({ 
	              results: responseData._embedded.results, 
	          }); 
	      });
	  } 
	
	
	  deleteResult(result) {
	      fetch (result._links.self.href,
	      { method: 'DELETE', 
	        credentials: 'same-origin'})
	      .then( 
	          res => this.loadResults()
	      )
	      .then(() => { 
	          Alert.success('Student deleted', {
	            position: 'bottom-left',
	            effect: 'slide'
	          });
	      })
	      .catch( err => console.error(err))   
	  }  
	  
	  addResult(result) {
	      fetch('http://localhost:8080/api/results', 
	      {   method: 'POST', 
	          credentials: 'same-origin',
	          headers: {
	            'Content-Type': 'application/json',
	          },
	          body: JSON.stringify(result)
	      })
	      .then( 
	          res => this.loadResults()
	      )
	      .catch( err => cosole.error(err))
	  }
	  
	  render() {
		    return (
		       <div>
		          <ResultsTable deleteResult={this.deleteResult} results={this.state.results}/> 
		          <ResultForm addResult={this.addResult}/>
		       </div>
		    );
		  }  
}


class ResultsTable extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
    var results = this.props.results.map(result =>
        <Result key={result._links.self.href} result={result}  deleteResult={this.props.deleteResult}/>
    );

    return (
      <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Paikka</th><th>Päivämäärä</th><th>Pisteet</th><th>Sijoitus</th><th></th>
          </tr>
        </thead>
        <tbody>{results}</tbody>
      </table>
      </div>);
  }
}

class Result extends React.Component {
    constructor(props) {
        super(props);
        this.deleteResult = this.deleteResult.bind(this);
    }

    deleteResult() {
        this.props.deleteResult(this.props.result);
        
    } 

     render() {
        return (
          <tr>
            <td>{this.props.result.place}</td>
            <td>{this.props.result.date}</td>
            <td>{this.props.result.points}/60</td>
            <td>{this.props.result.placement}.</td>
            <td>               
                <button className="btn btn-danger btn-xs" onClick={this.deleteResult}>Delete</button>
            </td>
          </tr>
        );
    } 
}

class ResultForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {place: '', date: '', points: '', placement :''};
        this.handleSubmit = this.handleSubmit.bind(this);   
        this.handleChange = this.handleChange.bind(this);     
    }

    handleChange(event) {
        this.setState(
            {[event.target.name]: event.target.value}
        );
    }    
    
    handleSubmit(event) {
        event.preventDefault();
        var newResult = {place: this.state.place, date: this.state.date, points: this.state.points, placement: this.state.placement};
        this.props.addResult(newResult);    
           
    }
    
    render() {
        return (
          <div>
            
                <div className="panel panel-default">
                <div className="panel-heading">Lisää tapahtuma</div>
                <div className="panel-body">
                <form className="form">
                    <div className="col-md-4">
                        <input type="text" placeholder="Paikka" className="form-control"  name="place" onChange={this.handleChange}/>    
                    </div>
                    <div className="col-md-4">
                        <input type="date" placeholder="Päivämäärä" className="form-control" name="date" onChange={this.handleChange}/>
                    </div>
                    <div className="col-md-2">
                        <input type="number" min="1" max="60" placeholder="Pisteet" className="form-control" name="points" onChange={this.handleChange}/>
                    </div>
                        <div className="col-md-2">
                        <input type="text" placeholder="Sijoitus" className="form-control" name="placement" onChange={this.handleChange}/>
                    </div>
                    <div className="col-md-2">
                        <button className="btn btn-primary" onClick={this.handleSubmit}>Tallenna</button>   
                    </div>       
                </form>
                </div>      
                </div>
    
        
          </div>   
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root') );


