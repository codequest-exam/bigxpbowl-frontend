import { useEffect, useState } from "react";
import MaintenanceList from "../components/MaintenanceTable";
import { getMaintainables } from "../services/apiFacade";

// export interface Maintainables {
//   bowlingLanes: BowlingLane[];
//   airHockeyTables: AirHockeyTable[];
//   diningTables: DiningTable[];
// }

// export interface BowlingLane {
//   laneNumber: number;
//   maintenance: boolean;
//   childFriendly: boolean;
// }

// export interface AirHockeyTable {
//   tableNumber: number;
//   maintenance: boolean;
// }
// export interface DiningTable extends AirHockeyTable {}

export interface Maintainable {
  laneNumber?: number;
  tableNumber?: number;
  maintenance: boolean;
  childFriendly?: boolean;
  activityType: "DINING" | "BOWLING" | "AIRHOCKEY" | "CHILDBOWLING";
}





export default function MaintenancePage() {

    const [maintainables, setMaintainables] = useState<Maintainable[]>([]);
    // const [maintainables, setMaintainables] = useState<Maintainables|null>(null);

    // console.log("maintainables", maintainables);
    
    useEffect(() => {
        async function makeFetch() {
            const maintainablesList = await getMaintainables();
            setMaintainables(maintainablesList);
        }
        makeFetch();
    
    }, []);

    return <MaintenanceList maintainables={maintainables} setMaintainables={setMaintainables} />;
    
}