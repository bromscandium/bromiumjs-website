import TabRow from "@/components/rows/TabRow.tsx";
import {useRoute} from "bromium";
import './styles/Tabs.css';

export default function Tabs() {
  const route = useRoute();

  return (
    <div className="tabs-layout">
      <TabRow city={route.value.query.city as string} />
    </div>
  );
}
