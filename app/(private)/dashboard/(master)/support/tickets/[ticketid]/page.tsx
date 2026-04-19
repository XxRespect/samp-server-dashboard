"use client";
import { useParams } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { X, Check, Reply, Trash2, PanelBottomOpen } from "lucide-react";
import { Separator } from "@/components/ui/separator";

import { Textarea } from "@/components/ui/textarea";

import { AlertCircleIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { trpc } from "@/utils/trpc";
import { useQuery } from "@tanstack/react-query";
import { formatTime } from "@/utils/datatime/datetime.formater";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";

export default function TicketIDPage() {
  const { data: session } = useSession();
  const { ticketid } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["ticket", ticketid],
    queryFn: () =>
      trpc.tickets.getTicketById.query({ ticketid: Number(ticketid) }),
    retry: 3,
    enabled: !!session?.user?.id,
  });


  if(!session?.user.id == 0 || session?.user?.id === undefined || session?.user?.id === null){ return(<><Spinner /></>) }

  let RevisionType: string = "Unknown";
  if (data?.ticket.type === "report") {
    RevisionType = "Denúncia";
  } else if (data?.ticket.type === "ban_appeal") {
    RevisionType = "Revisão de Banimento";
  } else if (data?.ticket.type === "admin_report") {
    RevisionType = "Denúncia contra Admin";
  } else if (data?.ticket.type === "other") {
    RevisionType = "IP Revision";
  }

  const status = data?.ticket.status;
  let color = "default";
  if (status === "open") color = "outline";
  else if (status === "closed") color = "outline";
  else if (status === "denied") color = "outline";
  else if (status === "accepted") color = "outline";

  let statusPT: string = "";
  if (status === "accepted") statusPT = "Aceito";
  else if (status === "open") statusPT = "Aberto";
  else if (status === "closed") statusPT = "Fechado";
  else if (status === "denied") statusPT = "Recusado";

  const isClosed = status === "closed";
  const isDenied = status === "denied";
  const isAccepted = status === "accepted";

  const showStatusAlert = isClosed || isDenied || isAccepted;

  const baseActionButtonClassName =
    "hover:cursor-pointer hover:shadow-lg hover:shadow-gray-500";

  if (data?.ticket !== null || data?.ticket !== undefined) {
    console.log(data?.ticket);
  }

  return (
    <>
      <div className="px-4 pb-8 pt-6 sm:px-6 lg:px-8 m-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard/support">Suporte</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Ticket</BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{RevisionType}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="w-full px-4 pb-10 sm:px-6 lg:px-8">
        <div className="flex gap-6 items-start">
          <aside className="w-80 shrink-0 mt-7">
            <Card className="w-full bg-primary-foreground shadow-lg shadow-gray-400/20 sticky top-4">
              <CardContent className="pt-6">
                <div className="space-y-4 text-sm">
                  <div>
                    <span className="text-xs text-muted-foreground">Tipo</span>
                    <p className="font-medium">{RevisionType}</p>
                    <p>ID: {data?.ticket.id}</p>
                  </div>
                  <Separator />

                  <div>
                    <span className="text-xs text-muted-foreground">Autor</span>
                    <Link
                      href={`/dashboard/users/${data?.ticket.author_accid}`}
                    >
                      <p className="text-blue-400 hover:underline text-shadow-2xs ">
                        {data?.ticket.author}
                      </p>
                    </Link>
                  </div>
                  <Separator />

                  <div>
                    <span className="text-xs text-muted-foreground">
                      Contra
                    </span>{" "}
                    <br />
                    <Link
                      href={`/dashboard/users/${data?.ticket.against_accid}`}
                    >
                      <p className="text-blue-400 hover:underline text-shadow-2xs ">
                        {data?.ticket.against}
                      </p>
                    </Link>
                  </div>
                  <Separator />

                  <div>
                    <span className="text-xs text-muted-foreground">
                      Status
                    </span>
                    <div className="mt-2">
                      <Badge
                        className={`font-bold text-sm ${status === "open" ? "bg-green-500" : status === "closed" ? "bg-gray-500" : ""}`}
                        variant={color as "outline" | "outline"}
                      >
                        <span>{statusPT}</span>
                      </Badge>
                    </div>
                  </div>
                  <Separator />

                  <div>
                    <span className="text-xs text-muted-foreground">
                      Data de criação
                    </span>
                    <p className="font-medium">
                      {formatTime(data?.ticket.created_at)}
                    </p>
                  </div>
                  <Separator />

                  <div>
                    {data?.ticket.type === "ban_appeal" ? (
                      <>
                        <span className="text-xs text-muted-foreground">
                          Informação adicional
                        </span>
                        <div className="mt-2 space-y-1">
                          <p className="font-medium text-xs">
                            Banimento{" "}
                            {data?.banInfo?.ban ? "Temporario" : "Permanente"}
                          </p>
                          <p className="text-xs">
                            Motivo: {String(data?.banInfo?.motivo)}
                          </p>
                          <p className="text-xs">
                            Admin: {String(data?.banInfo?.adm)}
                          </p>
                          <p className="text-xs">
                            Data: {formatTime(data?.banInfo?.data)}
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        <span className="text-xs text-muted-foreground">
                          Informação adicional
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>

          <section className="flex-1 min-w-0 mt-7">
            <p>Ultima atualizacao: {formatTime(data?.ticket.updated_at)}</p>
            <div className=" p-6 ">
              <div className="space-y-6 ">
                {data?.messages.map((msg) => (
                  <div
                    key={msg.id}
                    className="flex gap-4  bg-primary-foreground p-4"
                  >
                    <Avatar className="h-10 w-10 shrink-0 rounded-full">
                      <AvatarImage src={msg.profile} />
                      <AvatarFallback>{msg.profile}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-blue-400">
                          <Link href={`/dashboard/users/${msg.author_accid}`}>
                            {msg.author}
                          </Link>
                        </span>
                        <Badge variant="secondary" className="text-xs">
                          {msg.role}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {formatTime(msg.updated_at)}
                        </span>
                        <span className="text-right text-xs text-muted-foreground">
                          {formatTime(msg.updated_at)}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-foreground">
                        {msg.message}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid w-full gap-2 mt-5  ">
                {status === "closed" || status === "open" && (
                  <>
                    <Textarea
                      className="h-40"
                      placeholder="Type your message here."
                    />
                  </>
                )}

                <div>

                  {showStatusAlert && (
                    <Alert
                      variant={`${status === "closed"  || status === "denied" ? "destructive" : "default"}`}
                      className={`${status === "accepted" ? "bg-green-700 text-white" : ""}  shadow-lg shadow-gray-400/30`}
                    >
                      <AlertCircleIcon />
                      <AlertTitle>Ticket fechado</AlertTitle>
                      <AlertDescription>
                        <span className="text-white">{RevisionType} {statusPT.toLowerCase()}</span>
                      </AlertDescription>
                    </Alert>
                  )}

                
                </div>
                <div className="flex flex-wrap gap-3">
                  {status === "open" && (
                    <Button className={baseActionButtonClassName}>
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
                  
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
