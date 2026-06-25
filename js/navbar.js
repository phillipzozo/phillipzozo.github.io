/**
 * 動態加載並初始化導航欄
 */
async function loadNavbar() {
    try {
        const response = await fetch('navbar.html');
        const navbarHTML = await response.text();
        
        // 創建一個容器來插入 navbar
        const navbarContainer = document.createElement('div');
        navbarContainer.innerHTML = navbarHTML;
        document.body.insertBefore(navbarContainer.firstElementChild, document.body.firstChild);
        
        // 初始化主題
        initThemeNavbar();
        
        // 初始化手機選單
        initMobileMenu();
        
        // 初始化導航欄活躍狀態
        initActiveNavItem();
    } catch (error) {
        console.error('Failed to load navbar:', error);
    }
}

/**
 * 初始化深色/淺色主題邏輯
 */
function initThemeNavbar() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeToggleBtnMobile = document.getElementById('theme-toggle-mobile');
    
    // 檢查 LocalStorage 或系統偏好
    if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }

    const toggleTheme = () => {
        document.documentElement.classList.toggle('dark');
        if (document.documentElement.classList.contains('dark')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    };

    if (themeToggleBtn) themeToggleBtn.addEventListener('click', toggleTheme);
    if (themeToggleBtnMobile) themeToggleBtnMobile.addEventListener('click', toggleTheme);
}

/**
 * 初始化手機選單
 */
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }
}

/**
 * 初始化導航欄活躍狀態
 */
function initActiveNavItem() {
    // 監聽 hash 變化
    window.addEventListener('hashchange', updateActiveNavItemFromHash);
    
    // 監聽 nav-btn 點擊
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('nav-btn')) {
            const target = e.target.getAttribute('data-target');
            if (target) {
                updateActiveNavItem(target);
            }
        }
    });
    
    // 初始化：根據當前 hash 設置活躍項
    updateActiveNavItemFromHash();
}

/**
 * 根據 URL hash 更新活躍狀態
 */
function updateActiveNavItemFromHash() {
    const hash = window.location.hash.substring(1) || 'home';
    updateActiveNavItem(hash);
}

/**
 * 切換手機選單顯示/隱藏
 */
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
        if (mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.remove('hidden');
        } else {
            mobileMenu.classList.add('hidden');
        }
    }
}

/**
 * 更新導航欄中的活躍狀態
 */
function updateActiveNavItem(pageId) {
    const navBtns = document.querySelectorAll('.nav-btn');
    navBtns.forEach(btn => {
        if (btn.getAttribute('data-target') === pageId) {
            btn.classList.add('text-primary', 'border-b-2', 'border-primary');
            btn.setAttribute('data-active', 'true');
        } else {
            btn.classList.remove('text-primary', 'border-b-2', 'border-primary');
            btn.setAttribute('data-active', 'false');
        }
    });
}

// 頁面加載完成後動態加載 navbar
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadNavbar);
} else {
    loadNavbar();
}
