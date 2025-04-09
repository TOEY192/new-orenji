const translations = {
    en: {
        flightManagement: "✈️ Flight Management",
        searchFlights: 'Search for flights...',
        addFlight: 'Add Flight',
        back: 'Back',
        flightCode: 'Flight Code',
        departure: 'Departure',
        destination: 'Destination',
        departureTime: 'Departure Time',
        arrivalTime: 'Arrival Time',
        price: 'Price',
        seatsAvailable: 'Seats Available',
        class: 'Class',
        manage: 'Manage',

        // Add 
        addNewFlight: "Add New Flight",
        newFlightCode: 'Flight Code',
        newDeparture: 'Departure',
        newDestination: 'Destination',
        newDepartureTime: 'Departure Time',
        newArrivalTime: 'Arrival Time',
        newClass: 'Class',
        eco: 'Economy',
        busi: 'Business',
        fclass: 'First Class',
        newPrice: 'Price',
        save: 'Save',
        cancel: 'Cancel',

        // Edit 
        editFlight: 'Edit Flight',
        eFlightCode: 'Flight Code',
        eDepartureTime: 'Departure Time',
        eArrivalTime: 'Arrival Time',
        ePrice: 'Price',
    },
    th: {
        flightManagement: "✈️ การจัดการเที่ยวบิน",
        searchFlights: 'ค้นหาเที่ยวบิน...',
        addFlight: 'เพิ่มเที่ยวบิน',
        back: 'ย้อนกลับ',
        flightCode: 'รหัสเที่ยวบิน',
        departure: 'ต้นทาง',
        destination: 'ปลายทาง',
        departureTime: 'เวลาออกเดินทาง',
        arrivalTime: 'เวลาเดินทางถึง',
        price: 'ราคา',
        seatsAvailable: 'ที่นั่งที่เหลือ',
        class: 'คลาส',
        manage: 'จัดการ',

        // Add 
        addNewFlight: "เพิ่มเที่ยวบิน",
        newFlightCode: 'รหัสเที่ยวบิน',
        newDeparture: 'ต้นทาง',
        newDestination: 'ปลายทาง',
        newDepartureTime: 'เวลาออกเดินทาง',
        newArrivalTime: 'เวลาเดินทางถึง',
        newClass: 'คลาส',
        eco: 'ชั้นประหยัด',
        busi: 'ชั้นธุรกิจ',
        fclass: 'ชั้นหนึ่ง',
        newPrice: 'ราคา',
        save: 'บันทึก',
        cancel: 'ยกเลิก',

        // Edit
        editFlight: 'แก้ไขเที่ยวบิน',
        eFlightCode: 'รหัสเที่ยวบิน',
        eDepartureTime: 'เวลาออกเดินทาง',
        eArrivalTime: 'เวลาเดินทางถึง',
        ePrice: 'ราคา',
    }
}

function changeLanguage() {
    const languageSelect = document.getElementById('languageSelect');
    let currentLanguage = languageSelect.textContent.trim();
    const language = currentLanguage === 'English' ? 'en' : 'th';
    localStorage.setItem("language", language);

    document.getElementById('flightManagement').textContent = translations[language].flightManagement;
    document.getElementById('searchFlights').placeholder = translations[language].searchFlights;
    document.getElementById('addFlight').textContent = translations[language].addFlight;
    document.getElementById('back').textContent = translations[language].back;
    document.getElementById('flightCode').textContent = translations[language].flightCode;
    document.getElementById('departure').textContent = translations[language].departure;
    document.getElementById('destination').textContent = translations[language].destination;
    document.getElementById('departureTime').textContent = translations[language].departureTime;
    document.getElementById('arrivalTime').textContent = translations[language].arrivalTime;
    document.getElementById('price').textContent = translations[language].price;
    document.getElementById('seatsAvailable').textContent = translations[language].seatsAvailable;
    document.getElementById('class').textContent = translations[language].class;
    document.getElementById('manage').textContent = translations[language].manage;
}

function changeLanguageAdd() {
    const languageSelect = document.getElementById('languageSelect');
    let currentLanguage = languageSelect.textContent.trim();
    const language = currentLanguage === 'English' ? 'en' : 'th';
    localStorage.setItem("language", language);

    setTimeout(() => {
        document.getElementById('addNewFlight').textContent = translations[language].addNewFlight;
        document.getElementById('newFlightCode').textContent = translations[language].newFlightCode;
        document.getElementById('newDeparture').textContent = translations[language].newDeparture;
        document.getElementById('newDestination').textContent = translations[language].newDestination;
        document.getElementById('newDepartureTime').textContent = translations[language].newDepartureTime;
        document.getElementById('newArrivalTime').textContent = translations[language].newArrivalTime;
        document.getElementById('newClass').textContent = translations[language].newClass;
        document.getElementById('eco').text = translations[language].eco;
        document.getElementById('busi').text = translations[language].busi;
        document.getElementById('fclass').text = translations[language].fclass;
        document.getElementById('newPrice').textContent = translations[language].newPrice;
        document.getElementById('save').textContent = translations[language].save;
        document.getElementById('cancel').textContent = translations[language].cancel;
    }, 100);
}


function changeLanguageEdit() {
    const languageSelect = document.getElementById('languageSelect');
    let currentLanguage = languageSelect.textContent.trim();
    const language = currentLanguage === 'English' ? 'en' : 'th';
    localStorage.setItem("language", language);

    setTimeout(() => {
        document.getElementById('editFlight').textContent = translations[language].editFlight;
        document.getElementById('eFlightCode').textContent = translations[language].eFlightCode;
        document.getElementById('eDepartureTime').textContent = translations[language].eDepartureTime;
        document.getElementById('eArrivalTime').textContent = translations[language].eArrivalTime;
        document.getElementById('ePrice').textContent = translations[language].ePrice;
        document.getElementById('save').textContent = translations[language].save;
        document.getElementById('cancel').textContent = translations[language].cancel;
    }, 100);
}
