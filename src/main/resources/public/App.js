import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class App extends React.Component {
	constructor(props) {
	      super(props);
	      this.addResult = this.addResult.bind(this);
	      this.deleteResult = this.deleteResult.bind(this);
	      this.editResult = this.editResult.bind(this);
	      this.handleSubmit = this.handleSubmit.bind(this); 
	      this.handleChange = this.handleChange.bind(this);  
	      this.submitEdit = this.submitEdit.bind(this);
	      this.onChangePlace = this.onChangePlace.bind(this);
	      this.onChangeDate = this.onChangeDate.bind(this);
	      this.onChangePoints = this.onChangePoints.bind(this);
	      this.onChangePlacement = this.onChangePlacement.bind(this);
	

	      this.state = {
	          results: [],
	          editResult: false,
	          place: '',
	          date: '',
	          points: '',
	          placement: '',
	          href: ''
	      };
	      


	      
	   }
	
	
	
	  componentDidMount() {
		    this.loadResults();
		  }
	  
	  
	  onChangePlace(e) {
	        this.setState({place: e.target.value});
	    }
	  onChangeDate(e) {
	        this.setState({date: e.target.value});
	    }
	  onChangePoints(e) {
	        this.setState({points: e.target.value});
	    }
	  onChangePlacement(e) {
	        this.setState({placement: e.target.value});
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
	  
	   handleChange(event) {
	        this.setState(
	            {[event.target.name]: event.target.value}
	        );
	    }    
	
	
	  deleteResult(result) {
	      fetch (result._links.self.href,
	      { method: 'DELETE', 
	        credentials: 'same-origin'})
	      .then( 
	          res => this.loadResults()
	      )
	      
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
	  
	  
	    submitEdit(result){
	    	result.preventDefault();
	        fetch(this.state.href, {
	            method: 'PUT',
	            credentials: 'same-origin',
	            headers: {
	                'Content-Type': 'application/json',
	            },
	            body: JSON.stringify({
	                place: this.state.place,
	                date: this.state.date,
	                points: this.state.points,
	                placement: this.state.placement
	            })
	        }).then(
                res => this.loadResults()
            )
                .catch(err => console.error(err))
            this.setState({editResult: false});
            this.refs.placeInput.value='';
            this.refs.dateInput.value='';
            this.refs.pointsInput.value='';
            this.refs.placementInput.value='';
	             
	         
	    }
	    
		  editResult(result){
			  this.setState({
				editResult: true,
				place: result.place,
				date: result.date,
				points: result.points,
				placement: result.placement,
				href: result._links.self.href
			  })
			  
		  }
	    
	    handleSubmit(event) {
	        event.preventDefault();
	        var newResult = {
	        		place: this.state.place, 
	        		date: this.state.date, 
	        		points: this.state.points,
	        		placement: this.state.placement
	        		};
	        
	    
	        this.addResult(newResult);
	        
	        this.refs.placeInput.value='';
	        this.refs.dateInput.value='';
	        this.refs.pointsInput.value='';
	        this.refs.placementInput.value='';
	           
	    }

		
	  
	  
	  
	  render() {
		    return (
		       <div>
		          <ResultsTable deleteResult={this.deleteResult} editResult={this.editResult}  results={this.state.results}/> 
		          <div>
		            
	                <div className="panel panel-default">
	                <div className="panel-heading">Lisää tapahtuma</div>
	                <div className="panel-body">
	     {!this.state.editResult ?
	                <form onSubmit={this.handleSubmit}>
	                    <div className="col-md-4">
	                        <input type="text" placeholder="Paikka" name="place" className="form-control"  ref="placeInput" onChange={this.handleChange}/>    
	                    </div>
	                    <div className="col-md-4">
	                        <input type="date" placeholder="Päivämäärä" name="date" className="form-control" ref="dateInput" onChange={this.handleChange}/>
	                    </div>
	                    <div className="col-md-2">
	                        <input type="number" min="1" max="60" placeholder="Pisteet" name="points" className="form-control" ref="pointsInput" onChange={this.handleChange}/>
	                    </div>
	                        <div className="col-md-2">
	                        <input type="text" placeholder="Sijoitus" name="placement" className="form-control" ref="placementInput" onChange={this.handleChange}/>
	                    </div>
	                    <div className="col-md-2">
	                        <button className="btn btn-primary" onClick={this.handleSubmit}>Tallenna</button>   
	                    </div>       
	                </form>
	                :
	                <form onSubmit={this.submitEdit}>
	                <div className="col-md-4">
	                    <input type="text" value={this.state.place} className="form-control" name="place"  ref="placeInput" onChange={this.onChangePlace}/>    
	                </div>
	                    
	                <div className="col-md-4">
	                    <input type="date"  value={this.state.date} className="form-control" name="date" ref="dateInput" onChange={this.onChangeDate}/>
	                </div>
	                    
	                <div className="col-md-2">
	                    <input type="number" min="1" max="60" value={this.state.points} name="points"  className="form-control" ref="pointsInput" onChange={this.onChangePoints}/>
	                </div>
	                    
	                <div className="col-md-2">
	                    <input type="text"  value={this.state.placement} className="form-control" name="placement" ref="placementInput" onChange={this.onChangePlacement}/>
	                </div>
	                    
	                <div className="col-md-2">
	                    <button className="btn btn-primary" onClick={this.submitEdit}>Tallenna</button>   
	                </div>       
	            </form>
	    }
	                </div>      
	                </div>
	    
	        
	          </div>   
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
        <Result key={result._links.self.href} result={result}  deleteResult={this.props.deleteResult} 
        editResult={this.props.editResult}/>
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
        this.editResult = this.editResult.bind(this);
    }

    deleteResult() {
        this.props.deleteResult(this.props.result);
        
    } 
    
    editResult() {
    	 this.props.editResult(this.props.result);
    	
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
                <button className="btn btn-info btn-xs" onClick={this.editResult}>Edit</button>
            </td>
          </tr>
        );
    } 
}



ReactDOM.render(<App />, document.getElementById('root') );


