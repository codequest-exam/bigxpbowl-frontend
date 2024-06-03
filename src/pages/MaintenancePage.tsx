import { useEffect, useState } from "react";
import MaintenanceList from "../components/MaintenanceTable";
import { getMaintainables } from "../services/apiFacade";
import { Maintainable } from "../interfaces/equipmentInterface";

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