'use client'
import { Textarea } from '@/components/ui/textarea'
import { useForm } from 'react-hook-form'
import { TicketReplySchema } from '@/schemas/reply.schema'
import { Button } from '@/components/ui/button'
import { PanelBottomOpen, Reply, Trash2, X,Check} from 'lucide-react'

interface Props {
  ticketid: number,
  sender: string,
  role: string
  status: "open" | "closed" | "denied" | "accepted"
}

export function ReplyForm({ ticketid,
  sender,
  role,
  status }: Props) {

  const { register, handleSubmit } = useForm();

  function onSubmit(payload: any) {
    console.log(payload)
  }

    const baseActionButtonClassName =
    "hover:cursor-pointer hover:shadow-lg hover:shadow-gray-500 m-1";
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Textarea
          {...register("message")}
          className="h-40"
          placeholder="Type your message here."


        />
        {status === "open" && (
          <Button className='nst baseActionButtonClassName =
    "hover:cursor-pointer hover:shadow-lg hover:shadow-gray-500"'>
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
  )
}