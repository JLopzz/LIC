import React from "react";
import CustomCard from './parts/cardUs';
import { Separator } from "./parts";
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card'

export default function About() {
  return (
    <>
      <Separator title="Desarrolladores" />
      <div className='container'>
        <div className='row justify-content-center'>

          <div className='col-sm-10 col-md-6 col-lg-4'>
            <CustomCard
              name='Luis Brayan Martínez L.'
              detail='Estudiante Destacado del programa PILET, graduado de técnico en Comutación, actualmente estudiante de la carrera de Ingeniería en Ciencias de la Computación en la Universidad Don Bosco.'
              url='./resources/Brayan.png'
            />
          </div>
          <div className='col-sm-10 col-md-6 col-lg-4'>
            <CustomCard
              name='Gerardo J. López F.'
              detail='Nacido el 15de marzo de 1998. Graduado de Técnico  en Contaduría Pública del Centro Escolar Católico Alberto Masferrer, estudió música en Instituto CanZion entre 2017 y 2019, actualmente estudiante de 3er año de la carrera de Ingeniería en Ciencias de la Computación en la Universidad Don Bosco.'
              url='./resources/Gerardo.png'
            />
          </div>

          <div className='col-sm-10 col-md-6 col-lg-4'>
            <CustomCard
              name='Josué Benjamín Jacobo Ortiz'
              detail='Nacido el 24 de Julio de 1997. Estudiante de 3er año en la carrera de Ingeniería en Computación en la Universidad Don Bosco. Graduado de educación media en Instituto Técnico Industrial en la opción de bachillerato técnico industrial opción en Desarrollo de Software.'
              url='./resources/Josue.png'
            />
          </div>
          <div className='col-sm-10 col-md-6 col-lg-4'>
            <CustomCard
              name='Edwin Josué Olmedo López'
              detail='Nacido el 01 de septiembre de 1995. Estudiente graduado en educación media en el Liceo Ladislao Leiva,y actualmente estudiando la carrera de Ingeniería en ciencia de la computación en la Universidad Don Bosco.'
              url='./resources/Edwin.png'
            />
          </div>
          <div className='col-sm-10 col-md-6 col-lg-4'>
            <CustomCard
              name='Luis Felipe Coto Arias'
              detail='Nacido el 14 de junio del año 2000. Estudiante graduado de el colegio Externado de San José, y actual estudiante de Ingeniería en Computación en la Universidad Don Bosco.'
              url='./resources/Coto.png'
            />
          </div>
        </div>
      </div>
      <Separator title="Mapa del Sitio" />
      <Accordion className='text-center'>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="0">
            Inicio
          </Accordion.Toggle>
          <Accordion.Toggle as={Card.Header} eventKey="1">
            Dulceria
          </Accordion.Toggle>
          <Accordion.Toggle as={Card.Header} eventKey="2">
            Exhibiendose (Haz click)
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="2">
            <Card.Body>
              <ul>
                <li>Rey León</li>
                <li>Ready or not</li>
                <li>Rapidos y furiosos H&S</li>
                <li>Historias de miedo para contare en la oscuridad</li>
                <li>Habia una vez en... Holliwood</li>
              </ul>
            </Card.Body>
          </Accordion.Collapse>
          <Accordion.Toggle as={Card.Header} eventKey="3">
            Estrenos (Haz click)
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="3">
            <Card.Body>
              <ul>
                <li>Metallica & San Francisco Symphony S&M2 (2019)</li>
                <li>Agente bajo fuego</li>
                <li>Inesperado</li>
                <li>Muñeco del mal</li>
                <li>La música de la vida</li>
              </ul>
            </Card.Body>
          </Accordion.Collapse>
          <Accordion.Toggle as={Card.Header} eventKey="6">
            Sobre Nosotros
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="6">
            <Card.Body>
              <ul>
                <li>Desarrolladores</li>
                <li>Mapa del sitio</li>
              </ul>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </>
  );
}
