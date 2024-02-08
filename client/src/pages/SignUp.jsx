
import { useState } from "react";
import { Link } from "react-router-dom"
export default function SignUp() {
  const [formData, setFormData] = useState();
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // console.log(formData);
  return (
    <div className="bg-gray-100 flex justify-end px-14 bg-no-repeat bg-cover bg-center bg-fixed bg-bgImg mx-auto ">
      <div className="flex flex-col justify-end my-20 px-6 py-8 rounded-3xl lg:px-10 bg-gray-300 bg-opacity-90">
        <div className="flex justify-between sm:mx-auto sm:w-full sm:max-w-sm">
          <p className="text-2xl mr-12 text-gray-500">
            Welcome to 
            <span className="text-green-default font-bold ">
              AuthFlow
            </span>
          </p>
          <p className="flex flex-wrap mt-2 text-sm text-gray-500">
            Have an Account?{' '}
            <Link to='/sign-in'>
              <span className="font-semibold leading-6 text-green-default hover:text-green-lighter">
                Sign in
              </span>
            </Link>  
          </p>
        </div>

        <div className="my-8">
          <h2 className="text-6xl text-left font-semibold leading-9 tracking-tight text-black">
            Sign up
          </h2>
        </div>

        <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label htmlFor="email" className="block text-md font-medium leading-6 text-gray-900">
                Enter your email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="Email address"
                  className="block w-full rounded-md border-0 px-3 py-3.5 text-black bg-lightGray shadow-sm placeholder:text-gray-500 sm:text-sm sm:leading-6"
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="">
              <label className="block text-md font-medium leading-6 text-gray-900">
                User name
              </label>
              <div className="mt-2">
                <input
                  id="user-name"
                  name="username"
                  type="text"
                  autoComplete="text"
                  required
                  placeholder="user name"
                  className="block w-full rounded-md border-0 px-3 py-3.5 text-black bg-lightGray shadow-sm placeholder:text-gray-500 sm:text-sm sm:leading-6"
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-md font-medium leading-6 text-gray-900">
                  Enter your Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  placeholder="Password"
                  className="block w-full rounded-md border-0 px-3 py-3.5 text-black bg-lightGray shadow-sm placeholder:text-gray-500 sm:text-sm sm:leading-6"
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="float-right text-1xl mt-4 rounded-md bg-green-default hover:bg-green-lighter w-44 px-3 py-2.5 font-semibold leading-6 text-white shadow-lg hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
