import React, { useState } from 'react'
import Rating from '@material-ui/lab/Rating'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import {
  SortingState,
  IntegratedSorting,
  PagingState,
  IntegratedPaging,
  SearchState,
  IntegratedFiltering,
} from '@devexpress/dx-react-grid'
import {
  Grid,
  Table,
  TableHeaderRow,
  TableFixedColumns,
  PagingPanel,
  SearchPanel,
  Toolbar,
} from '@devexpress/dx-react-grid-material-ui'

import { data } from './data'

export default function GraphicDesign() {
  const [columns] = useState([
    {
      title: 'Avatar',
      name: 'imageUrl',
      getCellValue: rowData => (
        <img
          src={rowData.imageUrl}
          alt="avatar"
          style={{ width: 40, borderRadius: '50%' }}
        />
      ),
    },
    { title: 'First Name', name: 'firstname' },
    { title: 'Last Name', name: 'lastname' },
    {
      title: 'Rate Charge',
      name: 'rateCharge',
      getCellValue: rowData => (
        <p style={{ color: 'green' }}>{rowData.rateCharge}</p>
      ),
    },
    {
      title: 'Skill Levels',
      name: 'levels',
      getCellValue: rowData => (
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
      getCellValue: () => (
        <Button variant="contained" color="primary">
          Link
        </Button>
      ),
    },
  ])
  const [rows] = useState(data)

  const [leftColumns] = useState(['imageUrl'])
  const [pageSizes] = useState([5, 10, 15, 0])
  const [tableColumnExtensions] = useState([
    { columnName: 'levels', width: 140 },
  ])

  return (
    <Paper>
      <Grid rows={rows} columns={columns}>
        <SearchState />
        <IntegratedFiltering />
        <PagingState defaultCurrentPage={0} pageSize={5} />
        <IntegratedPaging />
        <SortingState defaultSorting={[columns]} />
        <IntegratedSorting />
        <Table columnExtensions={tableColumnExtensions} />
        <TableHeaderRow showSortingControls />
        <PagingPanel pageSizes={pageSizes} />
        <TableFixedColumns leftColumns={leftColumns} />
        <Toolbar />
        <SearchPanel />
      </Grid>
    </Paper>
  )
}
