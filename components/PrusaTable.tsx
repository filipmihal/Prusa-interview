import { faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { IPrinter } from '../pages'
import { ClickableElement, HiddenParams, ParamBtn, PrinterName, Table } from './PrusaTable.style'

const keyValuePairs: { key: string; value: string }[] = [
  {
    key: 'buildVolume',
    value: 'Build volume',
  },
  {
    key: 'layerHeight',
    value: 'Layer height',
  },
  {
    key: 'maxTravelSpeed',
    value: 'Max travel speed',
  },
  {
    key: 'maxTemperatures',
    value: 'Max temperatures',
  },
  {
    key: 'controller',
    value: 'Controller',
  },
  {
    key: 'filamentDiameter',
    value: 'Filament diameter',
  },
]

function PrusaTable({ printers }: { printers: IPrinter[] }) {
  const [visibleParams, setVisibleParams] = useState(Array(keyValuePairs.length).fill(true))

  const createToggleParams = (index: number) => () => {
    const newArray = [...visibleParams]
    newArray[index] = !visibleParams[index]
    setVisibleParams(newArray)
  }

  const isAnythingHidden = visibleParams.includes(false)

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th></th>
            {printers.map((printer) => (
              <PrinterName key={printer.id}>{printer.title}</PrinterName>
            ))}
          </tr>
        </thead>
        <tbody>
          {keyValuePairs.map(
            (pair, index) =>
              visibleParams[index] && (
                <tr key={pair.key}>
                  <th>
                    {pair.value}
                    <ClickableElement>
                      <FontAwesomeIcon onClick={createToggleParams(index)} icon={faEye} />
                    </ClickableElement>
                  </th>
                  {printers.map((printer) => (
                    <td key={printer.id}>{printer[pair.key]}</td>
                  ))}
                </tr>
              ),
          )}
        </tbody>
      </Table>
      {isAnythingHidden && (
        <HiddenParams>
          <span>Hidden parameters:</span>
          {keyValuePairs.map(
            (pair, index) =>
              !visibleParams[index] && <ParamBtn onClick={createToggleParams(index)}>{pair.value}</ParamBtn>,
          )}
        </HiddenParams>
      )}
    </div>
  )
}

export default PrusaTable
