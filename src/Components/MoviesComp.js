import React, { Component } from 'react'
import css from "./MoviesComp.module.css";
import axios from "axios";

export default class MoviesComp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            movieArray:[]
        }
    }
    componentDidMount(){
        axios.get("https://www.omdbapi.com/?apikey=45f0782a&s=war")
        .then(response=>{
            this.setState({movieArray:response.data})

        })
        .catch(err=>{
            console.log(err.message)
        })
    }
    handleChange=(e)=>{
        console.log(e.target.value) 
        let title = e.target.value;
        axios.get(`https://www.omdbapi.com/?apikey=45f0782a&s=${title===""?"war":title}`)
        .then(response=>{
            this.setState({movieArray:response.data})
        })
        .catch(err=>{
            console.log(err.message)
        })    
    }
    render() {
        console.log(this.state.movieArray)
        let {Search} = this.state.movieArray;
        console.log(Search)
        return (
            <div>
                <div id="input-wrapper">
                    <h1>Movie Search Website </h1>
                    <input onChange={this.handleChange} type="text" placeholder="Search for Movie Title" id={css.input}/>
                </div>
                <div id={css.container}>
                {Search !== undefined ? Search.map((item,pos)=>{ 
                    return <article key={`${item.imdbID}${pos}`} className={css.card}>
                                <img src={item.Poster} alt="movieImage"/>
                                <p>{item.Title}</p>
                            </article>
                }): <h3>Sorry Movie Not Found...<br/>Enter a Valid Name please..!</h3> }
                </div> 
                <footer>
                    Copyright @2021<br/>Creator - Harshal Hiratkar<br/>
                    <a href="#"><i className="fab fa-linkedin-in"></i></a>
                    <a href="#"><i className="fab fa-codepen"></i></a>
                    <a href="#"><i className="fab fa-github"></i></a>
                </footer>
            </div>
        )
    }
}
