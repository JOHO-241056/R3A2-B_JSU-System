// header-loader.js (file:// 対応・CORSエラー完全回避版 + UIブラッシュアップ)

document.addEventListener('DOMContentLoaded', () => {
    const placeholder = document.getElementById('header-placeholder');
    if (!placeholder) return;

    // ① JSの中に直接ヘッダーのHTMLを持たせる（Bootstrapクラスで少しリッチに）
    const headerHTML = `
    <header class="navbar navbar-expand-md navbar-dark bg-primary mb-4 shadow-sm">
        <div class="container-fluid px-3">
            <a class="navbar-brand fw-bold" href="index.html">
                ABC社保守管理システム
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <div class="navbar-nav ms-auto align-items-center gap-2">
                    <a class="nav-link fw-semibold px-2" href="index.html">ダッシュボード</a>
                    <a class="nav-link fw-semibold px-2" href="quotation.index.html">JSU見積機能</a>
                    <a class="nav-link fw-semibold px-2" href="contract.index.html">保守契約</a>
                    <a class="nav-link fw-semibold px-2" href="incident-management.index.html">障害対応</a>
                    
                    <!-- ユーザー情報をバッジ風にして右側に配置 -->
                    <div class="nav-item ms-md-3 mt-2 mt-md-0">
                        <span class="badge bg-light text-primary rounded-pill px-3 py-2 border border-light">
                            👤 技術部 山田太郎
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </header>
    `;

    // ② 画面にヘッダーを挿入
    placeholder.innerHTML = headerHTML;

    // ③ 現在のファイル名から「ドットより前の名前」を取得して active を自動付与
    const currentPath = window.location.pathname;
    // URLが「/」で終わる場合は暗黙的に index.html とみなす安全対策を追加
    const currentFile = currentPath.endsWith('/') ? 'index.html' : currentPath.split('/').pop() || 'index.html';
    const currentCategory = currentFile.split('.')[0];

    const navLinks = placeholder.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (!href) return;

        const linkCategory = href.split('.')[0];

        // activeクラスの付与に加えて、下線を引いて視覚的に強調
        if (currentCategory === linkCategory) {
            link.classList.add('active', 'border-bottom', 'border-2');
            link.setAttribute('aria-current', 'page');
        } else {
            link.classList.remove('active', 'border-bottom', 'border-2');
        }
    });
});