document.querySelector(".fa-bell")?.addEventListener("click", (e) => {
  e.preventDefault()
  Notification.requestPermission((status) => {
    console.log('Notification permission status:', status);
  });
})

function showANotification  (options: NotificationOptions) {
  if (Notification.permission === 'granted') {
    navigator.serviceWorker.getRegistrations().then((reg) => {
      reg[0].showNotification('Modo', options);
      reg[0].pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: "",
      }).then(() =>{})
    });
  }
}



// This for testing only
var options = {
  body: 'مرحبا انا محمود',
  icon: '../../images/icon-72×72.ico',
  badge: '../../images/icon-72×72.webp',

};
showANotification(options)
