import { PlayersChart } from "@/components/appBarChat";
import { ServerActivityChart } from "@/components/AppAreaChart"
import ChartPieDonutText from "@/components/AppPieChart";
import  CardList  from "@/components/CardList"
import ServerCards from "@/components/ServerCards";


export function DashboardPage() {

    return (
        <>
            <div className='grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4'>
                <div className="flex w-full justify-center bg-primary-foreground p-4 rounded-lg m-3 lg:col-span-4"> 

                    <ServerCards />
                    <ServerCards />
                    <ServerCards />
                </div>
                <div className="bg-primary-foreground p-4 rounded-lg m-3 lg:col-span-2"><PlayersChart /> </div>
                <div className="bg-primary-foreground p-4 rounded-lg m-3"><ChartPieDonutText /></div>
                <div className="bg-primary-foreground p-4 rounded-lg m-3"><CardList title="Raking"/></div>
                <div className="bg-primary-foreground p-4 rounded-lg m-3">teste</div>
                <div className="bg-primary-foreground p-4 rounded-lg m-3 lg:col-span-2 xl:col-span-1 2xl:col-span-2"><ServerActivityChart /></div>
                <div className="bg-primary-foreground p-4 rounded-lg m-3"><CardList title="High Score"/></div>
            </div>
        </>
    )
}


export default DashboardPage;