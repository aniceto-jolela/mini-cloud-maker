import React, { useState } from "react";
import MinioControl from "../components/MinioControl";
//import StatsPanel from "../components/StatsPanel";
import SettingsPanel from "../components/SettingsPanel";
import StoragePathSelector from "../components/StoragePathSelector";
import UserManagement from "../components/UserManagement";
import BucketManager from "../components/BucketManager";
import FileListWithActions from "../components/FileListWithActions";
import LogsViewer from "../components/LogsViewer";
import ActiveLinksPanel from "../components/ActiveLinksPanel";
import { useActiveLinksCount } from "../hooks/useActiveLinksCount";

export default function Dashboard({ onLogout }) {
  const [selectedBucket, setSelectedBucket] = useState("default");
  const [showLinksPanel, setShowLinksPanel] = useState(false);
  const { count, animate, expiresInText  } = useActiveLinksCount(10000); // atualiza a cada 10s

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
      <BucketManager onSelect={setSelectedBucket} />
      <FileListWithActions bucket={selectedBucket} />
      <LogsViewer />
      <div className="mt-4">
        <button
          onClick={() => setShowLinksPanel(true)}
          className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition
            ${animate ? "animate-pulse ring-2 ring-blue-300" : ""}`}
        >
          Ver Links Ativos {count > 0 && `(${count})`}
        </button>

        {count > 0 && expiresInText && (
          <p className="text-sm text-gray-600 mt-1">
            {count} {count === 1 ? "link ativo" : "links ativos"} — {expiresInText}
          </p>
        )}
      </div>
      {showLinksPanel && <ActiveLinksPanel onClose={() => setShowLinksPanel(false)} />}
    </div>
  );
}
