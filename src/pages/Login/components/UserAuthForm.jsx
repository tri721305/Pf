import { useState } from "react";
import { useForm } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { login, authActions, getInfoUser, loginWithSSO } from "../loginSlice";
import { useDispatch } from "react-redux";
import { Input } from "@/components/ui/input";
import CusBtn from "@/custom/CusBtn";
import CusPasswordInput from "@/custom/CusPasswordInput";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router";
const formSchema = z.object({
  username: z.string().min(1, { message: "Please enter your Username" }),
  password: z
    .string()
    .min(1, {
      message: "Please enter your password",
    })
    .min(7, {
      message: "Password must be at least 7 characters long",
    }),
});

const UserAuthForm = ({ className, ...props }) => {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    // resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function onSubmit(data) {
    console.log("submit", data);
    let dataSubmit = {};
    setIsLoading(true);
    // toast({
    //   title: "Scheduled: Catch up",
    //   description: "Friday, February 10, 2023 at 5:57 PM",
    // });

    if (import.meta.env.VITE_ENV == "DEV") {
      dispatch(login(data)).then((res) => {
        if (!res?.error) {
          dispatch(getInfoUser()).then((res) => {
            console.log("res", res);
            if (res.payload.userInfo) {
              return navigate("/Dashboard");
            }
          });
        }
      });
    } else
      dispatch(loginWithSSO(data)).then((res) => {
        if (!res?.error) {
          dispatch(getInfoUser()).then((res) => {
            if (res.payload.userInfo) {
              return navigate("/Dashboard");
            }
          });
        }
      });
  }
  console.log("ENV", import.meta.env.VITE_ENV);
  return (
    <div className="grid gap-6" {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>User Name</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <div className="flex items-center justify-between">
                    <FormLabel>Password</FormLabel>
                  </div>
                  <FormControl>
                    <CusPasswordInput placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <CusBtn
              title="Sign In"
              className="mt-2"
              loading={isLoading}
              type="submit"
            ></CusBtn>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default UserAuthForm;
