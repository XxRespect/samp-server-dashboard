
import { Badge } from "@/components/ui/badge"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { ChartNoAxesCombined } from 'lucide-react';
type CardProps = {
    title: string,
    description:string,
    header: string
}


import { FaUsers } from 'react-icons/fa'

const ServerCards = () => {

    return (
        <>
            <div className=" gap-4 m-5 w-90">
                <Card >
                    <CardHeader className=''>
                        <CardTitle>Total Accounts</CardTitle>
                        <CardAction><Badge variant="secondary">Up to 2 <ChartNoAxesCombined /></Badge></CardAction>
                    </CardHeader>
                    <CardContent>
                        <p><FaUsers />1.456.144</p>
                    </CardContent>
                    <CardFooter>
                        <p>Brasil RP</p>
                    </CardFooter>
                </Card>
            </div>
        </>
    )
}

export default ServerCards