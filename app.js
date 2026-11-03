const STORAGE_KEY = 'msc_attendance_data_v8';

// =========================================================================
// KONFIGURASI SUPABASE REALTIME DATABASE
// (Dapatkan Project URL & Anon Key di Supabase Console -> Project Settings -> API)
// =========================================================================
const SUPABASE_URL = '[https://kvxlfutxljasyyuttfe.supabase.co](https://kvxlfutxljasyyuttfe.supabase.co)'; // <--- Tempel Project URL Anda di sini
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2eGxmdXR4bHhqYXN5eXV0dGZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTM2Nzc2MjUsImV4cCI6MjEwOTI1MzYyNX0.Zx40GOJYmjlmNXhMolijfstnn6umakXwYhZ4mm807Gk'; // <--- Tempel anon public key Anda di sini

let supabaseClient = null;

try {
    if (typeof supabase !== 'undefined' && SUPABASE_URL && SUPABASE_ANON_KEY) {
    supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}
    }
 catch (err) {
    console.error("Supabase init failed:", err);
}

// Default Bidang/Divisi sesuai kebutuhan
const DEFAULT_DIVISIONS = [
    'BPH',
    'Media',
    'Saintek',
    'Hublu'
];

const INITIAL_EMPTY_DATA = {
    settings: {
        sysName: 'MSC Attendance System',
        orgName: 'Muallimin Scientific Community',
        period: '2025/2026',
        divisions: DEFAULT_DIVISIONS,
        theme: 'light'
    },  
    // =========================================================================
    // DAFTAR ANGGOTA LENGKAP & TERUPDATE (DIURUTKAN ALPHABETIS A - Z)
    // =========================================================================
    members: [
        { id: 'MSC-024', name: 'Abrisam Janitra Abimanyu', division: 'Saintek', position: 'Anggota', cohort: '104', status: 'Aktif' },
        { id: 'MSC-021', name: 'Adlan Muhammad Askari Arfa', division: 'Saintek', position: 'Anggota', cohort: '104', status: 'Aktif' },
        { id: 'MSC-009', name: 'Ahnaf Hilmi Fahreza', division: 'Saintek', position: 'Anggota', cohort: '104', status: 'Aktif' },
        { id: 'MSC-029', name: 'Bahtiar Abid Sakhi', division: 'Hublu', position: 'Anggota', cohort: '104', status: 'Aktif' },
        { id: 'MSC-027', name: 'Benhati Damaifajar Hayumarghi', division: 'Saintek', position: 'Anggota', cohort: '104', status: 'Aktif' },
        { id: 'MSC-022', name: 'Darendra Izzat Arfian', division: 'Hublu', position: 'Anggota', cohort: '104', status: 'Aktif' },
        { id: 'MSC-015', name: 'Fadil Abdul Natsir', division: 'Saintek', position: 'Anggota', cohort: '104', status: 'Aktif' },
        { id: 'MSC-030', name: 'Januar Putra Wijaya', division: 'Hublu', position: 'Anggota', cohort: '104', status: 'Aktif' },
        { id: 'MSC-005', name: 'Jibril Alfath Fadrian', division: 'Media', position: 'Ketua Bidang', cohort: '103', status: 'Aktif' },
        { id: 'MSC-035', name: 'Keane Alfarezel Kurniawan', division: 'Hublu', position: 'Sekertaris Bidang', cohort: '103', status: 'Aktif' },
        { id: 'MSC-002', name: 'Kiano Arshad Wicaksono', division: 'Saintek', position: 'Ketua Bidang', cohort: '103', status: 'Aktif' },
        { id: 'MSC-006', name: 'Mahardika Hisyam Alrasyid', division: 'Media', position: 'Anggota', cohort: '103', status: 'Aktif' },
        { id: 'MSC-013', name: 'Muhammad Alif Al Fatih', division: 'Media', position: 'Anggota', cohort: '104', status: 'Aktif' },
        { id: 'MSC-018', name: 'Muhammad Arrayyan Edgar Alvaro', division: 'Media', position: 'Anggota', cohort: '104', status: 'Aktif' },
        { id: 'MSC-026', name: 'Muhammad Fadhli Albani', division: 'Saintek', position: 'Anggota', cohort: '104', status: 'Aktif' },
        { id: 'MSC-001', name: 'Muhammad Fairuz Zada Al Farisi', division: 'BPH', position: 'Ketua Umum', cohort: '103', status: 'Aktif' },
        { id: 'MSC-034', name: 'Muhammad Faqih Mujtaba Althaf', division: 'BPH', position: 'Bendahara Umum', cohort: '103', status: 'Aktif' },
        { id: 'MSC-020', name: 'Muhammad Fathan Al Farisi Harahap', division: 'BPH', position: 'Wakil Bendahara', cohort: '104', status: 'Aktif' },
        { id: 'MSC-033', name: 'Muhammad Ihsan Faza', division: 'Media', position: 'Anggota', cohort: '104', status: 'Aktif' },
        { id: 'MSC-017', name: 'Muhammad Naufal Al-Faris', division: 'Media', position: 'Anggota', cohort: '104', status: 'Aktif' },
        { id: 'MSC-010', name: 'Muhammad Ra’uf Janitra Handoko', division: 'Media', position: 'Anggota', cohort: '104', status: 'Aktif' },
        { id: 'MSC-016', name: 'Muhammad Raihan Fakhri', division: 'Hublu', position: 'Anggota', cohort: '104', status: 'Aktif' },
        { id: 'MSC-032', name: 'Muhammad Rizky Wira Muazzam', division: 'BPH', position: 'Wakil Sekertaris', cohort: '103', status: 'Aktif' },
        { id: 'MSC-011', name: 'Muhammad Zhafran', division: 'Hublu', position: 'Anggota', cohort: '104', status: 'Aktif' },
        { id: 'MSC-025', name: 'Muhammad Zhafif Alkhoiri', division: 'Saintek', position: 'Anggota', cohort: '104', status: 'Aktif' },
        { id: 'MSC-019', name: 'Muzaffar Al Qashid', division: 'Hublu', position: 'Anggota', cohort: '104', status: 'Aktif' },
        { id: 'MSC-028', name: 'Nabihan Sakhi Zaidan', division: 'Hublu', position: 'Anggota', cohort: '104', status: 'Aktif' },
        { id: 'MSC-008', name: 'Pranayudha Zahran', division: 'Hublu', position: 'Ketua Bidang', cohort: '103', status: 'Aktif' },
        { id: 'MSC-031', name: 'Radith Putra Andita', division: 'Hublu', position: 'Anggota', cohort: '104', status: 'Aktif' },
        { id: 'MSC-003', name: 'Rahil Faiq Sunandar', division: 'Saintek', position: 'Anggota', cohort: '103', status: 'Aktif' },
        { id: 'MSC-012', name: 'Rifqi Maliki', division: 'Saintek', position: 'Anggota', cohort: '104', status: 'Aktif' },
        { id: 'MSC-014', name: 'Yasykur Slamet Abqary', division: 'Media', position: 'Anggota', cohort: '104', status: 'Aktif' },
        { id: 'MSC-007', name: 'Zidni Ilman Dhia', division: 'Media', position: 'Anggota', cohort: '103', status: 'Aktif' },
        { id: 'MSC-023', name: 'Zidniy Nur Haq', division: 'Media', position: 'Anggota', cohort: '104', status: 'Aktif' },
        { id: 'MSC-004', name: 'Zihni Furqon Farabi Ihsan', division: 'BPH', position: 'Sekertaris Umum', cohort: '103', status: 'Aktif' }
    ],
    activities: []
};

let appState = {
    settings: {},
    members: [],
    activities: [],
    currentTab: 'dashboard',
    activeCharts: {}
};

const PREDEFINED_TITLES = [
    'Kumpul Makan MSC',
    'Rapat Pengurus MSC',
    'Evaluasi Program Kerja',
    'Diskusi Ilmiah',
    'Persiapan Lomba Sains',
    'Seminar Internal',
    'Kegiatan Divisi Media'
];

window.onload = function() {
    initApp();
    
    // Fungsi untuk memperbarui Hari, Tanggal, dan Jam secara Real-Time Setiap Detik
    function updateLiveClock() {
        const now = new Date();
        const dateString = now.toLocaleDateString('id-ID', {
            weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
        });
        const timeString = now.toLocaleTimeString('id-ID', {
            hour: '2-digit', minute: '2-digit', second: '2-digit'
        });
        
        const dateElement = document.getElementById('currentDateDisplay');
        if (dateElement) {
            dateElement.textContent = `${dateString} • ${timeString} WIB`;
        }
    }

    updateLiveClock(); // Jalankan pertama kali saat aplikasi dibuka
    setInterval(updateLiveClock, 1000); // Perbarui jam setiap 1 detik (1000 ms)
};

function initApp() {
    loadData();
    applyTheme();
    updateUIHeader();
    switchTab('dashboard');
    refreshLucideIcons();
}

function refreshLucideIcons() {
    setTimeout(() => {
        if (window.lucide) {
            lucide.createIcons();
        }
    }, 50);
}

function loadData() {
    // 1. Load dari LocalStorage terlebih dahulu agar tampilan instant
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
        try {
            appState = JSON.parse(stored);
            if (!appState.settings) appState.settings = INITIAL_EMPTY_DATA.settings;
            if (!appState.activeCharts) appState.activeCharts = {};
        } catch(e) {
            appState = JSON.parse(JSON.stringify(INITIAL_EMPTY_DATA));
            appState.activeCharts = {};
        }
    } else {
        appState = JSON.parse(JSON.stringify(INITIAL_EMPTY_DATA));
        appState.activeCharts = {};
    }

    // 2. Jika Supabase aktif, ambil data terbaru dari cloud dan aktifkan Realtime Sync
    if (supabaseClient) {
        // Ambil data pertama kali saat app dibuka
        supabaseClient
            .from('msc_attendance')
            .select('*')
            .eq('id', 'main_data')
            .single()
            .then(({ data, error }) => {
                if (data && data.payload) {
                    appState = data.payload;
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
                    updateUIHeader();
                    if (appState.currentTab) switchTab(appState.currentTab);
                }
            });

        // Dengarkan perubahan data Realtime antar-Device
        supabaseClient
            .channel('public:msc_attendance')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'msc_attendance' }, payload => {
                if (payload.new && payload.new.payload) {
                    appState = payload.new.payload;
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
                    updateUIHeader();
                    if (appState.currentTab) switchTab(appState.currentTab);
                    showToast('Data diperbarui dari perangkat lain', 'info');
                }
            })
            .subscribe();
    }
}

function saveData() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
        
        // Simpan & Sinkronkan ke Supabase Realtime Database
        if (supabaseClient) {
            supabaseClient
                .from('msc_attendance')
                .upsert({ id: 'main_data', payload: appState })
                .then(({ error }) => {
                    if (error) console.error('Gagal sync ke Supabase:', error);
                });
        }
    } catch(e) {
        showToast('Gagal menyimpan ke penyimpanan lokal browser', 'error');
    }
}

function updateUIHeader() {
    document.getElementById('sysNameHeader').textContent = appState.settings.sysName || 'MSC Attendance';
    document.getElementById('orgNameHeader').textContent = appState.settings.orgName || 'Muallimin Scientific Community';
    document.getElementById('periodBadge').textContent = `Periode ${appState.settings.period || '2025/2026'}`;
}

function toggleTheme() {
    const current = appState.settings.theme === 'dark' ? 'light' : 'dark';
    appState.settings.theme = current;
    saveData();
    applyTheme();
}

function applyTheme() {
    if (appState.settings.theme === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
    refreshLucideIcons();
}

function switchTab(tabId) {
    appState.currentTab = tabId;
    
    document.querySelectorAll('.nav-item').forEach(el => {
        el.classList.remove('bg-slate-800', 'text-white', 'border-l-4', 'border-cyan-400');
        el.classList.add('text-slate-300');
    });
    const activeNav = document.getElementById(`nav-${tabId}`);
    if (activeNav) {
        activeNav.classList.add('bg-slate-800', 'text-white', 'border-l-4', 'border-cyan-400');
        activeNav.classList.remove('text-slate-300');
    }

    const titles = {
        dashboard: 'Dashboard Utama',
        presensi: 'Form & Pencatatan Presensi',
        riwayat: 'Riwayat & Arsip Kegiatan',
        anggota: 'Manajemen Data Anggota',
        statistik: 'Statistik & Indeks Kehadiran',
        laporan: 'Rekapitulasi & Laporan Lanjutan',
        pengaturan: 'Pengaturan Sistem'
    };
    document.getElementById('pageTitle').textContent = titles[tabId] || 'MSC System';

    const sidebar = document.getElementById('sidebar');
    if (!sidebar.classList.contains('-translate-x-full') && window.innerWidth < 768) {
        toggleMobileSidebar();
    }

    const container = document.getElementById('contentContainer');
    container.innerHTML = '';
    container.className = 'max-w-7xl mx-auto space-y-6 animate-fade-in';

    destroyCharts();

    switch (tabId) {
        case 'dashboard': renderDashboard(container); break;
        case 'presensi': renderPresensi(container); break;
        case 'riwayat': renderRiwayat(container); break;
        case 'anggota': renderAnggota(container); break;
        case 'statistik': renderStatistik(container); break;
        case 'laporan': renderLaporan(container); break;
        case 'pengaturan': renderPengaturan(container); break;
        default: renderDashboard(container);
    }
    refreshLucideIcons();
}

function toggleMobileSidebar() {
    const sidebar = document.getElementById('sidebar');
    const backdrop = document.getElementById('mobileDrawerBackdrop');
    sidebar.classList.toggle('-translate-x-full');
    backdrop.classList.toggle('hidden');
}

function destroyCharts() {
    if (!appState.activeCharts) {
        appState.activeCharts = {};
        return;
    }
    Object.keys(appState.activeCharts).forEach(key => {
        if (appState.activeCharts[key]) {
            appState.activeCharts[key].destroy();
        }
    });
    appState.activeCharts = {};
}

function sanitize(str) {
    if (!str) return '';
    return String(str).replace(/[&<>"']/g, function(m) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m];
    });
}

function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    const bg = type === 'success' ? 'bg-emerald-600' : type === 'error' ? 'bg-rose-600' : 'bg-slate-800';
    const iconName = type === 'success' ? 'check-circle' : type === 'error' ? 'alert-circle' : 'info';

    toast.className = `${bg} text-white px-4 py-3 rounded-lg shadow-xl text-sm flex items-center space-x-3 pointer-events-auto transform transition-all duration-300 translate-y-2 opacity-0`;
    toast.innerHTML = `<i data-lucide="${iconName}" class="w-4 h-4 shrink-0"></i> <span>${sanitize(message)}</span>`;

    const container = document.getElementById('toastContainer');
    container.appendChild(toast);
    refreshLucideIcons();

    setTimeout(() => {
        toast.classList.remove('translate-y-2', 'opacity-0');
    }, 10);

    setTimeout(() => {
        toast.classList.add('opacity-0', 'translate-y-2');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function openModal(title, bodyHTML, footerHTML) {
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalBody').innerHTML = bodyHTML;
    document.getElementById('modalFooter').innerHTML = footerHTML;

    const overlay = document.getElementById('modalOverlay');
    const card = document.getElementById('modalCard');
    overlay.classList.remove('hidden');
    setTimeout(() => {
        overlay.classList.remove('opacity-0');
        card.classList.remove('scale-95');
        card.classList.add('scale-100');
    }, 10);
    refreshLucideIcons();
}

function closeModal() {
    const overlay = document.getElementById('modalOverlay');
    const card = document.getElementById('modalCard');
    card.classList.remove('scale-100');
    card.classList.add('scale-95');
    overlay.classList.add('opacity-0');
    setTimeout(() => {
        overlay.classList.add('hidden');
    }, 200);
}

function getComputedStats() {
    const totalMembers = appState.members.length;
    const totalActivities = appState.activities.length;
    
    let totalHadir = 0, totalIzin = 0, totalSakit = 0, totalAlpha = 0, totalRecords = 0;

    appState.activities.forEach(act => {
        if (act.attendance) {
            Object.values(act.attendance).forEach(status => {
                totalRecords++;
                if (status === 'Hadir') totalHadir++;
                else if (status === 'Izin') totalIzin++;
                else if (status === 'Sakit') totalSakit++;
                else if (status === 'Alpha') totalAlpha++;
            });
        }
    });

    const totalAbsences = totalIzin + totalSakit + totalAlpha;
    const overallRate = totalRecords > 0 ? ((totalHadir / totalRecords) * 100).toFixed(1) : 0;

    return {
        totalMembers, totalActivities, totalRecords,
        totalHadir, totalIzin, totalSakit, totalAlpha,
        totalAbsences, overallRate
    };
}

// ==========================================
// 1. DASHBOARD MODULE
// ==========================================
function renderDashboard(container) {
    const stats = getComputedStats();

    const statsHTML = `
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div class="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-between">
                <div>
                    <p class="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total Anggota</p>
                    <h3 class="text-2xl font-bold text-slate-900 dark:text-white mt-1">${stats.totalMembers}</h3>
                    <p class="text-xs text-slate-500 mt-1">Anggota terdaftar</p>
                </div>
                <div class="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                    <i data-lucide="users" class="w-6 h-6"></i>
                </div>
            </div>

            <div class="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-between">
                <div>
                    <p class="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total Kegiatan</p>
                    <h3 class="text-2xl font-bold text-slate-900 dark:text-white mt-1">${stats.totalActivities}</h3>
                    <p class="text-xs text-slate-500 mt-1">Telah dilaksanakan</p>
                </div>
                <div class="w-12 h-12 rounded-xl bg-cyan-50 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
                    <i data-lucide="calendar-check" class="w-6 h-6"></i>
                </div>
            </div>

            <div class="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-between">
                <div>
                    <p class="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total Hadir</p>
                    <h3 class="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">${stats.totalHadir}</h3>
                    <p class="text-xs text-slate-500 mt-1">Rata-rata (${stats.overallRate}%)</p>
                </div>
                <div class="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                    <i data-lucide="user-check" class="w-6 h-6"></i>
                </div>
            </div>

            <div class="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-between">
                <div>
                    <p class="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Ketidakhadiran</p>
                    <h3 class="text-2xl font-bold text-rose-600 dark:text-rose-400 mt-1">${stats.totalAbsences}</h3>
                    <p class="text-xs text-slate-500 mt-1">Izin: ${stats.totalIzin} | Sakit: ${stats.totalSakit} | Alpha: ${stats.totalAlpha}</p>
                </div>
                <div class="w-12 h-12 rounded-xl bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 flex items-center justify-center">
                    <i data-lucide="user-x" class="w-6 h-6"></i>
                </div>
            </div>
        </div>
    `;

    const chartsHTML = `
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div class="lg:col-span-2 bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <div class="flex items-center justify-between mb-4">
                    <h4 class="font-bold text-slate-900 dark:text-white text-base">Grafik Kehadiran Per Kegiatan</h4>
                    <span class="text-xs text-slate-500">Real-time Data</span>
                </div>
                <div class="h-64 sm:h-72">
                    <canvas id="chartActivityAttendance"></canvas>
                </div>
            </div>

            <div class="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <div class="flex items-center justify-between mb-4">
                    <h4 class="font-bold text-slate-900 dark:text-white text-base">Distribusi Status Presensi</h4>
                    <span class="text-xs text-slate-500">Keseluruhan</span>
                </div>
                <div class="h-64 sm:h-72 flex items-center justify-center">
                    <canvas id="chartStatusDistribution"></canvas>
                </div>
            </div>
        </div>
    `;

    const recentActivities = [...appState.activities].reverse().slice(0, 5);

    let recentHTML = recentActivities.length === 0 ? `<p class="text-xs text-slate-400 py-4 text-center">Belum ada kegiatan yang tercatat.</p>` :
        recentActivities.map(act => {
            const counts = { Hadir: 0, Izin: 0, Sakit: 0, Alpha: 0 };
            if (act.attendance) {
                Object.values(act.attendance).forEach(s => counts[s] = (counts[s] || 0) + 1);
            }
            return `
                <div class="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-700/40 border border-slate-100 dark:border-slate-700/50 space-y-2 sm:space-y-0">
                    <div>
                        <h5 class="font-semibold text-slate-900 dark:text-white text-sm">${sanitize(act.title)}</h5>
                        <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                            <i data-lucide="calendar" class="w-3.5 h-3.5 inline mr-1"></i>${act.date} | <i data-lucide="map-pin" class="w-3.5 h-3.5 inline mr-1"></i>${sanitize(act.location)}
                        </p>
                    </div>
                    <div class="flex items-center space-x-2 text-xs font-medium">
                        <span class="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300">${counts.Hadir} Hadir</span>
                        <span class="px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300">${counts.Izin} Izin</span>
                        <span class="px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300">${counts.Sakit} Sakit</span>
                        <span class="px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-900/50 text-rose-700 dark:text-rose-300">${counts.Alpha} Alpha</span>
                    </div>
                </div>
            `;
        }).join('');

    const bottomHTML = `
        <div class="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <div class="flex items-center justify-between mb-4">
                <h4 class="font-bold text-slate-900 dark:text-white text-base">Aktivitas & Kegiatan Terbaru</h4>
                <button onclick="switchTab('riwayat')" class="text-xs text-cyan-600 hover:underline">Lihat Semua</button>
            </div>
            <div class="space-y-3">
                ${recentHTML}
            </div>
        </div>
    `;

    container.innerHTML = statsHTML + chartsHTML + bottomHTML;
    initDashboardCharts();
}

function initDashboardCharts() {
    const isDark = appState.settings.theme === 'dark';
    const textColor = isDark ? '#94a3b8' : '#64748b';
    const gridColor = isDark ? '#334155' : '#e2e8f0';

    const ctx1 = document.getElementById('chartActivityAttendance');
    if (ctx1) {
        const labels = appState.activities.map(a => a.title.length > 18 ? a.title.substr(0, 18) + '...' : a.title);
        const hadirData = appState.activities.map(a => {
            if (!a.attendance) return 0;
            return Object.values(a.attendance).filter(v => v === 'Hadir').length;
        });
        const izinData = appState.activities.map(a => {
            if (!a.attendance) return 0;
            return Object.values(a.attendance).filter(v => v === 'Izin' || v === 'Sakit' || v === 'Alpha').length;
        });

        appState.activeCharts['dashboardBar'] = new Chart(ctx1, {
            type: 'bar',
            data: {
                labels: labels.length > 0 ? labels : ['Belum ada kegiatan'],
                datasets: [
                    {
                        label: 'Hadir',
                        data: hadirData.length > 0 ? hadirData : [0],
                        backgroundColor: '#0d9488',
                        borderRadius: 4
                    },
                    {
                        label: 'Tidak Hadir',
                        data: izinData.length > 0 ? izinData : [0],
                        backgroundColor: '#f43f5e',
                        borderRadius: 4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { labels: { color: textColor } } },
                scales: {
                    x: { ticks: { color: textColor }, grid: { color: gridColor } },
                    y: { ticks: { color: textColor, stepSize: 1 }, grid: { color: gridColor } }
                }
            }
        });
    }

    const ctx2 = document.getElementById('chartStatusDistribution');
    if (ctx2) {
        const stats = getComputedStats();
        appState.activeCharts['dashboardDoughnut'] = new Chart(ctx2, {
            type: 'doughnut',
            data: {
                labels: ['Hadir', 'Izin', 'Sakit', 'Alpha'],
                datasets: [{
                    data: [stats.totalHadir, stats.totalIzin, stats.totalSakit, stats.totalAlpha],
                    backgroundColor: ['#10b981', '#f59e0b', '#3b82f6', '#ef4444'],
                    borderWidth: 2,
                    borderColor: isDark ? '#1e293b' : '#ffffff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'bottom', labels: { color: textColor, boxWidth: 12 } } }
            }
        });
    }
}

// ==========================================
// 2. PRESENSI MODULE
// ==========================================
let currentPresensiState = {
    activityId: null,
    title: '',
    date: new Date().toISOString().split('T')[0],
    time: '14:00',
    location: 'Aula MSC',
    description: '',
    searchQuery: '',
    filterDivision: 'ALL',
    statuses: {}
};

function renderPresensi(container) {
    const divisionsOptions = appState.settings.divisions.map(d => `<option value="${d}">${d}</option>`).join('');
    const predefinedButtons = PREDEFINED_TITLES.map(t => 
        `<button type="button" onclick="setPresensiTitle('${t}')" class="text-xs px-2.5 py-1 rounded border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">${t}</button>`
    ).join(' ');

    const html = `
        <div class="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
            <div class="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-3">
                <div>
                    <h3 class="font-bold text-slate-900 dark:text-white text-lg">Buat & Catat Presensi Kegiatan</h3>
                    <p class="text-xs text-slate-500">Isi detail kegiatan lalu tentukan status kehadiran anggota</p>
                </div>
                <button onclick="resetPresensiForm()" class="text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 flex items-center space-x-1">
                    <i data-lucide="rotate-ccw" class="w-3.5 h-3.5"></i>
                    <span>Reset Form</span>
                </button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div class="md:col-span-2">
                    <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Judul Kegiatan *</label>
                    <input type="text" id="presensiTitle" value="${sanitize(currentPresensiState.title)}" placeholder="Contoh: Rapat Evaluasi Proker" class="w-full text-sm px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-cyan-500 focus:outline-none">
                    <div class="flex flex-wrap gap-1 mt-2">
                        ${predefinedButtons}
                    </div>
                </div>

                <div>
                    <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Tanggal *</label>
                    <input type="date" id="presensiDate" value="${currentPresensiState.date}" class="w-full text-sm px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-cyan-500 focus:outline-none">
                </div>

                <div>
                    <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Waktu</label>
                    <input type="time" id="presensiTime" value="${currentPresensiState.time}" class="w-full text-sm px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-cyan-500 focus:outline-none">
                </div>

                <div class="md:col-span-2">
                    <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Lokasi Kegiatan</label>
                    <input type="text" id="presensiLocation" value="${sanitize(currentPresensiState.location)}" placeholder="Contoh: Ruang Meeting MSC / Online" class="w-full text-sm px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-cyan-500 focus:outline-none">
                </div>

                <div class="md:col-span-2">
                    <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Keterangan / Catatan Tambahan</label>
                    <input type="text" id="presensiDesc" value="${sanitize(currentPresensiState.description)}" placeholder="Opsional: Catatan ringkas" class="w-full text-sm px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-cyan-500 focus:outline-none">
                </div>
            </div>
        </div>

        <div class="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-5 space-y-4">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <h4 class="font-bold text-slate-900 dark:text-white text-base">Daftar Kehadiran Anggota</h4>
                
                <div class="flex flex-wrap items-center gap-2">
                    <button onclick="markAllStatus('Hadir')" class="px-3 py-1.5 text-xs bg-emerald-50 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 rounded-lg font-medium hover:bg-emerald-100 transition-colors flex items-center space-x-1">
                        <i data-lucide="check-check" class="w-3.5 h-3.5"></i>
                        <span>Tandai Semua Hadir</span>
                    </button>
                    <button onclick="markAllStatus(null)" class="px-3 py-1.5 text-xs bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-600 rounded-lg font-medium hover:bg-slate-200 transition-colors flex items-center space-x-1">
                        <i data-lucide="eraser" class="w-3.5 h-3.5"></i>
                        <span>Reset Kehadiran</span>
                    </button>
                </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div class="relative">
                    <i data-lucide="search" class="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400"></i>
                    <input type="text" id="searchMemberInput" oninput="filterPresensiList()" placeholder="Cari nama anggota..." class="w-full text-xs pl-8 pr-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500">
                </div>
                <div>
                    <select id="filterDivInput" onchange="filterPresensiList()" class="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500">
                        <option value="ALL">Semua Bidang</option>
                        ${divisionsOptions}
                    </select>
                </div>
            </div>

            <div class="overflow-x-auto">
                <table class="w-full text-left border-collapse text-xs">
                    <thead>
                        <tr class="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/50 text-slate-500 dark:text-slate-400 font-semibold">
                            <th class="p-3">Anggota</th>
                            <th class="p-3">Bidang / Jabatan</th>
                            <th class="p-3 text-center">Status Kehadiran</th>
                        </tr>
                    </thead>
                    <tbody id="presensiListBody">
                    </tbody>
                </table>
            </div>

            <div class="pt-4 border-t border-slate-200 dark:border-slate-700 flex justify-end space-x-3">
                <button onclick="switchTab('dashboard')" class="px-4 py-2 text-xs font-semibold rounded-lg border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700">
                    Batal
                </button>
                <button onclick="confirmAndSavePresensi()" class="px-5 py-2 text-xs font-semibold rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white shadow-md shadow-cyan-600/30 transition-all flex items-center space-x-2">
                    <i data-lucide="save" class="w-4 h-4"></i>
                    <span>Simpan Presensi Kegiatan</span>
                </button>
            </div>
        </div>
    `;

    container.innerHTML = html;
    renderPresensiRows();
}

function setPresensiTitle(title) {
    document.getElementById('presensiTitle').value = title;
    currentPresensiState.title = title;
}

function resetPresensiForm() {
    currentPresensiState = {
        activityId: null,
        title: '',
        date: new Date().toISOString().split('T')[0],
        time: '14:00',
        location: 'Aula MSC',
        description: '',
        searchQuery: '',
        filterDivision: 'ALL',
        statuses: {}
    };
    renderPresensi(document.getElementById('contentContainer'));
    refreshLucideIcons();
}

function filterPresensiList() {
    currentPresensiState.searchQuery = document.getElementById('searchMemberInput').value.toLowerCase();
    currentPresensiState.filterDivision = document.getElementById('filterDivInput').value;
    renderPresensiRows();
}

function renderPresensiRows() {
    const body = document.getElementById('presensiListBody');
    if (!body) return;

    const q = currentPresensiState.searchQuery;
    const div = currentPresensiState.filterDivision;

    const filtered = appState.members.filter(m => {
        const matchName = m.name.toLowerCase().includes(q) || m.id.toLowerCase().includes(q);
        const matchDiv = div === 'ALL' || m.division === div;
        return matchName && matchDiv;
    });

    if (filtered.length === 0) {
        body.innerHTML = `<tr><td colspan="3" class="text-center py-6 text-slate-400">Tidak ada anggota yang cocok.</td></tr>`;
        return;
    }

    body.innerHTML = filtered.map(m => {
        const currentStatus = currentPresensiState.statuses[m.id] || null;

        const getBtnClass = (statusType, colorClass) => {
            if (currentStatus === statusType) {
                return `${colorClass} text-white font-bold shadow`;
            }
            return `bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600`;
        };

        return `
            <tr class="border-b border-slate-100 dark:border-slate-700/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                <td class="p-3">
                    <div class="font-semibold text-slate-900 dark:text-white">${sanitize(m.name)}</div>
                    <div class="text-[10px] text-slate-400">${m.id}</div>
                </td>
                <td class="p-3">
                    <div class="text-slate-700 dark:text-slate-300">${sanitize(m.division)}</div>
                    <div class="text-[10px] text-slate-400">${sanitize(m.position)}</div>
                </td>
                <td class="p-3">
                    <div class="flex items-center justify-center space-x-1 sm:space-x-2">
                        <button type="button" onclick="setMemberStatus('${m.id}', 'Hadir')" class="px-2.5 py-1.5 rounded-md text-[11px] transition-all ${getBtnClass('Hadir', 'bg-emerald-600')}">
                            Hadir
                        </button>
                        <button type="button" onclick="setMemberStatus('${m.id}', 'Izin')" class="px-2.5 py-1.5 rounded-md text-[11px] transition-all ${getBtnClass('Izin', 'bg-amber-500')}">
                            Izin
                        </button>
                        <button type="button" onclick="setMemberStatus('${m.id}', 'Sakit')" class="px-2.5 py-1.5 rounded-md text-[11px] transition-all ${getBtnClass('Sakit', 'bg-blue-500')}">
                            Sakit
                        </button>
                        <button type="button" onclick="setMemberStatus('${m.id}', 'Alpha')" class="px-2.5 py-1.5 rounded-md text-[11px] transition-all ${getBtnClass('Alpha', 'bg-rose-600')}">
                            Alpha
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

function setMemberStatus(memberId, status) {
    if (status === null) {
        delete currentPresensiState.statuses[memberId];
    } else {
        currentPresensiState.statuses[memberId] = status;
    }
    renderPresensiRows();
}

function markAllStatus(status) {
    appState.members.forEach(m => {
        if (status === null) {
            delete currentPresensiState.statuses[m.id];
        } else {
            currentPresensiState.statuses[m.id] = status;
        }
    });
    renderPresensiRows();
}

function confirmAndSavePresensi() {
    const titleInput = document.getElementById('presensiTitle').value.trim();
    const dateInput = document.getElementById('presensiDate').value;
    const timeInput = document.getElementById('presensiTime').value;
    const locInput = document.getElementById('presensiLocation').value.trim();
    const descInput = document.getElementById('presensiDesc').value.trim();

    if (!titleInput) {
        showToast('Judul kegiatan wajib diisi!', 'error');
        return;
    }
    if (!dateInput) {
        showToast('Tanggal kegiatan wajib diisi!', 'error');
        return;
    }

    const filledCount = Object.keys(currentPresensiState.statuses).length;
    const totalMembers = appState.members.length;

    const modalBody = `
        <div class="space-y-3">
            <p class="text-sm text-slate-600 dark:text-slate-300">Konfirmasi pencatatan presensi kegiatan berikut:</p>
            <div class="bg-slate-50 dark:bg-slate-700/50 p-3 rounded-lg text-xs space-y-1">
                <div><strong>Judul:</strong> ${sanitize(titleInput)}</div>
                <div><strong>Waktu:</strong> ${dateInput} (${timeInput})</div>
                <div><strong>Lokasi:</strong> ${sanitize(locInput || '-')}</div>
                <div><strong>Catatan Presensi:</strong> ${filledCount} dari ${totalMembers} anggota diisi</div>
            </div>
        </div>
    `;

    const modalFooter = `
        <button onclick="closeModal()" class="px-4 py-2 text-xs border border-slate-300 dark:border-slate-600 rounded-lg">Batal</button>
        <button onclick="executeSavePresensi('${sanitize(titleInput)}', '${dateInput}', '${timeInput}', '${sanitize(locInput)}', '${sanitize(descInput)}')" class="px-4 py-2 text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg">Ya, Simpan Presensi</button>
    `;

    openModal('Konfirmasi Simpan Presensi', modalBody, modalFooter);
}

function executeSavePresensi(title, date, time, location, description) {
    closeModal();

    const newId = currentPresensiState.activityId || `ACT-${Date.now().toString().substr(-5)}`;
    
    const newActivity = {
        id: newId,
        title: title,
        date: date,
        time: time,
        location: location,
        description: description,
        attendance: { ...currentPresensiState.statuses }
    };

    const existingIdx = appState.activities.findIndex(a => a.id === newId);
    if (existingIdx >= 0) {
        appState.activities[existingIdx] = newActivity;
    } else {
        appState.activities.push(newActivity);
    }

    saveData();
    showToast('Presensi kegiatan berhasil disimpan!', 'success');
    resetPresensiForm();
    switchTab('riwayat');
}

function editPresensiActivity(actId) {
    const act = appState.activities.find(a => a.id === actId);
    if (!act) return;

    currentPresensiState = {
        activityId: act.id,
        title: act.title,
        date: act.date,
        time: act.time || '14:00',
        location: act.location || '',
        description: act.description || '',
        searchQuery: '',
        filterDivision: 'ALL',
        statuses: { ...(act.attendance || {}) }
    };

    switchTab('presensi');
}

// ==========================================
// 3. RIWAYAT KEGIATAN MODULE
// ==========================================
let riwayatFilter = {
    query: '',
    month: 'ALL',
    year: 'ALL'
};

function renderRiwayat(container) {
    const activities = appState.activities;
    const years = [...new Set(activities.map(a => a.date ? a.date.split('-')[0] : ''))].filter(Boolean);

    const yearOptions = years.map(y => `<option value="${y}">${y}</option>`).join('');

    const html = `
        <div class="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div>
                    <h3 class="font-bold text-slate-900 dark:text-white text-lg">Riwayat & Arsip Kegiatan</h3>
                    <p class="text-xs text-slate-500">Daftar seluruh kegiatan dan rekapitulasi kehadiran yang tercatat</p>
                </div>
                <button onclick="switchTab('presensi')" class="px-4 py-2 text-xs bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-lg shadow-md flex items-center space-x-2">
                    <i data-lucide="plus" class="w-4 h-4"></i>
                    <span>Buat Presensi Baru</span>
                </button>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div class="relative">
                    <i data-lucide="search" class="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400"></i>
                    <input type="text" id="riwayatSearch" oninput="applyRiwayatFilters()" placeholder="Cari nama kegiatan..." class="w-full text-xs pl-8 pr-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500">
                </div>
                <div>
                    <select id="riwayatMonth" onchange="applyRiwayatFilters()" class="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500">
                        <option value="ALL">Semua Bulan</option>
                        <option value="01">Januari</option>
                        <option value="02">Februari</option>
                        <option value="03">Maret</option>
                        <option value="04">April</option>
                        <option value="05">Mei</option>
                        <option value="06">Juni</option>
                        <option value="07">Juli</option>
                        <option value="08">Agustus</option>
                        <option value="09">September</option>
                        <option value="10">Oktober</option>
                        <option value="11">November</option>
                        <option value="12">Desember</option>
                    </select>
                </div>
                <div>
                    <select id="riwayatYear" onchange="applyRiwayatFilters()" class="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500">
                        <option value="ALL">Semua Tahun</option>
                        ${yearOptions}
                    </select>
                </div>
            </div>

            <div id="riwayatList" class="space-y-3 pt-2">
            </div>
        </div>
    `;

    container.innerHTML = html;
    renderRiwayatList();
}

function applyRiwayatFilters() {
    riwayatFilter.query = document.getElementById('riwayatSearch').value.toLowerCase();
    riwayatFilter.month = document.getElementById('riwayatMonth').value;
    riwayatFilter.year = document.getElementById('riwayatYear').value;
    renderRiwayatList();
}

function renderRiwayatList() {
    const container = document.getElementById('riwayatList');
    if (!container) return;

    const filtered = appState.activities.filter(act => {
        const matchQ = act.title.toLowerCase().includes(riwayatFilter.query) || (act.location && act.location.toLowerCase().includes(riwayatFilter.query));
        
        let matchM = true;
        let matchY = true;
        if (act.date) {
            const [y, m] = act.date.split('-');
            if (riwayatFilter.month !== 'ALL') matchM = (m === riwayatFilter.month);
            if (riwayatFilter.year !== 'ALL') matchY = (y === riwayatFilter.year);
        }

        return matchQ && matchM && matchY;
    });

    if (filtered.length === 0) {
        container.innerHTML = `<div class="text-center py-10 text-slate-400 text-sm">Tidak ditemukan kegiatan.</div>`;
        return;
    }

    container.innerHTML = filtered.reverse().map(act => {
        const counts = { Hadir: 0, Izin: 0, Sakit: 0, Alpha: 0 };
        if (act.attendance) {
            Object.values(act.attendance).forEach(s => counts[s] = (counts[s] || 0) + 1);
        }
        const totalLogged = counts.Hadir + counts.Izin + counts.Sakit + counts.Alpha;
        const hadirPct = totalLogged > 0 ? ((counts.Hadir / totalLogged) * 100).toFixed(0) : 0;

        return `
            <div class="bg-slate-50 dark:bg-slate-700/40 rounded-xl p-4 border border-slate-200 dark:border-slate-700 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-cyan-500/50 transition-colors">
                <div class="space-y-1">
                    <div class="flex items-center space-x-2">
                        <h4 class="font-bold text-slate-900 dark:text-white text-base">${sanitize(act.title)}</h4>
                        <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-100 dark:bg-cyan-900/60 text-cyan-800 dark:text-cyan-200">${hadirPct}% Hadir</span>
                    </div>
                    <div class="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
                        <span><i data-lucide="calendar" class="w-3.5 h-3.5 inline mr-1"></i>${act.date} (${act.time || '-'})</span>
                        <span><i data-lucide="map-pin" class="w-3.5 h-3.5 inline mr-1"></i>${sanitize(act.location || '-')}</span>
                    </div>
                    ${act.description ? `<p class="text-xs text-slate-600 dark:text-slate-300 pt-1">${sanitize(act.description)}</p>` : ''}
                </div>

                <div class="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                    <div class="grid grid-cols-4 gap-1 text-center text-xs">
                        <div class="bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-200 px-2.5 py-1 rounded">
                            <div class="font-bold">${counts.Hadir}</div>
                            <div class="text-[9px]">Hadir</div>
                        </div>
                        <div class="bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-200 px-2.5 py-1 rounded">
                            <div class="font-bold">${counts.Izin}</div>
                            <div class="text-[9px]">Izin</div>
                        </div>
                        <div class="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 px-2.5 py-1 rounded">
                            <div class="font-bold">${counts.Sakit}</div>
                            <div class="text-[9px]">Sakit</div>
                        </div>
                        <div class="bg-rose-100 dark:bg-rose-900/50 text-rose-800 dark:text-rose-200 px-2.5 py-1 rounded">
                            <div class="font-bold">${counts.Alpha}</div>
                            <div class="text-[9px]">Alpha</div>
                        </div>
                    </div>

                    <div class="flex items-center space-x-1 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-200 dark:border-slate-600 w-full sm:w-auto justify-end">
                        <button onclick="viewActivityDetail('${act.id}')" title="Detail Presensi" class="p-2 text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg">
                            <i data-lucide="eye" class="w-4 h-4"></i>
                        </button>
                        <button onclick="editPresensiActivity('${act.id}')" title="Edit Presensi" class="p-2 text-slate-600 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg">
                            <i data-lucide="edit-3" class="w-4 h-4"></i>
                        </button>
                        <button onclick="confirmDeleteActivity('${act.id}')" title="Hapus Kegiatan" class="p-2 text-slate-600 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg">
                            <i data-lucide="trash-2" class="w-4 h-4"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    refreshLucideIcons();
}

function viewActivityDetail(actId) {
    const act = appState.activities.find(a => a.id === actId);
    if (!act) return;

    const memberList = appState.members.map(m => {
        const status = (act.attendance && act.attendance[m.id]) || 'Belum Diisi';
        let badgeClass = 'bg-slate-100 text-slate-600';
        if (status === 'Hadir') badgeClass = 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300';
        else if (status === 'Izin') badgeClass = 'bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300';
        else if (status === 'Sakit') badgeClass = 'bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300';
        else if (status === 'Alpha') badgeClass = 'bg-rose-100 text-rose-800 dark:bg-rose-900/60 dark:text-rose-300';

        return `
            <div class="flex items-center justify-between p-2 rounded border-b border-slate-100 dark:border-slate-700/50 text-xs">
                <div>
                    <span class="font-semibold text-slate-900 dark:text-white">${sanitize(m.name)}</span>
                    <span class="text-slate-400 ml-2">(${sanitize(m.division)})</span>
                </div>
                <span class="px-2.5 py-0.5 rounded font-semibold text-[11px] ${badgeClass}">${status}</span>
            </div>
        `;
    }).join('');

    const modalBody = `
        <div class="space-y-4">
            <div class="bg-slate-50 dark:bg-slate-700/40 p-3 rounded-lg text-xs space-y-1">
                <div><strong>Kegiatan:</strong> ${sanitize(act.title)}</div>
                <div><strong>Waktu & Tanggal:</strong> ${act.date} ${act.time ? `(${act.time})` : ''}</div>
                <div><strong>Lokasi:</strong> ${sanitize(act.location || '-')}</div>
                <div><strong>Keterangan:</strong> ${sanitize(act.description || '-')}</div>
            </div>
            <div>
                <h5 class="font-bold text-sm text-slate-800 dark:text-slate-200 mb-2">Detail Kehadiran Per Anggota</h5>
                <div class="max-h-60 overflow-y-auto custom-scrollbar space-y-1">
                    ${memberList}
                </div>
            </div>
        </div>
    `;

    const modalFooter = `
        <button onclick="closeModal()" class="px-4 py-2 text-xs bg-slate-600 text-white rounded-lg">Tutup</button>
    `;

    openModal(`Detail: ${act.title}`, modalBody, modalFooter);
}

function confirmDeleteActivity(actId) {
    const act = appState.activities.find(a => a.id === actId);
    if (!act) return;

    const modalBody = `
        <p class="text-sm text-slate-600 dark:text-slate-300">
            Apakah Anda yakin ingin menghapus catatan kegiatan <strong class="text-rose-600">${sanitize(act.title)}</strong>?
        </p>
    `;

    const modalFooter = `
        <button onclick="closeModal()" class="px-4 py-2 text-xs border border-slate-300 dark:border-slate-600 rounded-lg">Batal</button>
        <button onclick="executeDeleteActivity('${actId}')" class="px-4 py-2 text-xs bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-lg">Hapus Kegiatan</button>
    `;

    openModal('Konfirmasi Hapus Kegiatan', modalBody, modalFooter);
}

function executeDeleteActivity(actId) {
    appState.activities = appState.activities.filter(a => a.id !== actId);
    saveData();
    closeModal();
    showToast('Kegiatan berhasil dihapus', 'success');
    renderRiwayat(document.getElementById('contentContainer'));
}

// ==========================================
// 4. DATA ANGGOTA MODULE
// ==========================================
let memberState = {
    search: '',
    division: 'ALL',
    sortBy: 'name-asc'
};

function renderAnggota(container) {
    const divOptions = appState.settings.divisions.map(d => `<option value="${d}">${d}</option>`).join('');

    const html = `
        <div class="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div>
                    <h3 class="font-bold text-slate-900 dark:text-white text-lg">Manajemen Data Anggota</h3>
                    <p class="text-xs text-slate-500">Kelola informasi anggota, bidang, dan status kepengurusan MSC</p>
                </div>
                <button onclick="openMemberModal()" class="px-4 py-2 text-xs bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md flex items-center space-x-2">
                    <i data-lucide="user-plus" class="w-4 h-4"></i>
                    <span>Tambah Anggota Baru</span>
                </button>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div class="relative">
                    <i data-lucide="search" class="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400"></i>
                    <input type="text" id="memberSearch" oninput="applyMemberFilters()" placeholder="Cari ID atau nama anggota..." class="w-full text-xs pl-8 pr-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                </div>
                <div>
                    <select id="memberDivFilter" onchange="applyMemberFilters()" class="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                        <option value="ALL">Semua Bidang</option>
                        ${divOptions}
                    </select>
                </div>
                <div>
                    <select id="memberSort" onchange="applyMemberFilters()" class="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                        <option value="name-asc">Urutkan: Nama (A - Z)</option>
                        <option value="name-desc">Urutkan: Nama (Z - A)</option>
                        <option value="id-asc">Urutkan: ID Anggota</option>
                    </select>
                </div>
            </div>

            <div class="overflow-x-auto">
                <table class="w-full text-left border-collapse text-xs">
                    <thead>
                        <tr class="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/50 text-slate-500 dark:text-slate-400 font-semibold">
                            <th class="p-3">ID Anggota</th>
                            <th class="p-3">Nama Lengkap</th>
                            <th class="p-3">Bidang</th>
                            <th class="p-3">Jabatan</th>
                            <th class="p-3">Angkatan</th>
                            <th class="p-3">Status</th>
                            <th class="p-3 text-right">Aksi</th>
                        </tr>
                    </thead>
                    <tbody id="memberTableBody">
                    </tbody>
                </table>
            </div>
        </div>
    `;

    container.innerHTML = html;
    renderMemberTable();
}

function applyMemberFilters() {
    memberState.search = document.getElementById('memberSearch').value.toLowerCase();
    memberState.division = document.getElementById('memberDivFilter').value;
    memberState.sortBy = document.getElementById('memberSort').value;
    renderMemberTable();
}

function renderMemberTable() {
    const body = document.getElementById('memberTableBody');
    if (!body) return;

    let filtered = appState.members.filter(m => {
        const matchSearch = m.name.toLowerCase().includes(memberState.search) || m.id.toLowerCase().includes(memberState.search);
        const matchDiv = memberState.division === 'ALL' || m.division === memberState.division;
        return matchSearch && matchDiv;
    });

    filtered.sort((a, b) => {
        if (memberState.sortBy === 'name-asc') return a.name.localeCompare(b.name);
        if (memberState.sortBy === 'name-desc') return b.name.localeCompare(a.name);
        if (memberState.sortBy === 'id-asc') return a.id.localeCompare(b.id);
        return 0;
    });

    if (filtered.length === 0) {
        body.innerHTML = `<tr><td colspan="7" class="text-center py-6 text-slate-400">Tidak ada anggota yang ditemukan.</td></tr>`;
        return;
    }

    body.innerHTML = filtered.map(m => `
        <tr class="border-b border-slate-100 dark:border-slate-700/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
            <td class="p-3 font-mono text-indigo-600 dark:text-indigo-400 font-medium">${m.id}</td>
            <td class="p-3 font-semibold text-slate-900 dark:text-white">${sanitize(m.name)}</td>
            <td class="p-3 text-slate-700 dark:text-slate-300">${sanitize(m.division)}</td>
            <td class="p-3 text-slate-600 dark:text-slate-400">${sanitize(m.position)}</td>
            <td class="p-3 text-slate-600 dark:text-slate-400">${m.cohort || '-'}</td>
            <td class="p-3">
                <span class="px-2 py-0.5 rounded-full text-[10px] font-semibold ${m.status === 'Aktif' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300' : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400'}">
                    ${m.status || 'Aktif'}
                </span>
            </td>
            <td class="p-3 text-right space-x-1">
                <button onclick="openMemberModal('${m.id}')" title="Edit Anggota" class="p-1.5 text-slate-500 hover:text-amber-600 dark:hover:text-amber-400 rounded">
                    <i data-lucide="edit-2" class="w-4 h-4 inline"></i>
                </button>
                <button onclick="confirmDeleteMember('${m.id}')" title="Hapus Anggota" class="p-1.5 text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 rounded">
                    <i data-lucide="trash-2" class="w-4 h-4 inline"></i>
                </button>
            </td>
        </tr>
    `).join('');
    refreshLucideIcons();
}

function openMemberModal(memberId = null) {
    const isEdit = !!memberId;
    const member = isEdit ? appState.members.find(m => m.id === memberId) : {
        id: `MSC-${(appState.members.length + 1).toString().padStart(3, '0')}`,
        name: '',
        division: appState.settings.divisions[0] || 'BPH',
        position: 'Anggota',
        cohort: '62',
        status: 'Aktif'
    };

    const divOptions = appState.settings.divisions.map(d => `<option value="${d}" ${d === member.division ? 'selected' : ''}>${d}</option>`).join('');

    const modalBody = `
        <form id="memberForm" class="space-y-3">
            <div>
                <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">ID Anggota *</label>
                <input type="text" id="mId" value="${member.id}" ${isEdit ? 'readonly' : ''} class="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-100 dark:bg-slate-700 text-slate-500 font-mono">
            </div>
            <div>
                <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Nama Lengkap *</label>
                <input type="text" id="mName" value="${sanitize(member.name)}" required placeholder="Contoh: Ahmad Zaki" class="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900">
            </div>
            <div class="grid grid-cols-2 gap-3">
                <div>
                    <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Bidang *</label>
                    <select id="mDiv" class="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900">
                        ${divOptions}
                    </select>
                </div>
                <div>
                    <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Jabatan *</label>
                    <input type="text" id="mPos" value="${sanitize(member.position)}" placeholder="Contoh: Koordinator / Anggota" class="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900">
                </div>
            </div>
            <div class="grid grid-cols-2 gap-3">
                <div>
                    <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Angkatan / Cohort</label>
                    <input type="text" id="mCohort" value="${sanitize(member.cohort)}" placeholder="Contoh: 62" class="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900">
                </div>
                <div>
                    <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Status Keanggotaan</label>
                    <select id="mStatus" class="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900">
                        <option value="Aktif" ${member.status === 'Aktif' ? 'selected' : ''}>Aktif</option>
                        <option value="Alumni / Non-Aktif" ${member.status !== 'Aktif' ? 'selected' : ''}>Alumni / Non-Aktif</option>
                    </select>
                </div>
            </div>
        </form>
    `;

    const modalFooter = `
        <button onclick="closeModal()" class="px-4 py-2 text-xs border border-slate-300 dark:border-slate-600 rounded-lg">Batal</button>
        <button onclick="saveMemberForm(${isEdit})" class="px-4 py-2 text-xs bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg">Simpan Anggota</button>
    `;

    openModal(isEdit ? 'Edit Data Anggota' : 'Tambah Anggota Baru', modalBody, modalFooter);
}

function saveMemberForm(isEdit) {
    const id = document.getElementById('mId').value.trim();
    const name = document.getElementById('mName').value.trim();
    const division = document.getElementById('mDiv').value;
    const position = document.getElementById('mPos').value.trim() || 'Anggota';
    const cohort = document.getElementById('mCohort').value.trim();
    const status = document.getElementById('mStatus').value;

    if (!name) {
        showToast('Nama anggota tidak boleh kosong!', 'error');
        return;
    }

    if (!isEdit && appState.members.some(m => m.id === id)) {
        showToast('ID Anggota sudah digunakan!', 'error');
        return;
    }

    const newMemberObj = { id, name, division, position, cohort, status };

    if (isEdit) {
        const idx = appState.members.findIndex(m => m.id === id);
        if (idx >= 0) appState.members[idx] = newMemberObj;
    } else {
        appState.members.push(newMemberObj);
    }

    saveData();
    closeModal();
    showToast('Data anggota berhasil disimpan!', 'success');
    renderAnggota(document.getElementById('contentContainer'));
}

function confirmDeleteMember(memberId) {
    const member = appState.members.find(m => m.id === memberId);
    if (!member) return;

    const modalBody = `
        <p class="text-sm text-slate-600 dark:text-slate-300">
            Apakah Anda yakin ingin menghapus data anggota <strong class="text-rose-600">${sanitize(member.name)}</strong> (${member.id})?
        </p>
    `;

    const modalFooter = `
        <button onclick="closeModal()" class="px-4 py-2 text-xs border border-slate-300 dark:border-slate-600 rounded-lg">Batal</button>
        <button onclick="executeDeleteMember('${memberId}')" class="px-4 py-2 text-xs bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-lg">Hapus Anggota</button>
    `;

    openModal('Konfirmasi Hapus Anggota', modalBody, modalFooter);
}

function executeDeleteMember(memberId) {
    appState.members = appState.members.filter(m => m.id !== memberId);
    saveData();
    closeModal();
    showToast('Anggota berhasil dihapus', 'success');
    renderAnggota(document.getElementById('contentContainer'));
}

// ==========================================
// 5. STATISTIK KEHADIRAN INDIVIDU MODULE
// ==========================================
let selectedMemberForStats = null;

function renderStatistik(container) {
    if (!selectedMemberForStats && appState.members.length > 0) {
        selectedMemberForStats = appState.members[0].id;
    }

    const memberOptions = appState.members.map(m => 
        `<option value="${m.id}" ${m.id === selectedMemberForStats ? 'selected' : ''}>${m.id} - ${sanitize(m.name)} (${sanitize(m.division)})</option>`
    ).join('');

    const html = `
        <div class="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-700 pb-4">
                <div>
                    <h3 class="font-bold text-slate-900 dark:text-white text-lg">Statistik Kehadiran Individu</h3>
                    <p class="text-xs text-slate-500">Pilih anggota untuk melihat persentase kedisiplinan dan rekap kegiatan</p>
                </div>
                <div class="w-full sm:w-72">
                    <select id="statsMemberSelect" onchange="changeStatsMember(this.value)" class="w-full text-xs font-semibold px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-white">
                        ${memberOptions}
                    </select>
                </div>
            </div>

            <div id="individualStatsView">
            </div>
        </div>
    `;

    container.innerHTML = html;
    renderIndividualMemberDetails();
}

function changeStatsMember(mId) {
    selectedMemberForStats = mId;
    renderIndividualMemberDetails();
}

function renderIndividualMemberDetails() {
    const container = document.getElementById('individualStatsView');
    if (!container) return;

    const member = appState.members.find(m => m.id === selectedMemberForStats);
    if (!member) {
        container.innerHTML = `<p class="text-center py-8 text-slate-400">Belum ada data anggota.</p>`;
        return;
    }

    let totalHadir = 0, totalIzin = 0, totalSakit = 0, totalAlpha = 0, totalActivitiesAttended = 0;
    const activityHistory = [];

    appState.activities.forEach(act => {
        if (act.attendance && act.attendance[member.id]) {
            totalActivitiesAttended++;
            const st = act.attendance[member.id];
            if (st === 'Hadir') totalHadir++;
            else if (st === 'Izin') totalIzin++;
            else if (st === 'Sakit') totalSakit++;
            else if (st === 'Alpha') totalAlpha++;

            activityHistory.push({
                title: act.title,
                date: act.date,
                status: st
            });
        }
    });

    const percentage = totalActivitiesAttended > 0 
        ? parseFloat(((totalHadir / totalActivitiesAttended) * 100).toFixed(1)) 
        : 0;

    const cardHTML = `
        <div class="space-y-6">
            <div class="bg-slate-50 dark:bg-slate-700/40 p-5 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div class="flex items-center space-x-4">
                    <div class="w-16 h-16 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-md">
                        ${member.name.charAt(0)}
                    </div>
                    <div>
                        <h4 class="font-bold text-lg text-slate-900 dark:text-white">${sanitize(member.name)}</h4>
                        <p class="text-xs text-slate-500 dark:text-slate-400">${member.id} | ${sanitize(member.division)} - ${sanitize(member.position)}</p>
                        <span class="inline-block mt-1 text-[10px] px-2 py-0.5 rounded bg-indigo-100 text-indigo-700 dark:bg-indigo-900/60 dark:text-indigo-300 font-semibold">Angkatan ${member.cohort || '-'}</span>
                    </div>
                </div>
                <div class="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 text-center w-full md:w-auto">
                    <p class="text-xs text-slate-400 uppercase font-medium">Persentase Kehadiran</p>
                    <h2 class="text-3xl font-extrabold ${percentage >= 80 ? 'text-emerald-500' : percentage >= 60 ? 'text-amber-500' : 'text-rose-500'} mt-0.5">${percentage}%</h2>
                    <p class="text-[10px] text-slate-400 mt-0.5">${totalHadir} dari ${totalActivitiesAttended} kegiatan diikuti</p>
                </div>
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div class="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 p-4 rounded-xl text-center">
                    <div class="text-xs font-semibold text-emerald-700 dark:text-emerald-300">Hadir</div>
                    <div class="text-2xl font-bold text-emerald-800 dark:text-emerald-200 mt-1">${totalHadir}</div>
                </div>
                <div class="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-4 rounded-xl text-center">
                    <div class="text-xs font-semibold text-amber-700 dark:text-amber-300">Izin</div>
                    <div class="text-2xl font-bold text-amber-800 dark:text-amber-200 mt-1">${totalIzin}</div>
                </div>
                <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-4 rounded-xl text-center">
                    <div class="text-xs font-semibold text-blue-700 dark:text-blue-300">Sakit</div>
                    <div class="text-2xl font-bold text-blue-800 dark:text-blue-200 mt-1">${totalSakit}</div>
                </div>
                <div class="bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800 p-4 rounded-xl text-center">
                    <div class="text-xs font-semibold text-rose-700 dark:text-rose-300">Alpha</div>
                    <div class="text-2xl font-bold text-rose-800 dark:text-rose-200 mt-1">${totalAlpha}</div>
                </div>
            </div>

            <div>
                <h4 class="font-bold text-slate-900 dark:text-white text-base mb-3">Riwayat Presensi Kegiatan</h4>
                <div class="space-y-2 max-h-72 overflow-y-auto custom-scrollbar">
                    ${activityHistory.length === 0 ? `<p class="text-xs text-slate-400 py-4 text-center">Belum ada riwayat presensi untuk anggota ini.</p>` :
                    activityHistory.map(h => {
                        let stColor = 'bg-slate-100 text-slate-600';
                        if (h.status === 'Hadir') stColor = 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300';
                        else if (h.status === 'Izin') stColor = 'bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300';
                        else if (h.status === 'Sakit') stColor = 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300';
                        else if (h.status === 'Alpha') stColor = 'bg-rose-100 dark:bg-rose-900/50 text-rose-700 dark:text-rose-300';

                        return `
                            <div class="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-700/30 text-xs">
                                <div>
                                    <span class="font-semibold text-slate-900 dark:text-white">${sanitize(h.title)}</span>
                                    <span class="text-slate-400 ml-2">(${h.date})</span>
                                </div>
                                <span class="px-2.5 py-1 rounded font-bold ${stColor}">${h.status}</span>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        </div>
    `;

    container.innerHTML = cardHTML;
}

// ==========================================
// 6. LAPORAN & EXPORT MODULE
// ==========================================
function renderLaporan(container) {
    const html = `
        <div class="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-700 pb-4">
                <div>
                    <h3 class="font-bold text-slate-900 dark:text-white text-lg">Laporan & Rekapitulasi Presensi</h3>
                    <p class="text-xs text-slate-500">Cetak dan unduh data presensi ke format Excel, CSV, atau Print</p>
                </div>
                <div class="flex flex-wrap items-center gap-2">
                    <button onclick="exportToExcel()" class="px-3 py-2 text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg shadow flex items-center space-x-1.5">
                        <i data-lucide="file-spreadsheet" class="w-4 h-4"></i>
                        <span>Export Excel</span>
                    </button>
                    <button onclick="exportToCSV()" class="px-3 py-2 text-xs bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow flex items-center space-x-1.5">
                        <i data-lucide="file-text" class="w-4 h-4"></i>
                        <span>Export CSV</span>
                    </button>
                    <button onclick="exportToPDF()" class="px-3 py-2 text-xs bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-lg shadow flex items-center space-x-1.5">
                        <i data-lucide="printer" class="w-4 h-4"></i>
                        <span>Cetak Laporan</span>
                    </button>
                </div>
            </div>

            <div id="printReportArea" class="space-y-6">
                <div class="text-center pb-2">
                    <h4 class="font-bold text-base text-slate-900 dark:text-white">${appState.settings.orgName || 'Muallimin Scientific Community'}</h4>
                    <p class="text-xs text-slate-500">Laporan Rekapitulasi Kehadiran Anggota - Periode ${appState.settings.period}</p>
                </div>

                <div class="overflow-x-auto">
                    <table class="w-full text-left border-collapse text-xs">
                        <thead>
                            <tr class="border-b border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold">
                                <th class="p-2.5">No</th>
                                <th class="p-2.5">ID</th>
                                <th class="p-2.5">Nama Anggota</th>
                                <th class="p-2.5">Bidang</th>
                                <th class="p-2.5 text-center">Hadir</th>
                                <th class="p-2.5 text-center">Izin</th>
                                <th class="p-2.5 text-center">Sakit</th>
                                <th class="p-2.5 text-center">Alpha</th>
                                <th class="p-2.5 text-center">Total Kegiatan</th>
                                <th class="p-2.5 text-right">% Kehadiran</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${generateReportRowsHTML()}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;

    container.innerHTML = html;
    refreshLucideIcons();
}

function generateReportRowsHTML() {
    if (appState.members.length === 0) {
        return `<tr><td colspan="10" class="text-center py-6 text-slate-400">Tidak ada data anggota.</td></tr>`;
    }

    return appState.members.map((m, idx) => {
        let h = 0, i = 0, s = 0, a = 0, tot = 0;
        appState.activities.forEach(act => {
            if (act.attendance && act.attendance[m.id]) {
                tot++;
                const st = act.attendance[m.id];
                if (st === 'Hadir') h++;
                else if (st === 'Izin') i++;
                else if (st === 'Sakit') s++;
                else if (st === 'Alpha') a++;
            }
        });

        const pct = tot > 0 ? ((h / tot) * 100).toFixed(1) : '0.0';

        return `
            <tr class="border-b border-slate-100 dark:border-slate-700/50">
                <td class="p-2.5">${idx + 1}</td>
                <td class="p-2.5 font-mono">${m.id}</td>
                <td class="p-2.5 font-semibold text-slate-900 dark:text-white">${sanitize(m.name)}</td>
                <td class="p-2.5 text-slate-600 dark:text-slate-400">${sanitize(m.division)}</td>
                <td class="p-2.5 text-center font-bold text-emerald-600">${h}</td>
                <td class="p-2.5 text-center font-bold text-amber-600">${i}</td>
                <td class="p-2.5 text-center font-bold text-blue-600">${s}</td>
                <td class="p-2.5 text-center font-bold text-rose-600">${a}</td>
                <td class="p-2.5 text-center">${tot}</td>
                <td class="p-2.5 text-right font-bold ${parseFloat(pct) >= 75 ? 'text-emerald-600' : 'text-rose-600'}">${pct}%</td>
            </tr>
        `;
    }).join('');
}

function exportToExcel() {
    const data = appState.members.map(m => {
        let h = 0, i = 0, s = 0, a = 0, tot = 0;
        appState.activities.forEach(act => {
            if (act.attendance && act.attendance[m.id]) {
                tot++;
                const st = act.attendance[m.id];
                if (st === 'Hadir') h++;
                else if (st === 'Izin') i++;
                else if (st === 'Sakit') s++;
                else if (st === 'Alpha') a++;
            }
        });
        const pct = tot > 0 ? ((h / tot) * 100).toFixed(1) : '0.0';

        return {
            'ID Anggota': m.id,
            'Nama Anggota': m.name,
            'Bidang': m.division,
            'Jabatan': m.position,
            'Hadir': h,
            'Izin': i,
            'Sakit': s,
            'Alpha': a,
            'Total Kegiatan': tot,
            'Persentase Kehadiran (%)': parseFloat(pct)
        };
    });

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Rekap Kehadiran");
    XLSX.writeFile(workbook, `Rekap_Presensi_MSC_${new Date().toISOString().split('T')[0]}.xlsx`);
    showToast('Laporan Excel berhasil diunduh!', 'success');
}

function exportToCSV() {
    let csvContent = "data:text/csv;charset=utf-8,ID,Nama,Bidang,Hadir,Izin,Sakit,Alpha,Total,Persentase\n";
    appState.members.forEach(m => {
        let h = 0, i = 0, s = 0, a = 0, tot = 0;
        appState.activities.activities.forEach(act => {
            if (act.attendance && act.attendance[m.id]) {
                tot++;
                const st = act.attendance[m.id];
                if (st === 'Hadir') h++;
                else if (st === 'Izin') i++;
                else if (st === 'Sakit') s++;
                else if (st === 'Alpha') a++;
            }
        });
        const pct = tot > 0 ? ((h / tot) * 100).toFixed(1) : '0.0';
        csvContent += `"${m.id}","${m.name}","${m.division}",${h},${i},${s},${a},${tot},"${pct}%"\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Rekap_Presensi_MSC_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Laporan CSV berhasil diunduh!', 'success');
}

function exportToPDF() {
    window.print();
}

// ==========================================
// 7. PENGATURAN MODULE
// ==========================================
function renderPengaturan(container) {
    const set = appState.settings;

    const divBadges = set.divisions.map((d, idx) => `
        <div class="flex items-center space-x-2 bg-slate-100 dark:bg-slate-700 px-3 py-1.5 rounded-lg text-xs font-semibold">
            <span>${d}</span>
            <button onclick="removeDivision(${idx})" class="text-rose-500 hover:text-rose-700"><i data-lucide="x" class="w-3.5 h-3.5"></i></button>
        </div>
    `).join('');

    const html = `
        <div class="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
            <div>
                <h3 class="font-bold text-slate-900 dark:text-white text-lg">Pengaturan Sistem</h3>
                <p class="text-xs text-slate-500">Konfigurasi nama organisasi, bidang, dan manajemen data</p>
            </div>

            <div class="space-y-4 border-b border-slate-200 dark:border-slate-700 pb-5">
                <h4 class="font-bold text-sm text-slate-800 dark:text-slate-200">Identitas Organisasi</h4>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Nama Organisasi</label>
                        <input type="text" id="setOrgName" value="${sanitize(set.orgName)}" class="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900">
                    </div>
                    <div>
                        <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Nama Sistem</label>
                        <input type="text" id="setSysName" value="${sanitize(set.sysName)}" class="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900">
                    </div>
                    <div>
                        <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Periode Kepengurusan</label>
                        <input type="text" id="setPeriod" value="${sanitize(set.period)}" class="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900">
                    </div>
                </div>
                <button onclick="saveGeneralSettings()" class="px-4 py-2 text-xs bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-lg shadow">
                    Simpan Pengaturan Organisasi
                </button>
            </div>

            <div class="space-y-3 border-b border-slate-200 dark:border-slate-700 pb-5">
                <h4 class="font-bold text-sm text-slate-800 dark:text-slate-200">Kelola Daftar Bidang</h4>
                <div class="flex items-center space-x-2">
                    <input type="text" id="newDivInput" placeholder="Nama bidang baru..." class="text-xs px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 w-64">
                    <button onclick="addNewDivision()" class="px-3 py-2 text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg">
                        Tambah Bidang
                    </button>
                </div>
                <div class="flex flex-wrap gap-2 pt-2">
                    ${divBadges}
                </div>
            </div>

            <div class="space-y-4 border-b border-slate-200 dark:border-slate-700 pb-5">
                <h4 class="font-bold text-sm text-slate-800 dark:text-slate-200">Backup & Restore Data (JSON)</h4>
                <p class="text-xs text-slate-500">Ekspor seluruh data sistem ke file JSON atau impor data dari backup sebelumnya.</p>
                <div class="flex flex-wrap items-center gap-3">
                    <button onclick="exportJSONBackup()" class="px-4 py-2 text-xs bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow flex items-center space-x-1.5">
                        <i data-lucide="download" class="w-4 h-4"></i>
                        <span>Unduh File Backup JSON</span>
                    </button>
                    <label class="px-4 py-2 text-xs bg-slate-700 hover:bg-slate-800 text-white font-semibold rounded-lg shadow cursor-pointer flex items-center space-x-1.5">
                        <i data-lucide="upload" class="w-4 h-4"></i>
                        <span>Restore / Import JSON</span>
                        <input type="file" id="importJsonFile" onchange="importJSONBackup(event)" accept=".json" class="hidden">
                    </label>
                </div>
            </div>

            <div class="space-y-4 pt-2">
                <h4 class="font-bold text-sm text-rose-600">Zona Bahaya</h4>
                <p class="text-xs text-slate-500">Opsi pembersihan data sistem secara permanen.</p>
                <div class="flex flex-wrap items-center gap-3">
                    <button onclick="confirmResetActivitiesOnly()" class="px-4 py-2 text-xs bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg shadow flex items-center space-x-1.5">
                        <i data-lucide="rotate-ccw" class="w-4 h-4"></i>
                        <span>Reset Seluruh Presensi Kegiatan</span>
                    </button>
                    <button onclick="confirmClearAllData()" class="px-4 py-2 text-xs bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-lg shadow flex items-center space-x-1.5">
                        <i data-lucide="alert-triangle" class="w-4 h-4"></i>
                        <span>Hapus Seluruh Data Total</span>
                    </button>
                </div>
            </div>
        </div>
    `;

    container.innerHTML = html;
    refreshLucideIcons();
}

function saveGeneralSettings() {
    appState.settings.orgName = document.getElementById('setOrgName').value.trim();
    appState.settings.sysName = document.getElementById('setSysName').value.trim();
    appState.settings.period = document.getElementById('setPeriod').value.trim();
    saveData();
    updateUIHeader();
    showToast('Pengaturan organisasi berhasil diperbarui!', 'success');
}

function addNewDivision() {
    const input = document.getElementById('newDivInput');
    const val = input.value.trim();
    if (!val) return;
    if (appState.settings.divisions.includes(val)) {
        showToast('Bidang sudah ada!', 'error');
        return;
    }
    appState.settings.divisions.push(val);
    saveData();
    showToast('Bidang baru ditambahkan!', 'success');
    renderPengaturan(document.getElementById('contentContainer'));
}

function removeDivision(index) {
    if (appState.settings.divisions.length <= 1) {
        showToast('Minimal harus ada 1 bidang!', 'error');
        return;
    }
    appState.settings.divisions.splice(index, 1);
    saveData();
    renderPengaturan(document.getElementById('contentContainer'));
}

function exportJSONBackup() {
    const jsonStr = JSON.stringify(appState, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `MSC_Attendance_Backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('File backup JSON berhasil dibuat!', 'success');
}

function importJSONBackup(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const parsed = JSON.parse(e.target.result);
            if (parsed.members && parsed.activities) {
                appState = parsed;
                saveData();
                initApp();
                showToast('Data berhasil dipulihkan dari file backup!', 'success');
            } else {
                showToast('Format file JSON backup tidak valid!', 'error');
            }
        } catch(err) {
            showToast('Gagal membaca file JSON!', 'error');
        }
    };
    reader.readAsText(file);
}

function confirmClearAllData() {
    const modalBody = `
        <div class="space-y-3">
            <p class="text-sm text-slate-600 dark:text-slate-300">
                <strong class="text-rose-600">PERINGATAN:</strong> Anda akan menghapus seluruh data anggota dan kegiatan presensi.
            </p>
            <p class="text-xs text-slate-500">Ketik kata kunci <strong>RESET</strong> di bawah untuk mengonfirmasi:</p>
            <input type="text" id="confirmResetKeyword" placeholder="Ketik RESET" class="w-full text-xs px-3 py-2 border rounded-lg dark:bg-slate-900 border-slate-300 dark:border-slate-600">
        </div>
    `;

    const modalFooter = `
        <button onclick="closeModal()" class="px-4 py-2 text-xs border rounded-lg">Batal</button>
        <button onclick="executeFactoryReset()" class="px-4 py-2 text-xs bg-rose-600 text-white font-semibold rounded-lg">Konfirmasi Reset</button>
    `;

    openModal('Konfirmasi Menghapus Seluruh Data', modalBody, modalFooter);
}

function executeFactoryReset() {
    const input = document.getElementById('confirmResetKeyword');
    if (!input || input.value.trim() !== 'RESET') {
        showToast('Kata kunci konfirmasi salah!', 'error');
        return;
    }

    localStorage.removeItem(STORAGE_KEY);
    appState = JSON.parse(JSON.stringify(INITIAL_EMPTY_DATA));
    saveData();
    closeModal();
    initApp();
    showToast('Sistem berhasil dibersihkan total.', 'success');
}
function confirmResetActivitiesOnly() {
    const modalBody = `
        <div class="space-y-3">
            <p class="text-sm text-slate-600 dark:text-slate-300">
                Fitur ini akan <strong class="text-amber-600">menghapus seluruh riwayat presensi kegiatan</strong> tetapi <strong class="text-emerald-600">tetap mempertahankan data 34 anggota</strong>.
            </p>
            <p class="text-xs text-slate-500">Ketik kata kunci <strong>RESET ABSEN</strong> di bawah untuk mengonfirmasi:</p>
            <input type="text" id="confirmResetAbsenKeyword" placeholder="Ketik RESET ABSEN" class="w-full text-xs px-3 py-2 border rounded-lg dark:bg-slate-900 border-slate-300 dark:border-slate-600">
        </div>
    `;

    const modalFooter = `
        <button onclick="closeModal()" class="px-4 py-2 text-xs border rounded-lg">Batal</button>
        <button onclick="executeResetActivitiesOnly()" class="px-4 py-2 text-xs bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg">Konfirmasi Reset Absensi</button>
    `;

    openModal('Konfirmasi Reset Presensi Kegiatan', modalBody, modalFooter);
}

function executeResetActivitiesOnly() {
    const input = document.getElementById('confirmResetAbsenKeyword');
    if (!input || input.value.trim() !== 'RESET ABSEN') {
        showToast('Kata kunci konfirmasi salah!', 'error');
        return;
    }

    appState.activities = [];
    saveData();
    closeModal();
    initApp();
    showToast('Seluruh data presensi kegiatan berhasil dikosongkan. Data anggota tetap utuh.', 'success');
}

function confirmClearAllData() {
    const modalBody = `
        <div class="space-y-3">
            <p class="text-sm text-slate-600 dark:text-slate-300">
                <strong class="text-rose-600">PERINGATAN:</strong> Anda akan menghapus seluruh data anggota dan kegiatan presensi.
            </p>
            <p class="text-xs text-slate-500">Ketik kata kunci <strong>RESET</strong> di bawah untuk mengonfirmasi:</p>
            <input type="text" id="confirmResetKeyword" placeholder="Ketik RESET" class="w-full text-xs px-3 py-2 border rounded-lg dark:bg-slate-900 border-slate-300 dark:border-slate-600">
        </div>
    `;

    const modalFooter = `
        <button onclick="closeModal()" class="px-4 py-2 text-xs border rounded-lg">Batal</button>
        <button onclick="executeFactoryReset()" class="px-4 py-2 text-xs bg-rose-600 text-white font-semibold rounded-lg">Konfirmasi Reset</button>
    `;

    openModal('Konfirmasi Menghapus Seluruh Data', modalBody, modalFooter);
}

function executeFactoryReset() {
    const input = document.getElementById('confirmResetKeyword');
    if (!input || input.value.trim() !== 'RESET') {
        showToast('Kata kunci konfirmasi salah!', 'error');
        return;
    }

    localStorage.removeItem(STORAGE_KEY);
    appState = JSON.parse(JSON.stringify(INITIAL_EMPTY_DATA));
    saveData();
    closeModal();
    initApp();
    showToast('Sistem berhasil dibersihkan total.', 'success');
}