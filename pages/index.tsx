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

function Home({data}: {data: IPrinter[]}) {
  return (
   <div>
     <table>
      <thead>
        <tr>
          <th></th>
          {data.map(printer => (
            <th key={printer.id}>{printer.title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {keyValuePairs.map(pair => (
          <tr key={pair.key}> 
            <th>{pair.value}</th>
            {data.map(printer => (
              <td key={printer.id}>{printer[pair.key]}</td>
            ))}
            </tr>
        ))}
      </tbody>
     </table>
   </div>
  )
}

export async function getServerSideProps() {
  // TODO: the port should not be hardcoded
  const res = await fetch('http://localhost:8000/api/list')
  const printers = await res.json()

  return { props: printers }
}

export default Home
