"use client";
// Libraries Imports
import { useState } from "react";
import { useFormik } from "formik";
import Image from "next/image";
import { toast } from "sonner";
// Local Imports
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { authSchema } from "@/schema/schema";
import { FileSearch } from "lucide-react";
import { Label } from "@/components/ui/label";
import { authFormTypes } from "@/types/types";

const Home = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const {
    handleSubmit,
    handleReset,
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    isSubmitting,
  } = useFormik<authFormTypes>({
    onSubmit: (values: { email: string; password: string }) => {
      if (isSignUp) {
        console.log(values);
        toast("Signup successfully.");
        handleReset(values);
      } else {
        console.log(values);
        toast("Signin successfully.");
        handleReset(values);
      }
    },
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: authSchema,
  });

  return (
    <div className="flex min-h-screen">
      <div
        className={`hidden sm:w-1/2 sm:relative sm:flex sm:justify-center sm:items-center bg-[#d7e6c5]`}
      >
        <div className="icon absolute top-6 left-6">
          <div className="flex justify-center items-center gap-2">
            <FileSearch />
            <h2 className="text-xl sm:text-2xl font-normal">FinPlanner</h2>
          </div>
        </div>
        <Image
          src="https://assets.api.uizard.io/api/cdn/stream/a0cde846-bf0c-4118-b9e8-194c83c8b865.png"
          width={300}
          height={300}
          alt="login-img"
          priority
        />
      </div>
      <div className="w-full sm:w-1/2 flex flex-col justify-center items-center p-8">
        <h2 className="text-2xl sm:text-4xl font-bold mb-8">
          {isSignUp ? "Create an Account" : "Welcome Back"}
        </h2>
        <form className="w-full max-w-md space-y-4" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="name" className="!text-lg mb-1 font-semibold">
              Email:
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              aria-label="Email"
              placeholder="john@gmail.com"
              className="w-full px-4 py-6 border rounded"
              value={values?.email}
              onBlur={handleBlur}
              onChange={handleChange}
              required
            />
            {errors && touched.email ? (
              <p className="text-red-500 text-md">{errors?.email}</p>
            ) : null}
          </div>
          <div>
            <Label htmlFor="password" className="!text-lg mb-1 font-semibold">
              Password:
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              aria-label="Password"
              placeholder=" ******* "
              className="w-full px-4 py-6 border rounded"
              value={values?.password}
              onBlur={handleBlur}
              onChange={handleChange}
              required
            />
            {errors && touched.password ? (
              <p className="text-red-500 text-md">{errors?.password}</p>
            ) : null}
          </div>
          <Button
            id="submit"
            name="save"
            type="submit"
            aria-label={isSignUp ? "Signup" : "Signin"}
            className="cursor-pointer !w-full !bg-[#d7e6c5] !text-black !text-xl !font-bold py-6"
            disabled={isSubmitting}
          >
            {isSubmitting ? " ... " : isSignUp ? "Signup" : "Signin"}
          </Button>
          <p className="text-sm text-center">
            {isSignUp ? "Already have an account? " : "Don’t have an account? "}
            <a
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-blue-600 hover:underline cursor-pointer"
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Home;
