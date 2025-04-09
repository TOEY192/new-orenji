const translations = {
    en: {
        home: "Home",
        search: "Search",
        myBooking: "My Booking",
        login: "Login",
        register: "Register",
        logout: "Logout",
        findFlight: "Find Your Flight",
        searchFlights: "Search Flights",
        departureTime: 'Departure Time: ',
        arrivalTime: 'Arrival Time: ',
        flight: "Flight: ",
        eco: '(Economy)',
        busi: '(Business)',
        fclass: '(First Class)',
        price: 'Price: ',
        selectFlight: "Select Flight",
    },
    th: {
        home: "หน้าแรก",
        search: "ค้นหาเที่ยวบิน",
        myBooking: "การจองของฉัน",
        login: "เข้าสู่ระบบ",
        register: "สมัครสมาชิก",
        logout: "ออกจากระบบ",
        findFlight: "ค้นหาเที่ยวบินของคุณ",
        searchFlights: "ค้นหาเที่ยวบิน",
        departureTime: 'เวลาออกเดินทาง: ',
        arrivalTime: 'เวลาเดินทางถึง: ',
        flight: "เที่ยวบิน: ",
        eco: '(ชั้นประหยัด)',
        busi: '(ชั้นธุรกิจ)',
        fclass: '(ชั้นหนึ่ง)',
        price: 'ราคา: ',
        selectFlight: "  เลือก  ",
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

    // Booking Section
    document.getElementById('findFlight').textContent = translations[language].findFlight;
    document.getElementById('searchFlights').textContent = translations[language].searchFlights;

    const cname = document.getElementById('cname') || '';
    if (cname !== '') {
        const classname = cname.className;
        setTimeout(() => {
            document.getElementById('flight').textContent = translations[language].flight;
            document.getElementsByClassName(classname)[0].textContent = translations[language][classname];

            document.getElementById('departureTime').textContent = translations[language].departureTime;
            document.getElementById('arrivalTime').textContent = translations[language].arrivalTime;
            document.getElementById('price').textContent = translations[language].price;
            document.getElementById('selectFlight').textContent = translations[language].selectFlight;
        }, 100);
    }
}

function changeLanguageSearch() {
    const languageSelect = document.getElementById('languageSelect');
    let currentLanguage = languageSelect.textContent.trim();
    const language = currentLanguage === 'English' ? 'en' : 'th';
    localStorage.setItem("language", language);

    setTimeout(() => {
        const f = document.querySelectorAll('#flight');
        f.forEach(con => {
            con.textContent = translations[language].flight;
        });

        const cname = document.querySelectorAll('#cname');
        cname.forEach(c => {
            const classname = c.className;
            const translatedText = translations[language][classname];
            c.textContent = translatedText;
        })

        const d = document.querySelectorAll('#departureTime');
        d.forEach(con => {
            con.textContent = translations[language].departureTime;
        });

        const at = document.querySelectorAll('#arrivalTime');
        at.forEach(d => {
            d.textContent = translations[language].arrivalTime;
        });

        const p = document.querySelectorAll('#price');
        p.forEach(d => {
            d.textContent = translations[language].price;
        });

        const s = document.querySelectorAll('#selectFlight');
        s.forEach(d => {
            d.textContent = translations[language].selectFlight;
        });
    }, 300);
}
