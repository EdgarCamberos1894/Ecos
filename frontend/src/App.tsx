import Popup from "./shared/PopUp";
import { useState } from "react";
import Header from "./shared/Header";
import RoleSelector from "./auth/components/RoleSelector";

function App() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <div>
      <Header
        onOpenPopup={() => {
          setIsPopupOpen(true);
        }}
      />
      <Popup
        isOpen={isPopupOpen}
        onClose={() => {
          setIsPopupOpen(false);
        }}
        normalText="Registrate en "
        highlightedText=" ECOS"
      >
        <RoleSelector />
      </Popup>
    </div>
  );
}

export default App;
