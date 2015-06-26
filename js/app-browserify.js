"use strict";

// es5 polyfills, powered by es5-shim
require("es5-shim")
// es6 polyfills, powered by babel
require("babel/register")

import {Promise} from 'es6-promise'
import React , {Component} from 'react'
import _ from 'underscore'

class Slanted extends Component {
	Constructor(...p){
		super(...p)
		this.state = {
			images: [],
			scroll: 0
		}
		var image_urls [
			'http://s3.amazonaws.com/rapgenius/grey-goose-lineup2.jpg',
			'http://www.bearhandsart.com/wp-content/uploads/2012/05/the-scream.jpg'
		]
		var temp = Array(10).join(',-').split('-')
		len = image_urls.length
		this.state.images = temp.map(() => image_urls[Math.floor(Math.random()*len)])
		this._setScroll = _.debounce((e) => {
			this.setState({
				scroll: Math.floor(window.scrollY)
			})
		},16)
	}
	componentDidMount(){
		window.addEventListener('scroll', this._setScroll)
	}
	componentDidUnMount(){
		window.removeEventListener('scroll', this._setScroll)
	}
	render(){
		return (<ul className="slanted">
			{ this.state.images.map((url) => <SlantedImage src={url} scroll={this.state.scroll} />)}    		 
    	</ul>)
	}	
}

class SlantedImage extends Component {
	constructor(...p){
		super(...p)
	}
	render(){
		//console.log(this.props.scroll)
		var style = {
			backgroundImage: 'url(${this.props.src})',
			backgroundPosition: 'center ${.5 - this.props.scroll/400)*100}%'
		}
		return(<li style={style}></li>)
			//<img src={this.props.src} style={style}/>
	}
}

React.render(<Slanted />, document.querySelector('.container'))