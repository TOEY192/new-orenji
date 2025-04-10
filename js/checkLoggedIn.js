document.addEventListener('DOMContentLoaded', async function () {

    const is_login = await fetch('/check-login');
    
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
        document.getElementById("languageSelect").textContent = savedLanguage === 'en' ? 'English' : 'ภาษาไทย';
        changeLanguage();
    }

    if (is_login.ok) {
        document.getElementById('btn_login').style.display = 'none';
        document.getElementById('btn_register').style.display = 'none';
        document.getElementById('btn_logout').style.display = 'block';
    } else {
        document.getElementById('btn_login').style.display = 'block';
        document.getElementById('btn_register').style.display = 'block';
        document.getElementById('btn_logout').style.display = 'none';
    }
});
