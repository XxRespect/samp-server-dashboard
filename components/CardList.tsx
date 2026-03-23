import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card"

import Image from 'next/image'

type PopularContentItem = {
  id: number
  title: string
  badge: string
  image: string
  count: number
}

type LatestTransactionItem = {
  id: number
  title: string
  category: string
  image: string
  amount: string
  date: string
  status: string
}

type CardListProps = {
  title: string
}

const popularContent: PopularContentItem[] = [
    {
        id: 1,
        title:"Image Generation with an AI",
        badge: "Coding",
        image: "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg",
        count:345

    },
    {
        id: 2,
        title: "Building a Dashboard with Next.js",
        badge: "Frontend",
        image: "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg",
        count: 289
    },
    {
        id: 3,
        title: "Understanding React Server Components",
        badge: "React",
        image: "https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg",
        count: 421
    },
    {
        id: 4,
        title: "UI Design Principles for Modern Apps",
        badge: "Design",
        image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg",
        count: 198
    },
    {
        id: 5,
        title: "Automating Workflows with AI Agents",
        badge: "AI",
        image: "https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg",
        count: 367
    },
    {
        id: 6,
        title: "Data Visualization Best Practices",
        badge: "Analytics",
        image: "https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg",
        count: 254
    },
    {
        id: 7,
        title: "API Integration for Beginners",
        badge: "Backend",
        image: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg",
        count: 310
    },
    {
        id: 8,
        title: "Deploying Full Stack Apps",
        badge: "DevOps",
        image: "https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg",
        count: 276
    },
    {
        id: 9,
        title: "Improving App Performance",
        badge: "Performance",
        image: "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg",
        count: 332
    }
]

const latestTransactions: LatestTransactionItem[] = [
    {
        id: 1,
        title: "Adobe Creative Cloud",
        category: "Subscription",
        image: "https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg",
        amount: "$29.99",
        date: "2026-03-23",
        status: "Paid"
    },
    {
        id: 2,
        title: "Figma Pro Team",
        category: "Software",
        image: "https://images.pexels.com/photos/326503/pexels-photo-326503.jpeg",
        amount: "$18.00",
        date: "2026-03-22",
        status: "Paid"
    },
    {
        id: 3,
        title: "AWS Hosting",
        category: "Cloud",
        image: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg",
        amount: "$74.50",
        date: "2026-03-21",
        status: "Pending"
    },
    {
        id: 4,
        title: "Slack Business",
        category: "Communication",
        image: "https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg",
        amount: "$12.99",
        date: "2026-03-20",
        status: "Paid"
    },
    {
        id: 5,
        title: "Notion Plus",
        category: "Productivity",
        image: "https://images.pexels.com/photos/6476589/pexels-photo-6476589.jpeg",
        amount: "$10.00",
        date: "2026-03-19",
        status: "Paid"
    },
    {
        id: 6,
        title: "Vercel Pro",
        category: "Deployment",
        image: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg",
        amount: "$20.00",
        date: "2026-03-18",
        status: "Pending"
    },
    {
        id: 7,
        title: "GitHub Copilot",
        category: "Developer Tools",
        image: "https://images.pexels.com/photos/160107/pexels-photo-160107.jpeg",
        amount: "$10.00",
        date: "2026-03-17",
        status: "Paid"
    },
    {
        id: 8,
        title: "Google Workspace",
        category: "Workspace",
        image: "https://images.pexels.com/photos/1591060/pexels-photo-1591060.jpeg",
        amount: "$14.40",
        date: "2026-03-16",
        status: "Paid"
    }
]


const CardList = ({ title }: CardListProps) => {
    const isPopularContent = title === "High Score"

  return (
    <div>
        <h1 className='text-lg font-medium mb-6 bg-primary-foreground'>{title}</h1>
        <div className='flex flex-col gap-2'>
            {isPopularContent ? (
              popularContent.map((item) => (
                <Card key={item.id} className='flex-row items-center gap-4 p-4'>
                    <div className='relative h-12 w-12 shrink-0 overflow-scroll rounded-sm'>
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className='object-cover'
                          sizes='48px'
                        />
                    </div>
                    <CardContent className='flex-1 px-0'>
                        <CardTitle>{item.title}</CardTitle>
                        <CardDescription>{item.badge}</CardDescription>
                    </CardContent>
                    <CardFooter className='border-t-0 bg-transparent p-0'>
                        <span className='text-sm font-medium'>
                          {`${(item.count / 1000).toFixed(1)}K`}
                        </span>
                    </CardFooter>
                </Card>
              ))
            ) : (
              latestTransactions.map((item) => (
                <Card key={item.id} className='flex-row items-center gap-4 p-4'>
                    <div className='relative h-12 w-12 shrink-0 overflow-hidden rounded-sm'>
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          
                          sizes='48px'
                        />
                    </div>
                    <CardContent className='flex-1 px-0'>
                        <CardTitle>{item.title}</CardTitle>
                        <CardDescription>{item.category}</CardDescription>
                    </CardContent>
                    <CardFooter className='border-t-0 bg-transparent p-0'>
                        <span className='text-sm font-medium'>{item.amount}</span>
                    </CardFooter>
                </Card>
              ))
            )}
        </div>
    </div>
  )
}

export default CardList
