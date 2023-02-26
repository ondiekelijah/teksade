import React, { Fragment, useState } from "react";
import { Dialog, Tab, Transition } from "@headlessui/react";
import clsx from "clsx";
import Logo from "../Logo";
import { Button, IconButton } from "../Button";
import Input from "../Input";
import { supabase } from "../../supabase/index";
import { useRouter } from "next/router";

export const SignInForm = () => {
    const router = useRouter();
    
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
    
      async function handleSubmit(e: any) {
        e.preventDefault();
    
        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email: userData.email,
            password: userData.password,
          });
          if (error) throw error;
          console.log(data);
          await data && router.reload();
          //   alert('Check your email for verification link')
        } catch (error) {
          alert(error);
        }
      }
    
      return (
        <div className="rounded-tr-4xl pt-4 pb-4">
          <h1 className="text-2xl font-semibold">Welcome back!</h1>
          <form
            className="mt-6 space-y-6"
            autoComplete="off"
            onSubmit={handleSubmit}
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
            className="mt-4 block transition-all duration-150 hover:font-semibold hover:text-indigo-800 hover:underline dark:text-gray-300 dark:hover:text-white"
          >
            Forgot your password ?
          </a>
        </div>
      );
    };