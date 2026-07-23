// header-loader.js (file:// 対応・CORSエラー完全回避版)

document.addEventListener('DOMContentLoaded', () => {
    const placeholder = document.getElementById('header-placeholder');
    if (!placeholder) return;

    // ① JSの中に直接ヘッダーのHTMLを持たせる（これで fetch が不要になりCORSエラーが消える！）
    const headerHTML = `
    <header class="navbar navbar-expand-md mb-auto border-bottom">
        <div class="container-fluid">
            <a class="navbar-brand me-1" href="index.html">ABC社保守管理システム</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <div class="navbar-nav ms-auto">
                    <a class="nav-link" href="index.html">トップ画面</a>
                    <a class="nav-link" href="quotation.index.html">JSU見積機能</a>
                    <a class="nav-link" href="contract.index.html">保守契約</a>
                    <a class="nav-link" href="incident-management.index.html">障害対応</a>
                    <span class="navbar-text">[技術部 山田太郎]</span>
                </div>
            </div>
        </div>
    </header>
    `;

    // ② 画面にヘッダーを挿入
    placeholder.innerHTML = headerHTML;

    // ③ 現在のファイル名から「ドットより前の名前」を取得して active を自動付与
    const currentFile = window.location.pathname.split('/').pop() || 'index.html';
    const currentCategory = currentFile.split('.')[0]; 

    const navLinks = placeholder.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (!href) return;

        const linkCategory = href.split('.')[0];

        if (currentCategory === linkCategory) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        } else {
            link.classList.remove('active');
        }
    });
});