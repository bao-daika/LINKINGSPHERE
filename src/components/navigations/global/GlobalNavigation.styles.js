import React from 'react'
import styled from 'styled-components'

import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { Link } from 'react-router-dom'

export const StyledMenu = styled(({ className, ...props }) => (
  <Menu {...props} classes={{ paper: className }} />
))`
  box-shadow: none;
  border: 1px solid #d3d4d5;

  li {
    padding-top: 8px;
    padding-bottom: 8px;
    color: black;
  }

  top: 190px !important;
  left: ${props => (props.id === 'menu' ? '10px' : 'unset')} !important;
  right: ${props => (props.id === 'profile' ? '10px' : 'unset')} !important;
`

export const StyledMenuItem = styled(MenuItem)`
  font-size: 20px;
`
export const StyledLink = styled(Link)`
  color: white;

  &:hover {
    text-decoration: none;
    color: white;
  }
`
