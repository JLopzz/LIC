import React from 'react';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';

/* <CustomCard
  name='Usuario Aleatorio'
  detail='Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci, dolor laborum! Ipsum temporibus culpa rem!'
  url='./foo/data'
/> */

const classes={
  card:{
    backgroundColor:'var(--second)',
    borderRadius:'10px',
    marginTop:'2%',
    marginBottom:'2%'
  },
  cardHover:{
    backgroundColor:'#d8d6d6',
    borderRadius:'10px',
    marginTop:'2%',
    marginBottom:'2%',
  },
  img:{
    width:'100%',
    border:'solid 2px var(--first-dark)',
    maxHeight:'300px'
  },
  title:{
    color:'var(--first)',
    fontSize:'2rem'
  },
  lightText:{
    color:'var(--first)',
  }
}

export default function CustomCard(props) {

  const [ style, setStyle ] = React.useState(classes.card);

  var styleHandler = a =>{
    a? setStyle(classes.cardHover) : setStyle(classes.card)
  }

  return(
    <Card style={style} className="text-center" onMouseEnter={e=>styleHandler(true)} onMouseLeave={e=>styleHandler(false)}>
      <Card.Body>
        <Image src={props.url} alt={props.name} roundedCircle style={classes.img}/>
        <Card.Title style={classes.title}>{props.name}</Card.Title>
        <Card.Text style={classes.lightText}>{props.detail}</Card.Text>
      </Card.Body>
    </Card>
  )
}