const translations = {
    en: {
        adminPanelTitle: "Admin Panel",
        flightManagement: "Flight Management",
        flightManagementDescription: "View, add, edit, or delete all flight information in the system",
        goToFlightsPage: "Go to Flights Page",
        adminDashboardTitle: "Admin Dashboard",
    },
    th: {
        adminPanelTitle: "แผงผู้ดูแลระบบ",
        flightManagement: "การจัดการเที่ยวบิน",
        flightManagementDescription: "ดู เพิ่ม แก้ไข หรือ ลบ ข้อมูลเที่ยวบินทั้งหมดในระบบ",
        goToFlightsPage: "ไปที่หน้าเที่ยวบิน",
        adminDashboardTitle: "แดชบอร์ดผู้ดูแลระบบ",
    }
};

function changeLanguage() {
    const languageSelect = document.getElementById('languageSelect');
    let currentLanguage = languageSelect.textContent.trim();
    const language = currentLanguage === 'English' ? 'en' : 'th';
    localStorage.setItem("language", language);

    // แก้ไขข้อความใน Admin Panel
    document.getElementById('adminPanelTitle').textContent = translations[language].adminPanelTitle;
    document.getElementById('flightManagementLink').textContent = translations[language].flightManagement;
    document.getElementById('adminDashboardTitle').textContent = translations[language].adminDashboardTitle;
    document.getElementById('flightManagementTitle').textContent = translations[language].flightManagement;
    document.getElementById('flightManagementDescription').textContent = translations[language].flightManagementDescription;
    document.getElementById('goToFlightsPage').textContent = translations[language].goToFlightsPage;
}
