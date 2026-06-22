
import * as React from "react";

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { useState, useEffect } from "react";

import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Button from "@/components/ui/button"
import { useId } from "react"
function cn(...inputs) {
  return twMerge(clsx(inputs));
}






const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="card"
    className={cn(
      "bg-card text-card-foreground flex flex-col gap-2 rounded-xl  overflow-hidden  ",
      className
    )}
    {...props} />
));
Card.displayName = "Card";

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="card-content"
    className={cn("px-6", className)}
    {...props} />
));
CardContent.displayName = "CardContent";

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-accent selection:text-secondary border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow,border-color] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",

        "focus-visible:border-accent focus-visible:ring-accent/30 focus-visible:ring-[2px]",

        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",

        className
      )}
      ref={ref}
      {...props} />
  );
});
Input.displayName = "Input";

const Label = React.forwardRef(({ className, ...props }, ref) => (
  <label
    ref={ref}
    data-slot="label"
    className={cn(
      "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
      className
    )}
    {...props} />
));
Label.displayName = "Label";

const Separator = React.forwardRef(
  ({ className, orientation = "horizontal", decorative = true, ...props }, ref) => (
    <SeparatorPrimitive.Root
      ref={ref}
      data-slot="separator-root"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      )}
      {...props} />
  )
);
Separator.displayName = SeparatorPrimitive.Root.displayName;



const GoogleIcon = (
  props
) => (
  <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
    <path
      d="M3.06364 7.50914C4.70909 4.24092 8.09084 2 12 2C14.6954 2 16.959 2.99095 18.6909 4.60455L15.8227 7.47274C14.7864 6.48185 13.4681 5.97727 12 5.97727C9.39542 5.97727 7.19084 7.73637 6.40455 10.1C6.2045 10.7 6.09086 11.3409 6.09086 12C6.09086 12.6591 6.2045 13.3 6.40455 13.9C7.19084 16.2636 9.39542 18.0227 12 18.0227C13.3454 18.0227 14.4909 17.6682 15.3864 17.0682C16.4454 16.3591 17.15 15.3 17.3818 14.05H12V10.1818H21.4181C21.5364 10.8363 21.6 11.5182 21.6 12.2273C21.6 15.2727 20.5091 17.8363 18.6181 19.5773C16.9636 21.1046 14.7 22 12 22C8.09084 22 4.70909 19.7591 3.06364 16.4909C2.38638 15.1409 2 13.6136 2 12C2 10.3864 2.38638 8.85911 3.06364 7.50914Z" />
  </svg>
);

const Logo = (props) => (
  <svg fill="currentColor" height="48" viewBox="0 0 40 48" width="40" {...props}>
    <clipPath id="a">
      <path d="m0 0h40v48h-40z" />
    </clipPath>
    <g clipPath="url(#a)">
      <path
        d="m25.0887 5.05386-3.933-1.05386-3.3145 12.3696-2.9923-11.16736-3.9331 1.05386 3.233 12.0655-8.05262-8.0526-2.87919 2.8792 8.83271 8.8328-10.99975-2.9474-1.05385625 3.933 12.01860625 3.2204c-.1376-.5935-.2104-1.2119-.2104-1.8473 0-4.4976 3.646-8.1436 8.1437-8.1436 4.4976 0 8.1436 3.646 8.1436 8.1436 0 .6313-.0719 1.2459-.2078 1.8359l10.9227 2.9267 1.0538-3.933-12.0664-3.2332 11.0005-2.9476-1.0539-3.933-12.0659 3.233 8.0526-8.0526-2.8792-2.87916-8.7102 8.71026z" />
      <path
        d="m27.8723 26.2214c-.3372 1.4256-1.0491 2.7063-2.0259 3.7324l7.913 7.9131 2.8792-2.8792z" />
      <path
        d="m25.7665 30.0366c-.9886 1.0097-2.2379 1.7632-3.6389 2.1515l2.8794 10.746 3.933-1.0539z" />
      <path
        d="m21.9807 32.2274c-.65.1671-1.3313.2559-2.0334.2559-.7522 0-1.4806-.102-2.1721-.2929l-2.882 10.7558 3.933 1.0538z" />
      <path
        d="m17.6361 32.1507c-1.3796-.4076-2.6067-1.1707-3.5751-2.1833l-7.9325 7.9325 2.87919 2.8792z" />
      <path
        d="m13.9956 29.8973c-.9518-1.019-1.6451-2.2826-1.9751-3.6862l-10.95836 2.9363 1.05385 3.933z" />
    </g>
  </svg>
);


export default function LoginComponent() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordStatus, setPasswordStatus] = useState("weak")
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [strength, setStrength] = useState({ width: 'w-0', color: 'bg-transparent', label: '' })
  const [isLogin, setIsLogin] = useState(true);
  const id = useId();
  function toggleLogin() {
    setIsLogin(!isLogin);
    setStrength({ width: 'w-0', color: 'bg-transparent', label: '' });
    setEmail("")
    setPassword("")

  }


  const checkPasswordStrength = (password) => {
    let score = 0;

    if (password.length >= 8) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[ !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/.test(password)) score++;
    getStrengthConfig(score);

    if (score <= 2) return "weak";
    if (score <= 4) return "medium";
    return "strong";
  };
  useEffect(() => {
    if (!password) {
      setPasswordStatus("");
      return;
    }
    checkPasswordStrength(password)
    setPasswordStatus(checkPasswordStrength(password));

  }, [password]);


  const getStrengthConfig = (score) => {
    switch (score) {
      case 1:
        setStrength({ width: 'w-1/5', color: 'bg-red-500', label: 'Very Weak' });
        break;
      case 2:
        setStrength({ width: 'w-2/5', color: 'bg-orange-500', label: 'Weak' });
        break;
      case 3:
        setStrength({ width: 'w-3/5', color: 'bg-yellow-500', label: 'Fair' });
        break;
      case 4:
        setStrength({ width: 'w-4/5', color: 'bg-blue-500', label: 'Good' });
        break;
      case 5:
        setStrength({ width: 'w-full', color: 'bg-green-500', label: 'Strong' });
        break;
      default:
        setStrength({ width: 'w-0', color: 'bg-gray-200', label: '' });
    }
  };


  console.log(strength)
  async function handleLogin(e) {
    e.preventDefault();
    console.log("Email submitted:", email);
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long")
      return
    }
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (data.success) {
      toast.success(data.message)

      setTimeout(() => {
        navigate("/");
      }, 1000)

    } else {

      toast.error(data.message)

      if (data.message.toLowerCase() === "user not verified") {
        setTimeout(() => {
          navigate('/check-email', {
            state: { email,source:"login" }
          })
        }, 1000)
      }
    }
  }

  async function handleRegister(e) {
    e.preventDefault();
    console.log("Email submitted:", email);

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long")
      return
    }

    if (password != confirmPassword) {
      toast.error("Password and confirm password are not matching")
      return
    }
    const fullName = `${firstName} ${lastName}`
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: fullName, email, password, phoneNumber })
    });
    console.log(res)
    const data = await res.json();
    console.log(data)
    if (data.success) {

      navigate('/check-email', {
        state: { email, source:"register" }
      });
    } else {
      toast.error(data.message);

    }
  }
  async function handleGoogleLogin() {
    window.location.href = `${import.meta.env.VITE_BACKEND_URI}/api/user/google-login`;

  }
  return (
    <div className="flex items-center justify-center ">
      <Card className="w-full max-w-sm rounded-4xl">
        <CardContent className="">
          <div className="flex flex-col items-center space-y-2">



            <div className="w-full h-full relative flex items-center justify-center  border border-secondary rounded-xl p-1 mb-5">
              <button className={`h-10 rounded-xl px-4 w-1/2 ${isLogin ? "bg-primary text-white" : "text-secondary"}`} onClick={toggleLogin}>Login</button>
              <button className={`h-10 rounded-xl px-4 w-1/2 ${!isLogin ? "bg-primary text-white" : "text-secondary"}`} onClick={toggleLogin}>Register</button>
            </div>


            <div className="w-full space-y-4">
              {
                isLogin ? (
                  <>
                    <Label htmlFor={`email-${id}`}>Email</Label>
                    <Input type="email" id={`email- ${id}`} placeholder="Your email" className="w-full rounded-xl" onChange={(e) => setEmail(e.target.value)} required />
                    <Label htmlFor={`password-${id}`}>Password</Label>
                    <Input type="password" id={`password-${id}`} placeholder="Your password" className="w-full rounded-xl" onChange={(e) => setPassword(e.target.value)} required />
                  </>
                ) : (
                  <>
                    <div className="w-full">
                      <Label htmlFor={`name-${id}`}>Name</Label>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <Input type="text" id={`name-${id}`} placeholder="First name" className="w-full rounded-xl" onChange={(e) => setFirstName(e.target.value)} required />
                        <Input type="text" id={`name-${id}`} placeholder="Last name" className="w-full rounded-xl" onChange={(e) => setLastName(e.target.value)} required />
                      </div>
                    </div>
                    <Label htmlFor={`email-${id}`}>Email</Label>
                    <Input type="email" id={`email- ${id}`} placeholder="Your email" className="w-full rounded-xl" onChange={(e) => setEmail(e.target.value)} required />
                    <Label htmlFor={`phone-${id}`}>Phone Number</Label>
                    <Input type="text" id={`phone-${id}`} placeholder="Your phone number" className="w-full rounded-xl" onChange={(e) => setPhoneNumber(e.target.value)} required />


                    <Label htmlFor={`password-${id}`}>Password</Label>



                    <Input type="password" id={`password-${id}`} placeholder="Your password" className="w-full rounded-xl" onChange={(e) => setPassword(e.target.value)} value={password} required />
                    {password.length > 0 && (


                      < div className="mt-2 space-y-1 text-xs">
                        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">

                          <div className={`h-full ${strength.width} ${strength.color} transition-all duration-300 ease-out`} />
                        </div>
                        <p className={password.length >= 8 ? "text-green-500" : "text-red-400"}>
                          ✓ At least 8 characters
                        </p>

                        <p className={/[a-z]/.test(password) ? "text-green-500" : "text-red-400"}>
                          ✓ Lowercase letter
                        </p>

                        <p className={/[A-Z]/.test(password) ? "text-green-500" : "text-red-400"}>
                          ✓ Uppercase letter
                        </p>

                        <p className={/\d/.test(password) ? "text-green-500" : "text-red-400"}>
                          ✓ Number
                        </p>

                        <p
                          className={
                            /[ !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/.test(password)
                              ? "text-green-500"
                              : "text-gray-400"
                          }
                        >
                          ✓ Special character
                        </p>
                      </div>

                    )}
                    <Label htmlFor={`confirm-${id}`}>Confirm Password</Label>
                    <Input type="password" id={`confirm-${id}`} placeholder="Confirm Password" className="w-full rounded-xl" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} required />
                  </>
                )
              }
              <div className="flex flex-col gap-2">
                {
                  isLogin ? (

                    <Button onClick={handleLogin} variant="gradient" width={"100%"} height={50}>
                      Login
                    </Button>
                  ) : (

                    passwordStatus == "strong" ? (
                      <Button onClick={handleRegister} variant="gradient" width={"100%"} height={50}>
                        Register
                      </Button>
                    ) : (
                      <Button disabled onClick={handleRegister} variant="gradient" width={"100%"} height={50}>
                        Register
                      </Button>
                    )
                  )
                }

              </div>

              <div className="flex items-center gap-4 ">
                <Separator className="flex-1" />
                <span className="text-sm text-muted-foreground">OR</span>
                <Separator className="flex-1" />
              </div>

              <Button height={50} width={"100%"} variant="shiny" onClick={handleGoogleLogin} className={"hover:bg-accent hover:border-accent rounded-xl"}>
                Sign in with Google
              </Button>
            </div>

            <p className="text-center text-xs w-11/12 text-muted-foreground">
              You acknowledge that you read, and agree, to our{" "}
              <a href="#" className="underline hover:text-foreground">
                Terms of Service
              </a>{" "}
              and our{" "}
              <a href="#" className="underline hover:text-foreground">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </CardContent>
      </Card>
    </div >
  );
}