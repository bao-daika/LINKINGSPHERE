import styled from 'styled-components'

export const Container = styled.button`
  min-width: 165px;
  width: auto;
  height: 50px;
  letter-spacing: 0.5px;
  line-height: 50px;
  padding: 0px auto;
  font-size: 15px;
  background-color: ${props => (props.second_button ? '#4285f4' : 'black')};
  color: white;
  text-transform: uppercase;
  font-family: 'Open Sans Condensed';
  font-weight: bolder;
  border: none;
  cursor: pointer;
  margin: auto;

  &:hover {
    background-color: white;
    color: black;
    border: : 1px solid black;
  }
`
