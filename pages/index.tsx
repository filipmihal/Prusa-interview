import React, { useRef, useState } from "react"
import PrusaTable from "../components/PrusaTable"

export interface IPrinter {
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


function Table({data}: {data: IPrinter[]}) {
  const [printers, setPrinters] = useState(data)
  const searchInput = useRef(null)
  const [requiredDiy, setRequiredDiy] = useState(false)
  const [requiredBuilt, setRequiredBuilt] = useState(false)


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
     <PrusaTable printers={filteredPrinters}/>
     <div>
       <input type="checkbox" checked={requiredDiy} onChange={() => setRequiredDiy(!requiredDiy)} /> DIY
       <input type="checkbox" checked={requiredBuilt} onChange={() => setRequiredBuilt(!requiredBuilt)} /> Built
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
