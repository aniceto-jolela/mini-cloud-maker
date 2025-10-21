import MinioControl from "../components/MinioControl";
import FileUpload from "../components/FileUpload";
import FileList from "../components/FileList";
import StatsPanel from "../components/StatsPanel";

export default function Dashboard({ onLogout }) {
  return (
    <div className="p-6 max-w-xl mx-auto text-center">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">🌩️ Mini Cloud Maker</h1>
        <button
          onClick={onLogout}
          className="bg-gray-300 text-black px-3 py-1 rounded hover:bg-gray-400"
        >
          Sair
        </button>
      </div>
       <MinioControl />
      <FileUpload onUploadComplete={() => window.location.reload()} />
      <FileList />
      <StatsPanel />
    </div>
  );
}
