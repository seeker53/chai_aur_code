import React, { useState } from 'react'
import { login as authLogin } from '../store/authSlice'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Logo, Input } from './index'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import { useForm } from 'react-hook-form'
function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [error, setError] = useState("");

    const login = async (data) => {
        setError("")
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()
            }
        }
        catch (error) {
            setError(error.message);
        }
    }
    const isValidPassword = (password) => {
        const minLength = password.length >= 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecialChar = /[^a-zA-Z0-9]/.test(password);

        return minLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
    };
    return (
        <div
            className='flex items-center justify-center w-full'
        >
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                <form onSubmit={handleSubmit(login)} className='mt-8'>
                    <div className='space-y-5'>
                        <Input
                            label="Email: "
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                }
                            })}
                        />
                        <Input
                            label="Password: "
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: true,
                                validate: (value) => isValidPassword(value) || "Password must meet the criteria",
                            })}
                        />
                        {errors.password && <p className="text-red-600">{errors.password.message}</p>}
                        <div>
                            <p>Password requirements:</p>
                            <ul>
                                <li style={{ color: password.length >= 8 ? "green" : "red" }}>Minimum 8 characters</li>
                                <li style={{ color: /[A-Z]/.test(password) ? "green" : "red" }}>At least one uppercase letter</li>
                                <li style={{ color: /[a-z]/.test(password) ? "green" : "red" }}>At least one lowercase letter</li>
                                <li style={{ color: /[0-9]/.test(password) ? "green" : "red" }}>At least one number</li>
                                <li style={{ color: /[^a-zA-Z0-9]/.test(password) ? "green" : "red" }}>At least one special character</li>
                            </ul>
                        </div>
                        <Button
                            type="submit"
                            className="w-full"
                        >Sign in</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login