"use client";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { TicketReplySchema } from "@/schemas/reply.schema";
import { Button } from "@/components/ui/button";
import { PanelBottomOpen, Reply, Trash2, X, Check } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from "@/utils/trpc";
import { toast } from "sonner";

interface Props {
  ticketid: number;
  sender: number;
  status: "open" | "closed" | "denied" | "accepted";
  isLoading: boolean
}

export function ReplyForm({ 
ticketid, sender, status, isLoading 

}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TicketReplySchema>({
    resolver: zodResolver(TicketReplySchema),
  });

  function onSubmit(payload: TicketReplySchema) {
    trpc.tickets.reply.mutate({
      ticketid,
      sender,
      message: payload.message,
    });

    reset();
    return toast("the Message was sent", {
      description: `Message sent at ${new Date().toLocaleString()}`,
    });
  }

  const baseActionButtonClassName =
    "hover:cursor-pointer hover:shadow-lg hover:shadow-gray-500 m-1";
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {errors.message && (
          <>
            <span className="text-red-500">{errors.message.message}</span>
          </>
        )}
        <Textarea
          {...register("message")}
          className="h-40"
          placeholder="Type your message here."
        />

        {status === "open" && (
          <Button
            className="hover:cursor-pointer hover:shadow-lg hover:shadow-gray-500"
            type="submit"
            disabled={isLoading}
          >
            <Reply />
            Send message
          </Button>
        )}

        {status === "open" && (
          <Button
            className={`bg-green-600 text-white ${baseActionButtonClassName}`}
          >
            <Check />
            Aceitar e desbanir
          </Button>
        )}
        {status === "closed" ||
          status === "open" ||
          status === "accepted" ||
          (status === "denied" && (
            <Button
              className={`bg-green-600 text-white ${baseActionButtonClassName}`}
            >
              <PanelBottomOpen />
              Reabrir
            </Button>
          ))}
        {status === "open" && (
          <Button
            className={`bg-red-500 text-white ${baseActionButtonClassName}`}
          >
            <X />
            Recusar
          </Button>
        )}

        <Button
          className={`bg-red-500 text-white ${baseActionButtonClassName}`}
        >
          <Trash2 />
          Deletar
        </Button>
      </form>
    </>
  );
}
