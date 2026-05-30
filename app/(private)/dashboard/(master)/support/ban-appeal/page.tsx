'use client';

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Field,
  FieldContent,
  FieldDescription as FormFieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { BanAppealSchema } from '@/schemas/banAppeal.schema';
import { trpc } from '@/trpc/client';
import { formatTime } from '@/utils/datatime/datetime.formater';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  CalendarClock,
  Clock3,
  FileWarning,
  Gavel,
  ScrollText,
  SendHorizonal,
  ShieldAlert,
  Siren,
  UserRound,
} from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useForm, useWatch } from 'react-hook-form';
import Link from 'next/link'


function formatRemainingTime(unbanTimestamp?: number | null) {
  const parsedTimestamp = Number(unbanTimestamp ?? 0);

  if (!parsedTimestamp) {
    return 'Sem prazo definido';
  }

  const remainingMs = parsedTimestamp * 1000 - Date.now();

  if (remainingMs <= 0) {
    return 'Prazo encerrado';
  }

  const totalMinutes = Math.floor(remainingMs / (1000 * 60));
  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutes = totalMinutes % 60;

  const parts: string[] = [];

  if (days > 0) {
    parts.push(`${days}d`);
  }

  if (hours > 0) {
    parts.push(`${hours}h`);
  }

  if (minutes > 0 || parts.length === 0) {
    parts.push(`${minutes}min`);
  }

  return parts.slice(0, 3).join(' ');
}

export default function BanAppealPage() {
  const { data: session } = useSession();
  const userId = Number(session?.user?.id);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<BanAppealSchema>({
    resolver: zodResolver(BanAppealSchema),
    defaultValues: {
      message: '',
    },
  });

  const { data, isLoading } = trpc.ticket.getBanInfo.useQuery(
    { userid: userId },
    {
      enabled: Number.isFinite(userId),
    },
  );

  const message = useWatch({
    control,
    name: 'message',
    defaultValue: '',
  });
  const messageLength = message.length;
  const isTemporaryBan = Number(data?.desban ?? 0) > 0;
  const appealTypeLabel = isTemporaryBan ? 'Temporário' : 'Permanente';
  const remainingTime = formatRemainingTime(data?.desban);
  const banDate = formatTime(data?.data);
  const unbanDate = isTemporaryBan
    ? formatTime(Number(data?.desban ?? 0) * 1000)
    : 'Sem expiração';
  const playerName = data?.Nick ?? data?.player?.Nome ?? '--';

  const details = [
    {
      icon: Gavel,
      label: 'Admin responsável',
      value: (<><Link className='hover:cursor-pointer text-blue-600 ' href={`/dashboard/users/${data?.adminid}`}>{data?.adm}</Link></>) ,
    },
    {
      icon: UserRound,
      label: 'Nick registrado',
      value: (<><Link className='hover:cursor-pointer text-blue-600' href={`/dashboard/users/${data?.player.id}`}>{playerName}</Link></>),
    },
    {
      icon: FileWarning,
      label: 'Motivo do banimento',
      value: data?.motivo ?? '--',
    },
    {
      icon: CalendarClock,
      label: 'Aplicado em',
      value: banDate,
    },
  ];

  function onSubmit(payload: BanAppealSchema) {
    console.log(payload);
    reset();
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,rgba(239,68,68,0.18),transparent_30%),linear-gradient(180deg,rgba(9,9,11,1)_0%,rgba(3,7,18,1)_100%)]">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[32px_32px] opacity-20" />
      <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-red-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="pt-6 pb-8">
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
              <BreadcrumbPage>Ban Appeal</BreadcrumbPage>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <Card className="border-red-500/20 bg-zinc-950/75 shadow-2xl shadow-red-950/20 backdrop-blur-sm">
          <CardContent className="p-0">
            <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[minmax(0,1.2fr)_320px]">
              <div className="space-y-5">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex size-14 items-center justify-center rounded-2xl border border-red-400/20 bg-red-500/10 text-red-100 shadow-lg shadow-red-950/20">
                    <ShieldAlert className="size-7" />
                  </div>
                  <Badge
                    variant="outline"
                    className="border-red-400/30 bg-red-500/10 px-3 py-1 text-red-100"
                  >
                    Revisão de banimento
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-white/10 bg-white/5 px-3 py-1 text-zinc-200"
                  >
                    {appealTypeLabel}
                  </Badge>
                </div>

                <div className="space-y-3">
                  <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                    Defenda seu caso com contexto claro, provas e objetividade.
                  </h1>
                  <p className="max-w-2xl text-sm leading-6 text-zinc-300 sm:text-base">
                    Esta área é dedicada à criação de revisões de banimento.
                    Informe o que aconteceu, explique seu ponto de vista e
                    anexe no texto qualquer contexto que ajude a equipe a
                    revisar sua situação com mais precisão.
                  </p>
                </div>
              </div>

              <div className="grid gap-3 self-start">
                <div className="rounded-2xl border border-white/10 bg-white/4 p-4">
                  <p className="text-xs uppercase tracking-[0.28em] text-zinc-500">
                    Caso
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-white">
                    #{data?.banid ?? '--'}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/4 p-4">
                  <p className="text-xs uppercase tracking-[0.28em] text-zinc-500">
                    Status
                  </p>
                  <p className="mt-2 text-lg font-medium text-zinc-100">
                    {isLoading
                      ? 'Carregando...'
                      : data
                        ? 'Pronto para revisão'
                        : 'Sem banimento ativo'}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/4 p-4">
                  <p className="text-xs uppercase tracking-[0.28em] text-zinc-500">
                    Tempo restante
                  </p>
                  <p className="mt-2 text-lg font-medium text-zinc-100">
                    {isLoading
                      ? 'Carregando...'
                      : isTemporaryBan
                        ? remainingTime
                        : 'Sem expiração'}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <main className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(340px,0.9fr)]">
          <Card className="border-white/10 bg-zinc-950/80 shadow-xl shadow-black/30 backdrop-blur-sm">
            <CardHeader className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex size-11 items-center justify-center rounded-2xl border border-red-400/20 bg-red-500/10 text-red-100">
                  <ScrollText className="size-5" />
                </div>
                <div>
                  <CardTitle className="text-white">Resumo do banimento</CardTitle>
                  <CardDescription className="text-zinc-400">
                    Dados usados pela equipe para analisar sua revisão.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {isLoading ? (
                <div className="grid gap-3 sm:grid-cols-2">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div
                      key={index}
                      className="h-28 animate-pulse rounded-2xl border border-white/10 bg-white/4"
                    />
                  ))}
                </div>
              ) : data ? (
                <>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {details.map(({ icon: Icon, label, value }) => (
                      <div
                        key={label}
                        className="rounded-2xl border border-white/10 bg-white/4 p-4 shadow-inner shadow-black/20"
                      >
                        <div className="mb-3 flex items-center gap-3">
                          <div className="flex size-10 items-center justify-center rounded-xl border border-white/10 bg-black/20 text-zinc-200">
                            <Icon className="size-4" />
                          </div>
                          <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
                            {label}
                          </p>
                        </div>
                        <p className="text-sm font-medium leading-6 text-zinc-100">
                          {value}
                        </p>
                      </div>
                    ))}
                  </div>

                  <Separator className="bg-white/10" />

                  <div className="grid gap-3 sm:grid-cols-3">
                    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                      <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
                        Tipo
                      </p>
                      <p className="mt-2 text-base font-semibold text-white">
                        {appealTypeLabel}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                      <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
                        Encerramento
                      </p>
                      <p className="mt-2 text-base font-semibold text-white">
                        {unbanDate}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                      <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
                        Situação atual
                      </p>
                      <p className="mt-2 text-base font-semibold text-white">
                        {isTemporaryBan ? remainingTime : 'Aguardando revisão'}
                      </p>
                    </div>
                  </div>

                  <Alert
                    className={
                      isTemporaryBan
                        ? 'border-amber-500/20 bg-amber-500/10 text-amber-50'
                        : 'border-red-500/20 bg-red-500/10 text-red-50'
                    }
                  >
                    {isTemporaryBan ? (
                      <Clock3 className="size-4" />
                    ) : (
                      <Siren className="size-4" />
                    )}
                    <AlertTitle>
                      {isTemporaryBan
                        ? 'Banimento temporário ativo'
                        : 'Banimento permanente registrado'}
                    </AlertTitle>
                    <AlertDescription
                      className={
                        isTemporaryBan ? 'text-amber-100/80' : 'text-red-100/80'
                      }
                    >
                      {isTemporaryBan
                        ? `Tempo restante aproximado: ${remainingTime}. Use a apelação para trazer contexto e provas objetivas.`
                        : 'Como o banimento é permanente, vale ser especialmente claro, respeitoso e detalhado ao apresentar sua versão.'}
                    </AlertDescription>
                  </Alert>
                </>
              ) : (
                <Alert className="border-white/10 bg-white/4 text-zinc-100">
                  <ShieldAlert className="size-4" />
                  <AlertTitle>Nenhum banimento encontrado</AlertTitle>
                  <AlertDescription className="text-zinc-400">
                    Não localizamos um registro de banimento para a conta atual.
                    Se isso estiver incorreto, vale revisar sua sessão ou falar
                    com a equipe de suporte.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-zinc-950/80 shadow-xl shadow-black/30 backdrop-blur-sm">
            <CardHeader className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex size-11 items-center justify-center rounded-2xl border border-red-400/20 bg-red-500/10 text-red-100">
                  <SendHorizonal className="size-5" />
                </div>
                <div>
                  <CardTitle className="text-white">Escreva sua apelação</CardTitle>
                  <CardDescription className="text-zinc-400">
                    Um bom texto acelera a análise e evita idas e voltas.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-5">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <p className="text-sm font-medium text-white">
                    Explique o contexto
                  </p>
                  <p className="mt-2 text-sm leading-6 text-zinc-400">
                    Conte o que aconteceu antes do banimento e onde acredita que
                    houve equívoco.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <p className="text-sm font-medium text-white">
                    Use provas concretas
                  </p>
                  <p className="mt-2 text-sm leading-6 text-zinc-400">
                    Logs, horários, prints e detalhes verificáveis ajudam muito
                    mais do que textos genéricos.
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <Field>
                  <FieldContent className="space-y-3">
                    <div className="flex items-center justify-between gap-4">
                      <FieldLabel
                        htmlFor="appeal-message"
                        className="text-sm font-medium text-zinc-100"
                      >
                        Comentário e contra-provas
                      </FieldLabel>
                      <span
                        className={`text-xs ${
                          messageLength > 1800
                            ? 'text-amber-300'
                            : 'text-zinc-500'
                        }`}
                      >
                        {messageLength}/2000
                      </span>
                    </div>

                    <FormFieldDescription className="text-sm leading-6 text-zinc-400">
                      Descreva sua versão dos fatos com calma. Evite mensagens
                      muito curtas e prefira informações que possam ser
                      verificadas pela equipe.
                    </FormFieldDescription>

                    <Textarea
                      id="appeal-message"
                      {...register('message')}
                      placeholder="Explique por que esse banimento deve ser revisado e inclua o máximo de contexto útil."
                      className="min-h-55 resize-none border-white/10 bg-black/30 px-4 py-3 text-sm leading-6 text-zinc-100 placeholder:text-zinc-500 focus-visible:border-red-400/40 focus-visible:ring-red-500/20"
                    />

                    <FieldError errors={[errors.message]} />
                  </FieldContent>
                </Field>

                <Alert className="border-white/10 bg-white/4 text-zinc-100">
                  <ShieldAlert className="size-4" />
                  <AlertTitle>Análise manual</AlertTitle>
                  <AlertDescription className="text-zinc-400">
                    O histórico do banimento já é vinculado automaticamente ao
                    pedido. Use este espaço para complementar o caso, não para
                    repetir campos técnicos.
                  </AlertDescription>
                </Alert>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="max-w-sm text-sm leading-6 text-zinc-400">
                    Seja objetivo, respeitoso e focado nos fatos. Isso aumenta
                    a qualidade da análise.
                  </p>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={!data || isLoading || isSubmitting}
                    className="h-11 rounded-xl bg-red-600 hover:cursor-pointer  px-5 text-white shadow-lg shadow-red-950/40 transition-transform hover:bg-red-500 hover:shadow-red-900/40"
                  >
                    <SendHorizonal className="size-4 hover:rotate-45 hover:transition-discrete " />
                    Criar apelação
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
