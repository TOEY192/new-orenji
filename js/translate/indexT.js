const translations = {
    en: {
        home: "Home",
        search: "Search",
        myBooking: "My Booking",
        login: "Login",
        register: "Register",
        logout: "Logout",
        findAdventure: "Find Your Next Adventure",
        discoverDeals: "Discover amazing deals on flights to destinations worldwide.",
        findFlight: "Find Your Flight",
        searchFlights: "Search Flights",
        popularDestinations: "Popular Destinations",
        paris: "Paris, France",
        tokyo: "Tokyo, Japan",
        newYork: "New York, USA",
        sydney: "Sydney, Australia",
        rome: "Rome, Italy",
        bestPrice: "Best Price Guarantee",
        priceDescription: "Find a lower price? We'll refund the difference!",
        secureBooking: "Secure Booking",
        secureDescription: "We use state-of-the-art encryption to protect your data.",
        globalCoverage: "Global Coverage",
        globalDescription: "Over 1000 airlines and 500,000 hotels worldwide.",
        company: "Company",
        aboutUs: "About Us",
        careers: "Careers",
        press: "Press",
        blog: "Blog",
        support: "Support",
        helpCenter: "Help Center",
        contactUs: "Contact Us",
        faq: "FAQ",
        cancellationPolicy: "Cancellation Policy",
        services: "Services",
        flightBooking: "Flight Booking",
        followUs: "Follow Us",
        facebook: "Facebook",
        twitter: "Twitter",
        instagram: "Instagram",
        linkedin: "LinkedIn",
        footer: "© 2025 OrenjiAirlines. All rights reserved."
    },
    th: {
        home: "หน้าแรก",
        search: "ค้นหาเที่ยวบิน",
        myBooking: "การจองของฉัน",
        login: "เข้าสู่ระบบ",
        register: "สมัครสมาชิก",
        logout: "ออกจากระบบ",
        findAdventure: "ค้นหาการผจญภัยครั้งต่อไปของคุณ",
        discoverDeals: "ค้นพบข้อเสนอที่น่าทึ่งเกี่ยวกับเที่ยวบินสู่จุดหมายปลายทางทั่วโลก",
        findFlight: "ค้นหาเที่ยวบินของคุณ",
        searchFlights: "ค้นหาเที่ยวบิน",
        popularDestinations: "จุดหมายปลายทางยอดนิยม",
        paris: "ปารีส, ฝรั่งเศส",
        tokyo: "โตเกียว, ญี่ปุ่น",
        newYork: "นิวยอร์ก, สหรัฐอเมริกา",
        sydney: "ซิดนีย์, ออสเตรเลีย",
        rome: "โรม, อิตาลี",
        bestPrice: "การรับประกันราคาดีที่สุด",
        priceDescription: "พบราคาถูกกว่าหรือไม่? เราจะคืนเงินส่วนต่างให้!",
        secureBooking: "การจองที่ปลอดภัย",
        secureDescription: "เรามีการเข้ารหัสระดับสูงสุดเพื่อปกป้องข้อมูลของคุณ",
        globalCoverage: "การครอบคลุมทั่วโลก",
        globalDescription: "มีสายการบินมากกว่า 1000 สายและโรงแรมมากกว่า 500,000 แห่งทั่วโลก",
        company: "บริษัท",
        aboutUs: "เกี่ยวกับเรา",
        careers: "งานที่บริษัท",
        press: "ข่าวประชาสัมพันธ์",
        blog: "บล็อก",
        support: "การสนับสนุน",
        helpCenter: "ศูนย์ช่วยเหลือ",
        contactUs: "ติดต่อเรา",
        faq: "คำถามที่พบบ่อย",
        cancellationPolicy: "นโยบายการยกเลิก",
        services: "บริการ",
        flightBooking: "การจองเที่ยวบิน",
        followUs: "ติดตามเรา",
        facebook: "เฟซบุ๊ก",
        twitter: "ทวิตเตอร์",
        instagram: "อินสตาแกรม",
        linkedin: "ลิงค์อิน",
        footer: "© 2025 OrenjiAirlines. สงวนลิขสิทธิ์"
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
    // Hero Section
    document.getElementById('findAdventure').textContent = translations[language].findAdventure;
    document.getElementById('discoverDeals').textContent = translations[language].discoverDeals;

    // Booking Section
    document.getElementById('findFlight').textContent = translations[language].findFlight;
    document.getElementById('searchFlights').textContent = translations[language].searchFlights;

    // Image Gallery
    document.getElementById('popularDestinations').textContent = translations[language].popularDestinations;
    document.getElementById('paris').textContent = translations[language].paris;
    document.getElementById('tokyo').textContent = translations[language].tokyo;
    document.getElementById('newYork').textContent = translations[language].newYork;
    document.getElementById('sydney').textContent = translations[language].sydney;
    document.getElementById('rome').textContent = translations[language].rome;

    // Features Section
    document.getElementById('bestPrice').textContent = translations[language].bestPrice;
    document.getElementById('priceDescription').textContent = translations[language].priceDescription;
    document.getElementById('secureBooking').textContent = translations[language].secureBooking;
    document.getElementById('secureDescription').textContent = translations[language].secureDescription;
    document.getElementById('globalCoverage').textContent = translations[language].globalCoverage;
    document.getElementById('globalDescription').textContent = translations[language].globalDescription;

    // Footer
    document.getElementById('company').textContent = translations[language].company;
    document.getElementById('aboutUs').textContent = translations[language].aboutUs;
    document.getElementById('careers').textContent = translations[language].careers;
    document.getElementById('press').textContent = translations[language].press;
    document.getElementById('blog').textContent = translations[language].blog;

    document.getElementById('support').textContent = translations[language].support;
    document.getElementById('helpCenter').textContent = translations[language].helpCenter;
    document.getElementById('contactUs').textContent = translations[language].contactUs;
    document.getElementById('faq').textContent = translations[language].faq;
    document.getElementById('cancellationPolicy').textContent = translations[language].cancellationPolicy;

    document.getElementById('services').textContent = translations[language].services;
    document.getElementById('flightBooking').textContent = translations[language].flightBooking;

    document.getElementById('followUs').textContent = translations[language].followUs;
    document.getElementById('facebook').textContent = translations[language].facebook;
    document.getElementById('twitter').textContent = translations[language].twitter;
    document.getElementById('instagram').textContent = translations[language].instagram;
    document.getElementById('linkedin').textContent = translations[language].linkedin;

    document.getElementById('footer').textContent = translations[language].footer;
}