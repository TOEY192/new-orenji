function change(){
    const languageSelect = document.getElementById('languageSelect');
    let currentLanguage = languageSelect.textContent.trim();
    const newLanguage = currentLanguage === 'English' ? 'th' : 'en';
    languageSelect.textContent = newLanguage === 'en' ? 'English' : 'ภาษาไทย';
    const language = newLanguage;
    localStorage.setItem("language", language);
}