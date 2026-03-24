const topAvatar = document.getElementById("topAvatar");
const profileMenuBar = document.getElementById("profileMenuBar");

topAvatar.addEventListener("click", () => {
  profileMenuBar.classList.toggle("show");
});
document.addEventListener("click", (e) => {
  if (!profileMenuBar.contains(e.target) && e.target !== topAvatar) {
    profileMenuBar.classList.remove("show");
  }
});
function openAlbum(albumId, title) {

    document.getElementById("album-grid").style.display = "none";

    const viewer = document.getElementById("album-view");
    viewer.classList.add("active");

    document.getElementById("album-title").textContent = title;

    document.querySelectorAll(".album-gallery").forEach(g => {
        g.classList.remove("active");
    });
    document.getElementById(albumId).classList.add("active");
}

function closeAlbum() {

    document.getElementById("album-grid").style.display = "grid";

    document.getElementById("album-view").classList.remove("active");

    document.querySelectorAll(".album-gallery").forEach(g => {
        g.classList.remove("active");
    });
}
document.querySelectorAll(".profile-tab").forEach(button => {
    button.addEventListener("click", function () {

        const tabName = this.dataset.tab;

        document.querySelectorAll(".profile-tab")
            .forEach(btn => btn.classList.remove("active"));

        this.classList.add("active");

        document.querySelectorAll(".tab-content")
            .forEach(tab => tab.classList.remove("active"));

        const activeTab = document.getElementById(tabName);
        if (activeTab) {
            activeTab.classList.add("active");
        }
        if (tabName === "media") {
            closeAlbum();
        }
    });
});;
    (function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b.createElement('script');d.innerHTML="window.__CF$cv$params={r:'9d131f83a7bfc7b1',t:'MTc3MTY0NDE4Ni4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";b.getElementsByTagName('head')[0].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();