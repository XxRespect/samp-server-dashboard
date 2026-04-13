
import { UserType } from "../user/user.type";


export interface DashBoardDataResponse {
    totalPlayers: number;
    totalClans: number;
    totalBanned: number;
    totalPcPlayers: number;
    totalMobiles: number;
    totalOthers: number;
    topScorePlayers: UserType[];
}