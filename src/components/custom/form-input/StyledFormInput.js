import styled from 'styled-components'

export const Container = styled.div`
  position: relative;
`

export const Label = styled.label`
  color: ${props => (props.label_length ? 'black' : 'grey')};
  font-size: ${props => (props.label_length ? '12px' : '16px')};
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 5px;
  top: ${props => (props.label_length ? '-14px' : '10px')};
  -webkit-transition: 300ms ease all;
  transition: 300ms ease all;
`

export const Input = styled.input`
  background: none;
  background-color: white;
  color: grey;
  font-size: 18px;
  padding: 10px 10px 10px 5px;
  display: block;
  width: 100%;
  border: none;
  border-radius: 0;
  border-bottom: 1px solid grey;
  margin: 25px 0;
  letter-spacing: ${props => props.type === 'password' && '0.3em'};

  &:focus {
    outline: none;
  }

  &:focus ~ ${Label} {
    top: -14px;
    font-size: 12px;
    color: black;
  }
`
