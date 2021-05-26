import React, { useState } from "react"
import { IPrinter } from "../pages"


const keyValuePairs: {key: string, value: string}[] = [
  {
    key: "buildVolume",
    value:  "Build volume"
  },
  {
    key: "layerHeight",
    value: "Layer height"
  },
  {
    key: "maxTravelSpeed",
    value: "Max travel speed"
  },
  {
    key: "maxTemperatures", 
    value: "Max temperatures"
  },
  {
    key: "controller",
    value: "Controller"
  },
  {
    key: "filamentDiameter",
    value: "Filament diameter"
  },
]

function PrusaTable({printers}: {printers: IPrinter[]}) {
  const [visibleParams, setVisibleParams] = useState(Array(keyValuePairs.length).fill(true))

  const createToggleParams = (index: number) => () => {
    const newArray = [...visibleParams]
    newArray[index] = !visibleParams[index]
    setVisibleParams(newArray)
  }

  return (
    <div>
        <table>
        <thead>
            <tr>
            <th></th>
            {printers.map(printer => (
                <th key={printer.id}>{printer.title}</th>
            ))}
            </tr>
        </thead>
        <tbody>
            {keyValuePairs.map((pair, index) => (
            visibleParams[index] && (
                <tr key={pair.key}> 
                <th>{pair.value} <p onClick={createToggleParams(index)}>ahoj</p></th>
                {printers.map(printer => (
                <td key={printer.id}>{printer[pair.key]}</td>
                ))}
                </tr>
            )
            ))}
        </tbody>
        </table>
        {keyValuePairs.map((pair, index) => (
        !visibleParams[index] && 
        <div onClick={createToggleParams(index)}>{pair.value}</div>
        ))}
    </div>
  )
}

export default PrusaTable
