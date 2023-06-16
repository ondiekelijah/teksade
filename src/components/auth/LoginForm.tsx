import React, { useState } from "react";
import { Button, IconButton } from "../Button";
import Input from "../Input";


export const SignInForm = () => {

  const [userData, setUserData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const handleChange = (e: any) => {
    setUserData((prevUserData) => {
      return {
        ...prevUserData,
        [e.target.name]: e.target.value,
      };
    });
  };




  return (
    <div className="pt-4 pb-4 rounded-tr-4xl">
      <h1 className="text-2xl font-semibold">Welcome back!</h1>
      <form
        className="mt-6 space-y-6"
        autoComplete="off"
        onSubmit={() => { }}
      >
        <Input
          name="email"
          id="email"
          type="email"
          placeholder="Email address"
          isInvalid={false}
          errorText="invalid email"
          onChange={handleChange}
        />

        <Input
          name="password"
          id="password"
          type="password"
          placeholder="Password"
          isInvalid={false}
          errorText="invalid password"
          onChange={handleChange}
        />

        <Button type="submit" fullWidth>
          Sign in
        </Button>
      </form>

      <a
        href="#"
        className="block mt-4 transition-all duration-150 hover:font-semibold hover:text-indigo-800 hover:underline dark:text-gray-300 dark:hover:text-white"
      >
        Forgot your password ?
      </a>
    </div>
  );
};