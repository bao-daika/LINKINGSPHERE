import styled from 'styled-components'

export const Container = styled.div`
  width: 380px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  margin: 30px auto;
  text-align: center;
  justify-content: space-between;

  .buttons {
    display: flex;
    justify-content: space-between;
  }
`
