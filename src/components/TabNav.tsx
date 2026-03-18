import SketchyButton from "./SketchyButton";

interface TabNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: "home", label: "~/home" },
  { id: "projects", label: "~/projects" },
  { id: "blog", label: "~/blog" },
  { id: "about", label: "~/about" },
  { id: "contact", label: "~/contact" },
];

const TabNav = ({ activeTab, onTabChange }: TabNavProps) => {
  return (
    <nav className="flex flex-wrap gap-2 md:gap-3">
      {tabs.map((tab) => (
        <SketchyButton
          key={tab.id}
          active={activeTab === tab.id}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </SketchyButton>
      ))}
    </nav>
  );
};

export default TabNav;
