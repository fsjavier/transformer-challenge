import { Header } from "@/app/_components/HomeTitle";
import { GetStartedSection } from "@/app/_components/GetStarted";
import { homeContent } from "@/app/_content/homeContent";

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <Header title={homeContent.title} subtitle={homeContent.subtitle} />
      <GetStartedSection items={homeContent.getStartedItems} />
    </div>
  );
}
