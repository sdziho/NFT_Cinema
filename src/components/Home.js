import React from 'react';
import styled from 'styled-components';
import { Button, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Buy } from './Buy';

const Wrap= styled.div`
    img {
        width:100%;
        height:500px;
        object-fit:cover;
    }
    .img-fluid{
        margin: 1em 1em 1em 0;
        max-height: 300px;
    }
    .text-container{
        max-height: 300px;
        margin: 1em 0 1em 0;
    }
    .row{
        background-color: #F0F0F0;
        margin: 1rem;
    }
    .row:hover{
            background-color: #cccccc;
        
    }
`

export class Home extends React.Component{
    render(){
        return(
            <Wrap name="hah">
                <div class="container">
                <Carousel>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src="https://www.highlandernews.org/wp-content/uploads/radar.inception.warnerbrospictures.jpg"
                        alt="First slide"
                        />
                        <Carousel.Caption>
                        <h3>Inception</h3>
                        <p>Buy NFT ticket now</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src="https://s3.amazonaws.com/static.rogerebert.com/uploads/review/primary_image/reviews/great-movie-the-silence-of-the-lambs-1991/SIlence-Lambs-image.jpg"
                        alt="Second slide"
                        />

                        <Carousel.Caption>
                        <h3>The Silence of the Lambs</h3>
                        <p>Buy NFT ticket now</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src="https://i.ytimg.com/vi/YF1eYbfbH5k/maxresdefault.jpg"
                        alt="Third slide"
                        
                        />

                        <Carousel.Caption>
                        <h3>Interstellar</h3>
                        <p>Buy NFT ticket now</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
                
                <div class="row">
                    <div  class="col-lg-5 ">
                        <div class="image-container">
                            <img class="img-fluid" src="https://www.highlandernews.org/wp-content/uploads/radar.inception.warnerbrospictures.jpg" alt="alternative"/>
                        </div> 
                    </div> 
                    <div id="element" class="col-lg-7 ">
                        <div class="text-container">
                            <h2>INCEPTION</h2>
                            <p>
                            A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.
                            </p>
                            <Link to={{pathname: "/buy",state:{move:"a"}}}><Button>BUY NFT TICKET NOW</Button></Link>
                        </div>
                    </div> 
                </div>
                <div class="row">
                    <div class="col-lg-5 ">
                        <div class="image-container">
                            <img class="img-fluid" src="https://s3.amazonaws.com/static.rogerebert.com/uploads/review/primary_image/reviews/great-movie-the-silence-of-the-lambs-1991/SIlence-Lambs-image.jpg"/>
                        </div> 
                    </div> 
                    <div id="element" class="col-lg-7 ">
                        <div class="text-container">
                            <h2>THE SILENCE OF THE LAMBS</h2>
                            <p>
                            A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.
                            </p>
                            
                            <Link to={{pathname: "/buy",state:{move:"a"}}}><Button>BUY NFT TICKET NOW</Button></Link>
                        </div>
                    </div> 
                </div>
                <div class="row">
                    <div class="col-lg-5 ">
                        <div class="image-container">
                            <img class="img-fluid" src="https://i.ytimg.com/vi/YF1eYbfbH5k/maxresdefault.jpg" alt="alternative"/>
                        </div> 
                    </div> 
                    <div class="col-lg-7 ">
                        <div class="text-container">
                            <h2>INTERSTELLAR</h2>
                            <p>
                            A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.
                            </p>
                            <Link to={{pathname: "/buy",state:{move:"a"}}}><Button>BUY NFT TICKET NOW</Button></Link>
                        </div>
                    </div> 
                </div>
                </div>
                
                
            
            </Wrap>
        );
    }
}