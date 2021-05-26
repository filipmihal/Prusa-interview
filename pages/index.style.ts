import styled from 'styled-components'

export const Layout = styled.div`
  margin-top: 100px;
  margin-left: 100px;
`

export const InputText = styled.input`
  line-height: 16px;
  font-size: 13px;
  border-radius: 4px;
  padding: 4px 8px;
  height: 32px;
  border: 1px solid rgb(214, 222, 230);
  &:focus {
    outline: none;
    border-color: rgb(171, 187, 202);
  }
`

export const InputBtn = styled.input`
  font-size: 14px;
  border-radius: 4px;
  background: #ed6b21;
  color: white;
  height: 32px;
  margin: 0px 5px;
  border: none;
  padding: 0px 20px;
  cursor: pointer;
  font-weight: 900;
`

export const CheckDiv = styled.div`
  margin-top: 20px;
  span {
    margin-right: 5px;
  }
`
