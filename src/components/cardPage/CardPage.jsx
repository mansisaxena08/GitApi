import React from 'react';
// import TextField from '@material-ui/core/TextField';
// import Button from '@material-ui/core/Button';
import axios from 'axios';
// import List from '@material-ui/core/List';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';

export default class CardPage extends React.Component {
    constructor(props) {
        super(props);
        console.log('from the card',props);
        this.state = {
            profile: props.data.login,
            avatarpic: props.data.avatar_url,
            followers: props.data.followers_url,
            following: props.data.following_url,
            repos: props.data.repos_url,
            followersCount: null,
            followingCount: null,
            reposCount: null
        };
    }
    componentDidUpdate(prevProps) {
        if (this.props.data !== prevProps.data) {
          this.setState({profile: this.props.data.login, 
            avatarpic: this.props.data.avatar_url,
            followers: this.props.data.followers_url,
            following: this.props.data.following_url,
            repos: this.props.data.repos_url,
            followersCount: null,
            followingCount: null,
            reposCount: null
            });
        }
    }

    handleFetchFollowers = (e) => {
        axios.get(this.state.followers).then((res) => {
            console.log('followers', res.data);
            this.setState({followersCount: res.data.length})
        })
    }
    handleFetchFollowing = (e) => {
        const url = this.state.following;
        axios.get(url.slice(0,url.length-13)).then((res) => {
            console.log('following', res.data);
            this.setState({followingCount: res.data.length})
        })
    }
    handleFetchRepos = (e) => {
        axios.get(this.state.repos).then((res) => {
            console.log('repos', res.data);
            this.setState({reposCount: res.data.length})
        })
    }
    
    render() {
        // console.log('from card',this.state)
        return (
            <div style={{marginTop: '3%'}}>
                <Card style={{background: 'lightgrey', width: '35%', marginLeft:'32%', marginBottom: '10px'  }}>
                    <CardContent>
                    <img src={this.state.avatarpic} alt='user pic' width="200px" height="200px" />
                        <Typography color="initial" variant="h6" gutterBottom>
                            Profile Name :  {this.state.profile}                          
                        </Typography>
                        <CardActions>
                            <div>
                            <Button color="primary" variant="contained" onClick={this.handleFetchFollowers} style={{marginLeft:'1%'}}> 
                                    followers                         
                                </Button>
                                {this.state.followersCount!==null && <Typography variant="subtitle1" gutterBottom>
                                    {this.state.followersCount}                        
                                </Typography>}
                            
                            </div>
                            <div>
                                <Button color="primary" variant="contained" onClick={this.handleFetchFollowing}  style={{marginLeft:'1%'}}>
                                    following                      
                                </Button>
                                {this.state.followingCount!==null && <Typography variant="subtitle1" gutterBottom>
                                    {this.state.followingCount}                        
                                </Typography>}
                            </div>
                            <div>
                                <Button color="secondary" variant="contained" onClick={this.handleFetchRepos} style={{marginLeft:'1%'}}> 
                                    repositories                     
                                </Button>
                                {this.state.reposCount!==null && <Typography variant="subtitle1" gutterBottom>
                                    {this.state.reposCount}                        
                                </Typography>}
                            </div>
                        </CardActions>
                    </CardContent>
                </Card>
            </div>
        )
    }
}