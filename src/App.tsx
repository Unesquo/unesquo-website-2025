import React, { useState } from 'react';
import { SeniorsList } from './pages/SeniorsList';
import { SeniorTribute } from './pages/SeniorTribute';
import { seniors } from './data/seniors';

type ViewMode = 'list' | 'tribute';

function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('list');
  const [selectedSenior, setSelectedSenior] = useState<string | null>(null);

  const handleSeniorSelect = (slug: string) => {
    setSelectedSenior(slug);
    setCurrentView('tribute');
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedSenior(null);
  };

  const currentSenior = selectedSenior ? seniors[selectedSenior as keyof typeof seniors] : null;

  return (
    <div className="App">
      {currentView === 'list' && (
        <SeniorsList onSeniorSelect={handleSeniorSelect} />
      )}
      
      {currentView === 'tribute' && currentSenior && selectedSenior && (
        <SeniorTribute 
          senior={currentSenior} 
          seniorSlug={selectedSenior}
          onBack={handleBackToList}
        />
      )}
    </div>
  );
}

export default App;