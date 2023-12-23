document.querySelector(".fa-bell")?.addEventListener("click", (e) => {
  e.preventDefault()
  Notification.requestPermission((status) => {
    console.log('Notification permission status:', status);
  });
})

function showANotification(options: NotificationOptions) {
  if (Notification.permission === 'granted') {
    navigator.serviceWorker.getRegistrations().then((reg) => {
      reg[0].showNotification('Modo', options);
      reg[0].pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: "",
      }).then(() => { })
    });
  }
}



// This for testing only
var options = {
  body: "مرحبا، أنا Modo! هذا الإشعار للاختبار فحسب. يمكنك إغلاقه من إعدادات متصفحك..",
  icon: '../../images/icons/android/android-launchericon-512-512.png',
  badge: '../../images/icon.png',

};
// showANotification(options)
self.addEventListener('push', (event) => {
  event.waitUntil(
    self.registration.showNotification('Notification Title', options)
  );
});

