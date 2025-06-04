import { useParams } from "react-router-dom"
const RouteDetailesPage = () => {
  const { id } = useParams()

  return (
    <div>
      RouteDetailesPage
      <p>ID маршрута: {id}</p>
    </div>
  )
}

export default RouteDetailesPage
