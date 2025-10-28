import MinioControl from "../components/MinioControl";
//import FileUpload from "../components/FileUpload";
//import FileList from "../components/FileList";
//import StatsPanel from "../components/StatsPanel";
import SettingsPanel from "../components/SettingsPanel";
import StoragePathSelector from "../components/StoragePathSelector";
import UserManagement from "../components/UserManagement";
import FileListWithActions from "../components/FileListWithActions";
import LogsViewer from "../components/LogsViewer";

export default function Dashboard({ onLogout }) {
  return (
    <div className="p-6 max-w-xl mx-auto text-center">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Mini Cloud Maker</h1>
        <button
          onClick={onLogout}
          className="bg-gray-300 text-black px-3 py-1 rounded hover:bg-gray-400"
        >
          Sair
        </button>
      </div>
       <MinioControl />
      <SettingsPanel />
      <StoragePathSelector />
      <UserManagement />
      <FileListWithActions bucket={"default"} />
      <LogsViewer />
    </div>
  );
}
