import React, { useRef, useState } from "react"

interface IPrinter {
  id: number,
  title: string,
  buildVolume: string,
  layerHeight: string,
  maxTravelSpeed: string,
  maxTemperatures: string,
  controller: string,
  filamentDiameter: string,
  diyKit: boolean,
  builtPrinter: boolean,
}

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

function Table({data}: {data: IPrinter[]}) {
  const [visibleParams, setVisibleParams] = useState(Array(keyValuePairs.length).fill(true))
  const [printers, setPrinters] = useState(data)
  const searchInput = useRef(null)
  const [requiredDiy, setRequiredDiy] = useState(false)
  const [requiredBuilt, setRequiredBuilt] = useState(false)


  const createToggleParams = (index: number) => () => {
    const newArray = [...visibleParams]
    newArray[index] = !visibleParams[index]
    setVisibleParams(newArray)
  }

  const fetchSearchedPrinters = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log(searchInput.current.value)
    const res = await fetch(`http://localhost:8000/api/list?search=${searchInput.current.value}`)
    const {data} = await res.json()
    setPrinters(data)
  }

  const getFilteredPrinters = () => {
    return printers
      .filter(printer => !requiredDiy || printer['diyKit'])
      .filter(printer => !requiredBuilt || printer['builtPrinter'])
  }

  const filteredPrinters = getFilteredPrinters()

  return (
   <div>
     <form onSubmit={fetchSearchedPrinters}>
      <input type="text" ref={searchInput}/>
      <input type="submit" value="search"/>
     </form>
     <table>
      <thead>
        <tr>
          <th></th>
          {filteredPrinters.map(printer => (
            <th key={printer.id}>{printer.title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {keyValuePairs.map((pair, index) => (
          visibleParams[index] && (
            <tr key={pair.key}> 
            <th>{pair.value} <p onClick={createToggleParams(index)}>ahoj</p></th>
            {filteredPrinters.map(printer => (
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
     <div>
       <input type="checkbox" checked={requiredDiy} onClick={() => setRequiredDiy(!requiredDiy)} /> DIY
       <input type="checkbox" checked={requiredBuilt} onClick={() => setRequiredBuilt(!requiredBuilt)} /> Built
     </div>
   </div>
  )
}

export async function getServerSideProps() {
  // TODO: the port should not be hardcoded
  const res = await fetch('http://localhost:8000/api/list')
  const printers = await res.json()

  return { props: printers }
}

export default Table
