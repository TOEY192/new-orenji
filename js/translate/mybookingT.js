const translations = {
    en: {
        home: "Home",
        search: "Search",
        myBooking: "My Booking",
        login: "Login",
        register: "Register",
        logout: "Logout",

        // Hero section
        myBookingsHeader: "My Bookings",
        myBookingsDescription: "View all your bookings",

        confirm: 'Confirmed',
        pending: 'Pending',
        departureTime: 'Departure Time',
        arrivalTime: 'Arrival Time',
        seat: "Seat number",
        eco: '(Economy)',
        busi: '(Business)',
        fclass: '(First Class)',
        price: 'Price: ',
        payment: 'Payment Status',
        scanqr: 'Scan QR Code: '

    },
    th: {
        home: "หน้าแรก",
        search: "ค้นหาเที่ยวบิน",
        myBooking: "การจองของฉัน",
        login: "เข้าสู่ระบบ",
        register: "สมัครสมาชิก",
        logout: "ออกจากระบบ",

        // Hero section
        myBookingsHeader: "การจองของฉัน",
        myBookingsDescription: "ดูการจองของคุณทั้งหมด",

        confirm: 'สำเร็จ',
        pending: 'รอชำระเงิน',
        departureTime: 'เวลาออกเดินทาง',
        arrivalTime: 'เวลาเดินทางถึง',
        seat: "เลขที่นั่ง",
        eco: '(ชั้นประหยัด)',
        busi: '(ชั้นธุรกิจ)',
        fclass: '(ชั้นหนึ่ง)',
        price: 'ราคา: ',
        payment: 'สถานะชําระเงิน',
        scanqr: 'สแกนคิวอาร์โค้ด: '
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

    document.getElementById('myBookingsHeader').textContent = translations[language].myBookingsHeader;
    document.getElementById('myBookingsDescription').textContent = translations[language].myBookingsDescription;
    

    setTimeout(() => {
        const cname = document.querySelectorAll('#cname');
        cname.forEach(c => {
            const classname = c.className;
            const translatedText = translations[language][classname];
            c.textContent = translatedText;
        })

        const cons = document.querySelectorAll('#confirm');
        cons.forEach(con => {
            con.textContent = translations[language].confirm;
        });

        const dt = document.querySelectorAll('#departureTime');
        dt.forEach(d => {
            d.textContent = translations[language].departureTime;
        });

        const at = document.querySelectorAll('#arrivalTime');
        at.forEach(d => {
            d.textContent = translations[language].arrivalTime;
        });

        const s = document.querySelectorAll('#seat');
        s.forEach(d => {
            d.textContent = translations[language].seat;
        });

        const p = document.querySelectorAll('#price');
        p.forEach(d => {
            d.textContent = translations[language].price;
        });

        const py = document.querySelectorAll('#payment');
        py.forEach(d => {
            d.textContent = translations[language].payment;
        });

        const q = document.querySelectorAll('#scanqr');
        q.forEach(d => {
            d.textContent = translations[language].scanqr;
        });
    }, 100);
    
}