const translations = {
    en: {
        home: "Home",
        search: "Search",
        myBooking: "My Booking",
        login: "Login",
        register: "Register",
        logout: "Logout",

        flight: 'Flight:',
        detail: 'Detail:',
        to: 'to',
        tto: 'to',
        totalPrice: 'totalPrice: ',
        confirm: 'Confirm',

        loading: 'Loading flight details...'
    },
    th: {
        home: "หน้าแรก",
        search: "ค้นหาเที่ยวบิน",
        myBooking: "การจองของฉัน",
        login: "เข้าสู่ระบบ",
        register: "สมัครสมาชิก",
        logout: "ออกจากระบบ",
        
        flight: 'เที่ยวบิน:',
        detail: 'รายละเอียด:',
        to: 'ไป',
        tto: 'ถึง',
        totalPrice: 'ราคาทั้งหมด: ',
        confirm: 'ยืนยัน',

        loading: 'กำลังโหลด...'
    }
}

function changeLanguage() {
    const languageSelect = document.getElementById('languageSelect');
    let currentLanguage = languageSelect.textContent.trim();
    const language = currentLanguage === 'English' ? 'en' : 'th';
    localStorage.setItem("language", language);

    // Navigation Bar
    document.querySelector('a[href="index.html"]').textContent = translations[language].home;
    document.querySelector('a[href="search.html"]').textContent = translations[language].search;
    document.querySelector('a[href="mybooking.html"]').textContent = translations[language].myBooking;
    document.querySelector('#btn_login a').textContent = translations[language].login;
    document.querySelector('#btn_register a').textContent = translations[language].register;
    document.querySelector('#btn_logout a').textContent = translations[language].logout;

    document.getElementById('flights').textContent = translations[language].flight;
    document.getElementById('detail').textContent = translations[language].detail;
    document.getElementById('to').textContent = translations[language].to;
    document.getElementById('tto').textContent = translations[language].tto;
    document.getElementById('totalPrice').textContent = translations[language].totalPrice;
    document.getElementById('confirm').textContent = translations[language].confirm;

    document.getElementById('loading-text').textContent = translations[language].loading;
}
