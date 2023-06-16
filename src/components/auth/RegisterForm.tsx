import React, { Fragment, useState } from "react";
import { Button, IconButton } from "../Button";
import Input from "../Input";;

export const SignUpFrom = () => {
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
      <h1 className="text-2xl font-semibold">Register free!</h1>
      <form
        className="mt-6 space-y-6"
        onSubmit={() => { }}
        autoComplete="off"
      >
        <Input
          name="fullname"
          id="text"
          type="text"
          placeholder="fullname"
          isInvalid={false}
          errorText="invalid name"
          onChange={handleChange}
        />

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
          Sign Up
        </Button>
      </form>

      <p className="mt-4 text-sm">
        By clicking “Sign Up” above, you acknowledge that you have read and
        agreed to our{" "}
        <a
          href=""
          className="font-semibold underline hover:text-indigo-700 dark:hover:text-indigo-400"
        >
          {" "}
          Terms & Conditions
        </a>{" "}
        and{" "}
        <a
          href=""
          className="font-semibold underline hover:text-indigo-700 dark:hover:text-indigo-400"
        >
          {" "}
          Privacy Policy
        </a>{" "}
        .
      </p>
    </div>
  );
};
