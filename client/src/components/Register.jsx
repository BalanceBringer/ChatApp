export default function Register() {
    
    const [username, setUsername] = useState('');
    
    
    return(

        //The base of the registration page
        <div className="bg-blue-200 h-screen flex items-center">
            <form className="w-64 mx-auto">
                <input type="text" placeholder="username" className="block w-full rounded p-2 mb-2 border"/>
                <input type="password" placeholder="password" className="block w-full rounded p-2 mb-2 border"/>
                <button className="block w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Register
                </button>
            </form>
            
        </div>
    )
}