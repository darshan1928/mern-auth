import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"
function SignUp() {
    const [formData, setFormData] = useState({});
    const [error,setError]=useState(false)
    const [loading,setLoading]=useState(false)

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleSubmit=async(e)=>{
      e.preventDefault();
      try {
        setLoading(true)
        setError(false)
        const response = await axios.post("http://localhost:3000/api/auth/signUp",formData)
        console.log("response==",response)
        setLoading(false)
        setError(false)
      } catch (error) {
        setLoading(false)
        setError(true)
        console.log("error==",error);
      }}
 
    return (
        <div className="p-3 max-w-lg mx-auto">
            <h1 className="font-semibold my-7 text-center text-3xl  ">Sign Up</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
                <input
                    onChange={handleChange}
                    type="text"
                    placeholder="Username"
                    id="username"
                    className="bg-slate-100 p-3 rounded-lg"
                />
                <input
                    onChange={handleChange}
                    type="email"
                    placeholder="Email"
                    id="email"
                    className="bg-slate-100 p-3 rounded-lg"
                />
                <input
                    onChange={handleChange}
                    type="password"
                    placeholder="Password"
                    id="password"
                    className="bg-slate-100 p-3 rounded-lg"
                />
                <button
                disabled={loading}
                    type="submit"
                    className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
                >
                   {loading ? "Loading": "SignUp"} 
                </button>
            </form>
            <div className="flex gap-2 mt-5 ">
                <p>Have an Account ?</p>
                <Link to="/signIn">
                    {" "}
                    <span className="text-blue-500">Sign In</span>
                </Link>
            </div>
            <p className="text-red-700 mt-5">{error && "Something went wrong !"}</p>
        </div>
    );
}

export default SignUp
