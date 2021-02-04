import styled from 'styled-components';


export const Header = styled.div`
display: flex;
width: 100%;
justify-content: space-between;

background-color: #1ED760;
padding: 30px 50px;

@media (max-width: 1400px) {
 display: grid;
 grid-template-areas: 
            "a b c"
            "d e f";
  > div {
  margin-bottom: 30px;
  }
}

@media (max-width: 950px) {

  grid-template-areas: 
            "a b"
            "c d"
            "e f";
 justify-content: space-around;

}

@media (max-width: 610px) {

  grid-template-areas: 
            "a"
            "b"
            "c"
            "d"
            "e"
            "f";
  justify-content: center;
  align-items: center;
}



> div {
  display: flex; 
  justify-content: center;
  align-items: center;
}
`

export const Content = styled.div`
display: flex;
flex-wrap: wrap;
padding: 40px;
justify-content: center;
align-items: center;


.imageTarget {
  &:hover {
    transform: scale(1.15);
    transition-duration: 200ms;
  }
}


.linkTarget {
  border-radius: 3px;
  text-align: center;
  background-color: #282828;
  &:hover {
    background-color: black;
    transition: 1s;
  }
}

> div {
  margin-left: 40px; 
  margin-bottom: 40px; 
  min-width: 345px;
  max-width: 345px;
  min-height: 320px;
  display: flex;
  flex-direction: column;
}

@media (max-width: 760px) {

> div {
  margin-left: 0;
}

}


`