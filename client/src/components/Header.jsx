import { Link } from "react-router-dom"

export default function Header() {
  return (
    <div>
      <div className="flex bg-green-default text-white top-0 py-5 px-14 flex-wrap justify-between">
        <h1 className="text-lg text-white font-semibold">
          <a href="/">AuthFlow</a>
        </h1>
        <ul className="flex gap-[20px] text-m">
          <Link to='/'>Home</Link>
          <Link to='/sign-in'>Sign in</Link>
        </ul>
      </div>
    </div>
  )
} 

