import { GetStartedItem } from "@/app/_content/homeContent";
import {
  ArrowUpTrayIcon,
  ArrowRightIcon,
  TableCellsIcon,
  RectangleGroupIcon,
} from "@heroicons/react/24/outline";

const iconMap = {
  ArrowRight: ArrowRightIcon,
  Upload: ArrowUpTrayIcon,
  Table: TableCellsIcon,
  Enrich: RectangleGroupIcon,
};

interface GetStartedSectionProps {
  items: GetStartedItem[];
}

export function GetStartedSection({ items }: GetStartedSectionProps) {
  return (
    <section className="bg-background-light p-8 rounded-lg shadow-lg w-fit mx-auto">
      <h3 className="text-2xl font-semibold text-text-dark mb-6">
        Getting Started
      </h3>
      <ul className="space-y-4">
        {items.map((item, index) => {
          const Icon = iconMap[item.iconName as keyof typeof iconMap];
          return (
            <li
              key={index}
              className="flex items-center space-x-3 text-text-darkLigth"
            >
              <span className="text-primary-500">
                <Icon className="w-6 h-6" />
              </span>
              <span>{item.text}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
