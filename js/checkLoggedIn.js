document.addEventListener('DOMContentLoaded', function () {
    const token = localStorage.getItem('token');
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
        document.getElementById("languageSelect").textContent = savedLanguage === 'en' ? 'English' : 'ภาษาไทย';
        changeLanguage();
    }

    if (token) {
        document.getElementById('btn_login').style.display = 'none';
        document.getElementById('btn_register').style.display = 'none';
        document.getElementById('btn_logout').style.display = 'block';
    } else {
        document.getElementById('btn_login').style.display = 'block';
        document.getElementById('btn_register').style.display = 'block';
        document.getElementById('btn_logout').style.display = 'none';
    }
});
