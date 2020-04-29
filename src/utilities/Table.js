import React, { Component } from 'react'
import MaterialTable from 'material-table'
import Rating from '@material-ui/lab/Rating'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import { Link } from 'react-router-dom'

let columns = [
  {
    title: 'Avatar',
    field: 'avatar',
    render: rowData => {
      console.log(rowData.avatarUrl)
      return (
        <div>
          <Avatar src={rowData.avatarUrl} title="avatar" />
        </div>
      )
    },
  },
  { title: 'Name', field: 'displayName' },
  { title: 'Email', field: 'email' },
  {
    title: 'Skill Levels',
    name: 'levels',
    render: rowData => (
      <Box
        style={{ marginBottom: 'auto' }}
        component="fieldset"
        mb={3}
        borderColor="transparent"
      >
        <Rating name="read-only" value={rowData.levels} readOnly />
      </Box>
    ),
  },
  {
    title: '',
    name: '',
    render: rowData => (
      <Link to={'/user/' + rowData.uid}>
        <Button variant="contained" color="primary">
          Link
        </Button>
      </Link>
    ),
  },
]
class Table extends Component {
  constructor() {
    super()
    this.state = {
      columns: [],
      data: [],
    }
  }

  componentDidMount() {
    if (this.props.data) {
      let data = this.props.data.map(doc => {
        return { ...doc.data(), id: doc.id }
      })
      console.log(data)
      this.setState({
        columns: columns,
        data: data,
      })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.data !== prevProps.data) {
      let data = this.props.data.map(doc => {
        return { ...doc.data() }
      })
      this.setState({
        data: data,
      })
    }
  }

  render() {
    return (
      <MaterialTable
        title="Editable Example"
        columns={this.state.columns}
        data={this.state.data}
      />
    )
  }
}

export default Table
