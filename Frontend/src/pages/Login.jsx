import React from 'react'
import { useNavigate } from 'react-router-dom';
import Grama from '../assets/Grama.svg';
import { Eye, EyeOff, LogIn } from 'react-feather';
import { useState } from 'react';


const Login = () => {
	const navigate = useNavigate();

	const [emailValue, setEmailValue] = useState({
		email: "",
	});

	const [passwordValue, setPasswordValue] = useState({
		password: "",
		showPassword: false,
	});

	const handleClickShowPassword = () => {
    setPasswordValue({ ...passwordValue, showPassword: !passwordValue.showPassword });
  };

	
	const handleFormSubmit = (e) => {
		e.preventDefault();

		console.log(emailValue, passwordValue);
		navigate(`/main`); 
	};
	return (
		<div className='h-screen flex bg-darkBlack'>
			<div className='w-full max-w-[440px] h-[770px] m-auto bg-black2 rounded-sm  shadow-default py-10 px-16'>
				<img src={Grama} alt="Logo Grama" />
				<h1 className='text-2xl font-bold text-white mt-16 mb-12 text-center'>
					plataforma de gestão de formações
				</h1>

				<form onSubmit={handleFormSubmit} className="flex flex-col mt-16" noValidate>
					<div className="mb-4">
						<label htmlFor='email' className='text-gray5 text-[14px] '>email</label>
						<input
							type='email'
							className={`w-full p-2 bg-transparent text-white placeholder-gray3 border border-gray3 rounded-[3px]  text-sm transition duration-150 ease-in-out mb-4 mt-2 focus:border-primary focus:outline-0 focus:backdrop-blur-lg focus:shadow-btn focus:rounded-[2px]`}
							id='email'
							placeholder='username@email.com'
							onChange={(e) => { setEmailValue({ email :e.target.value}) }}
							value={emailValue.email}
							
						/>
					</div>
					<div className='text-gray5'>
						<label htmlFor='password' className='text-gray5 text-[14px]'>password</label>
						<div className='relative'>
							<input
								type={passwordValue.showPassword ? "text" : "password"}
								className={`w-full p-2 bg-transparent text-white placeholder-gray3 border border-gray3 rounded-[3px]  text-sm transition duration-150 ease-in-out mb-4 mt-2 focus:border-primary focus:outline-0 focus:shadow-btn focus:rounded-[2px]`}
								id='password'
								placeholder='password'
								onChange={(e) => { setPasswordValue({ password: e.target.value }) }}
								value={passwordValue.password}
							/>
							<div className='absolute right-5 top-4' onClick={handleClickShowPassword}>
								{passwordValue?.showPassword ? (
									<Eye className="h-5" />
								) : (
									<EyeOff className="h-5" />
								)}
								

							</div>

						</div>

					</div>
					<div className='flex justify-center items-center mt-6 '>
						<button className="flex items-center px-4 py-2 bg-primary text-darkBlack font-semibold text-sm rounded-sm hover:shadow-btn focus:border-white" >
							<LogIn className='w-5 h-5 mr-2' />
							Login
						</button>
					</div>
				</form>
			</div>
		</div>

	)
}

export default Login;
