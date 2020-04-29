import React from 'react'
import List from '@material-ui/core/List'
import styled from 'styled-components'

import { Link } from 'react-router-dom'

export const StyledBar = styled.div`
  width: 100%;
  background: #3f51b5;
  color: white;
  display: flex;
  position: absolute;
`

export const StyledList = styled(({ className, ...props }) => (
  <List {...props} classes={{ padding: className }} />
))`
  background: #3f51b5;
  color: white;
  margin: 0 !important;
  padding: 0 !important;
`
export const StyledLink = styled(Link)`
  color: white;

  &:hover {
    text-decoration: none;
    color: white;
  }
`
