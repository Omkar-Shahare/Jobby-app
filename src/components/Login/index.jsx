
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookiesc from 'js-cookie';
import './index.css'
import Cookies from 'js-cookie';


const Login = ()=>{

    const [allValues , setValues] = useState({
        username : "",
        password : "",
        errorMsg : ""
    });

    let token = Cookies.get("myToken");
    
    console.log(token);

    useEffect (() =>{

        if(token !== undefined){

            navigate("/");
        }

    },[]);



    const navigate = useNavigate();

    const onSubmitForm = async(e)=>{

    e.preventDefault();
    
    const api = "https://apis.ccbp.in/login";

    const userDetails = {

        username: allValues.username,
        password: allValues.password

    }

    const options = {
        method : "Post",
        body : JSON.stringify (userDetails)
    }
    try {
        const response = await fetch (api,options);

        const data = await response.json();

        if (response.ok === true ){

            setValues({...allValues , errorMsg : ""});

            Cookies.set("myToken", data.jwt_token);

            navigate("/");
        }
        else{

            setValues({...allValues , errorMsg : data.error_msg});
        }
        console.log (data.jwt_token);
    } catch (error) {
        
        console.log(error);
    }
    
}
    return(
        <div className='form-cont'>
            <h1 style={{color : " red"}}>Login Component</h1>
                <form className="border border-primary p-3 w-50 " onSubmit={onSubmitForm}>
                    
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="text" className="form-control" id="exampleInputEmail1" 
                        onChange={(e) =>(setValues({...allValues,username : e.target.value}))}
                        aria-describedby="emailHelp"/>
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" 
                        onChange={(e) =>(setValues({...allValues,password : e.target.value}))}
                        id="exampleInputPassword1"/>
                    </div>

                    <p className="text-danger">{allValues.errorMsg}</p>
                
                    
                    <button type="submit"  className="btn btn-primary">Submit</button>
                    </form>

        </div>
        
    )
}

export default Login ;