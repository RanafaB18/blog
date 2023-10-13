import { Link } from "react-router-dom"

const ErrorPage = () => {
  return (
    <div className="flex flex-col gap-4 justify-center items-center absolute top-0 bottom-0 w-full -z-10">
        <h2 className="text-7xl">404</h2>
        <p>Nothing here</p>
        <Link to={"/"} className="px-4 py-1 rounded w-fit bg-green-600 text-white">
            Go Home
        </Link>
    </div>
  )
}

export default ErrorPage
