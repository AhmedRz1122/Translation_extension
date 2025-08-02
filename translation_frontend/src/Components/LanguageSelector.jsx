import React, { useEffect, useRef, useContext } from 'react'
import { MdOutlineCompareArrows } from 'react-icons/md'
import './LanguageSelector.css'
import { SelectionQueryContext } from './SelectionQuery'

const LanguageSelector = ({ onClose }) => {
  const { setFromLanguage, setToLanguage } = useContext(SelectionQueryContext);
  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [onClose]);

  const languages = [
    'English', 'Spanish', 'French',
    'German', 'Italian', 'Chinese',
    'Japanese', 'Korean', 'Russian'
  ]

  return (
    <div className='popup-overlay'>
      <div className='Popup_Selector' ref={popupRef}>
        <input type="text" className='language-input' placeholder='From language' />
        <div className='language-row'>
          {languages.slice(0, 3).map((lang, index) => (
            <button key={index} className='language-button' onClick={() => { setFromLanguage(lang); onClose(); }}>{lang}</button>
          ))}
        </div>
        <div className='language-row'>
          {languages.slice(3, 6).map((lang, index) => (
            <button key={index} className='language-button' onClick={() => { setFromLanguage(lang); onClose(); }}>{lang}</button>
          ))}
        </div>
        <div className='language-row'>
          {languages.slice(6, 9).map((lang, index) => (
            <button key={index} className='language-button' onClick={() => { setFromLanguage(lang); onClose(); }}>{lang}</button>
          ))}
        </div>
        <div className='swap-icon'>
          <MdOutlineCompareArrows size={24} />
        </div>
        <input type="text" className='language-input' placeholder='To language' />
        <div className='language-row'>
          {languages.slice(0, 3).map((lang, index) => (
            <button key={index} className='language-button' onClick={() => { setToLanguage(lang); onClose(); }}>{lang}</button>
          ))}
        </div>
        <div className='language-row'>
          {languages.slice(3, 6).map((lang, index) => (
            <button key={index} className='language-button' onClick={() => { setToLanguage(lang); onClose(); }}>{lang}</button>
          ))}
        </div>
        <div className='language-row'>
          {languages.slice(6, 9).map((lang, index) => (
            <button key={index} className='language-button' onClick={() => { setToLanguage(lang); onClose(); }}>{lang}</button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LanguageSelector
