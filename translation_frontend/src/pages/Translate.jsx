import React, { useState, useContext } from "react";
import "./translate.css";
import Navbar from "../Components/Navbar";
import { MdOutlineCompareArrows } from "react-icons/md";
import LanguageSelector from "../Components/LanguageSelector";
import { SelectionQueryContext } from "../Components/SelectionQuery";

const Translate = () => {
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const [fromLanguage, setFromLanguage] = useState("");
  const [toLanguage, setToLanguage] = useState("");
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);
  const [error, setError] = useState(null);

  const contextValue = {
    fromLanguage,
    setFromLanguage,
    toLanguage,
    setToLanguage,
  };

  const handleTranslate = async () => {
    if (!inputText || !fromLanguage || !toLanguage) {
      setError("Please select languages and enter text");
      return;
    }

    setIsTranslating(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:3001/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: inputText,
          sourceLang: fromLanguage,
          targetLang: toLanguage,
        }),
      });

      if (!response.ok) throw new Error("Translation failed");

      const data = await response.json();
      setTranslatedText(data.translation);
    } catch (err) {
      console.error("Translation error:", err);
      setError(err.message);
    } finally {
      setIsTranslating(false);
    }
  };

  return (
    <SelectionQueryContext.Provider value={contextValue}>
      <div className="main">
        <Navbar />
        <div className="main_left">
          <textarea
            name="Input"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter text to translate"
            className="Textarea_top"
          />

          <div className="language-action-row">
            <span className="selected-language">
              {fromLanguage || "Select language"}
            </span>
            <div
              className="compare-arrows"
              onClick={(e) => {
                e.stopPropagation();
                setShowLanguageSelector(!showLanguageSelector);
              }}
            >
              <MdOutlineCompareArrows size={24} />
            </div>
            <span className="selected-language">
              {toLanguage || "Select language"}
            </span>
            <button className="translate-btn" onClick={handleTranslate} disabled={isTranslating}>
              {isTranslating ? "Translating..." : "Translate"}
            </button>
          </div>
          {showLanguageSelector && (
            <LanguageSelector onClose={() => setShowLanguageSelector(false)} />
          )}
          <textarea
            name="Output"
            value={translatedText}
            readOnly
            placeholder="Translation"
            className="Textarea_bottom"
          />
          {error && (
            <div className="error-message">
              Error: {error}
              <button onClick={() => setError(null)}>Dismiss</button>
            </div>
          )}
        </div>
      </div>
    </SelectionQueryContext.Provider>
  );
};

export default Translate;
