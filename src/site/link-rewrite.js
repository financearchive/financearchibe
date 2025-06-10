document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href$=".pdf"]').forEach(link => {
        const href = link.getAttribute('href');
        const match = href.match(/([^#]+)(#page=(\d+))?/);
        if (match) {
            const fileName = match[1];
            const page = match[3] || '1';
            link.href = `/pdf-viewer.html?file=${encodeURIComponent(fileName)}&page=${page}`;
        }
    });
});
