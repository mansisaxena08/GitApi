import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import CardPage from '../cardPage/CardPage';

export default class LandingPage extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            search : '',
            searched: null,
            count: 0,
            apiData: []
        };
    }
    
    handleSearchText = (e) => {
        // console.log(e.target.value);
        this.setState({search: e.target.value});
    };
    
    
    handleSearchClick = async() => {
        const url = `https://api.github.com/users/${this.state.search}`;
        axios.get(url).then((res)=> {
            console.log(res.data);
            this.setState({apiData: res.data});
            this.setState({searched: true})
        })
       // const data = this.state.apiData;
        //await data.forEach(element => {
          //  if(element.login === this.state.search) {
            //    this.setState({searched: element});
           // }
       // });
       // console.log(this.state);
    };

   // componentDidMount () {
     //   const url = 'https://api.github.com/users';
       // axios.get(url).then((res)=> {
         //   console.log(res.data);
           // this.setState({apiData: res.data});
        //})
    //};

    render () {
        // console.log('render');
        return (
            <div >
                
                <div style={{marginTop:'2%'}}>
                <TextField id="standard-basic" label="GitHub username" onChange={this.handleSearchText} />
                <Button variant="contained" color="primary" onClick={this.handleSearchClick} style={{marginTop:'1%', marginLeft: '0.5%'}}>
                    Search
                </Button>
                {this.state.searched && <CardPage data={this.state.apiData}/>}      
                </div>
            </div>
        );
    }
};