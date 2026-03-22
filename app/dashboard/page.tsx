import { PlayersChart } from "@/components/appBarChat";
import { ServerActivityChart } from "@/components/AppAreaChart"

export function DashboardPage() {

    return (
        <>
            <div className='grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4'>
                <div className="bg-primary-foreground p-4 rounded-lg m-3 lg:col-span-2"><PlayersChart /> </div>
                <div className="bg-primary-foreground p-4 rounded-lg m-3"></div>
                <div className="bg-primary-foreground p-4 rounded-lg m-3">teste</div>
                <div className="bg-primary-foreground p-4 rounded-lg m-3">teste</div>
                <div className="bg-primary-foreground p-4 rounded-lg m-3 lg:col-span-2"><ServerActivityChart /></div>
                <div className="bg-primary-foreground p-4 rounded-lg m-3">teste</div>
            </div>
        </>
    )
}


export default DashboardPage;