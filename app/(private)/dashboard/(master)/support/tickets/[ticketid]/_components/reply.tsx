"use client";
import { useForm, Controller } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";

export default function  ReplyForm() {
  const { control, handleSubmit } = useForm();
  return (
    <>
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <Controller
          control={control}
          name="message"
          render={({ field }) => (
            <Textarea
              className="h-40"
              placeholder="Type your message here."
              {...field}
            />
          )}
        />
      </form>
    </>
  );
}

