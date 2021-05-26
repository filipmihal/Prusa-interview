import React, { useRef, useState } from 'react'
import PrusaTable from '../components/PrusaTable'
import { CheckDiv, InputBtn, InputText, Layout } from './index.style'

export interface IPrinter {
  id: number
  title: string
  buildVolume: string
  layerHeight: string
  maxTravelSpeed: string
  maxTemperatures: string
  controller: string
  filamentDiameter: string
  diyKit: boolean
  builtPrinter: boolean
}

function Home({ data }: { data: IPrinter[] }) {
  const [printers, setPrinters] = useState(data)
  const searchInput = useRef(null)
  const [requiredDiy, setRequiredDiy] = useState(false)
  const [requiredBuilt, setRequiredBuilt] = useState(false)

  const fetchSearchedPrinters = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log(searchInput.current.value)
    const res = await fetch(`http://localhost:8000/api/list?search=${searchInput.current.value}`)
    const { data } = await res.json()
    setPrinters(data)
  }

  const getFilteredPrinters = () => {
    return printers
      .filter((printer) => !requiredDiy || printer['diyKit'])
      .filter((printer) => !requiredBuilt || printer['builtPrinter'])
  }

  const filteredPrinters = getFilteredPrinters()

  return (
    <Layout>
      <form onSubmit={fetchSearchedPrinters}>
        <InputText type="text" ref={searchInput} />
        <InputBtn type="submit" value="search" />
      </form>
      <PrusaTable printers={filteredPrinters} />
      <CheckDiv>
        <input type="checkbox" checked={requiredDiy} onChange={() => setRequiredDiy(!requiredDiy)} />
        <span>DIY Kit </span>
        <input type="checkbox" checked={requiredBuilt} onChange={() => setRequiredBuilt(!requiredBuilt)} />
        <span>Buill printer </span>
      </CheckDiv>
    </Layout>
  )
}

export async function getServerSideProps() {
  const res = await fetch('http://localhost:8000/api/list')
  const printers = await res.json()

  return { props: printers }
}

export default Home
