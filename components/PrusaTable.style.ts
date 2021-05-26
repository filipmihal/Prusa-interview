import styled from 'styled-components'

export const PrinterName = styled.th`
  color: #ed6b21;
  font-size: 16px;
  padding: 15px;
`

export const Table = styled.table`
  border-collapse: collapse;
  font-size: 14px;
  margin-top: 10px;

  tbody {
    tr {
      height: 30px;
      &:nth-of-type(2n) {
        background-color: #f5f5f5;
      }
    }
    th,
    td {
      padding: 15px 10px;
      border: 1px solid #dfe5eb;
    }
    td {
      width: 250px;
    }
    th {
      width: 200px;
      text-align: left;
    }
  }
`

export const ClickableElement = styled.span`
  cursor: pointer;
  margin-left: 4px;
`

export const HiddenParams = styled.div`
  margin-top: 15px;
`
export const ParamBtn = styled.button`
  cursor: pointer;
  background: #ed6b21;
  border-radius: 4px;
  border: none;
  color: white;
  padding: 4px 10px;
  font-size: 12px;
  margin-left: 5px;
`
