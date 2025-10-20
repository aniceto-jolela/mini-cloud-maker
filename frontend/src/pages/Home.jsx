import FileUpload from "../components/FileUpload";
import FileList from "../components/FileList";
import StatsPanel from "../components/StatsPanel";


export default function Home(){

return (
  <div className="p-6 max-w-xl mx-auto text-center">
      <h1 className="text-2xl font-bold mb-4">🌩️ Mini Cloud Maker</h1>
      <FileUpload onUploadComplete={() => window.location.reload()} />
      <FileList />
      <StatsPanel />
    </div>
  );
}