"use client"
import React, { useState } from 'react'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../lib/firebase";
import { doc, setDoc } from 'firebase/firestore';
import { setCookie } from 'cookies-next';

function register() {
    const [data , setsdata] = useState({
        name : '',
        email: '',
        password : '',
        lastname : '',
        age : 0 ,
        gender: null as boolean | null
    })
    const inputHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>{
        let value: string | boolean = e.target.value

        if (e.target.name === 'gender') {
            value = e.target.value === "true" 
        }
        setsdata({
            ...data,
            [e.target.name]: value
          })
    }
    const submitHandler = async () =>{
        console.log(data , data.email.trim()||data.name.trim()||data.password.trim());
        
        if (!data.email.trim() || !data.name.trim() || !data.password.trim()) {
            console.error('input is empty!')
            return
        }
        try{
            const userCredential = await createUserWithEmailAndPassword(auth , data.email , data.password)
            const user = userCredential.user
            await setDoc(doc(db, "users" , user.uid) , {
                uid: user.uid,
                name : data.name,
                lastname : data.lastname,
                email : data.email,
                password : data.password,
                age: data.age,
                gender : data.gender
            })
            console.log('succsesful');
            setCookie('UID' , user.uid , {maxAge: 60 * 60 * 24 * 7} )
        }catch (err: any) {
            console.error(err.message || "somethings wrong");
        }
    }
  return (
    <div>
        <input name='name' type="text" placeholder='name' onChange={inputHandler} value={data.name}/>
        <input name='lastname' type="text" placeholder='lastname' onChange={inputHandler} value={data.lastname}/>
        <input name='age' type="text" placeholder='age' onChange={inputHandler} value={data.age}/>
        <input name='email' type="email" placeholder='email' onChange={inputHandler} value={data.email}/>
        <input name='password' type="password" placeholder='password'onChange={inputHandler} value={data.password}/>
        <select name="gender" onChange={inputHandler} value={data.gender === null ? '' : String(data.gender)}>
                <option value="">gender</option>
                <option value="true">male</option>
                <option value="false">female</option>
            </select>
        <button onClick={submitHandler}>submit</button>
    </div>
  )
}

export default register