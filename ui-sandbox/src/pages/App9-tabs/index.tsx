import Tabs from "./Tabs";

export interface TechDataProp {
  label: string;
  content: React.ReactNode;
}

const tabData: TechDataProp[] = [
  {
    label: "Profile",
    content: (
      <div>
        <h2 className="text-xl font-bold">User Profile</h2>
        <p>This section contains user profile information.</p>
      </div>
    ),
  },
  {
    label: "Settings",
    content: (
      <form>
        <label>Theme:</label>
        <select className="p-2 border rounded">
          <option>Dark</option>
          <option>Light</option>
        </select>
      </form>
    ),
  },
  {
    label: "Dashboard",
    content: <p>Welcome to your dashboard!</p>,
  },
];

function App() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl mb-4">My Application Tabs</h1>
      <div className="border rounded p-4">
        <Tabs tabs={tabData} />
      </div>
    </div>
  );
}

export default App;
