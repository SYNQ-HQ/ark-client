import MissionCards from "@/components/ark/MissionCards";
import ImpactStats from "@/components/ark/ImpactStats";

export default function Impact() {
  return (
    <main data-testid="impact-page">
      <ImpactStats />
      <MissionCards />
    </main>
  );
}
