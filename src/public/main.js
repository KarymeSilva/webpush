const PUBLIC_VAPID_KEY =
  "BHpYlHnXovuhyd9Xh8nx9JOI1pZNMB8sjsQH_QicqvvidTfyuVce4DerKzFs2EcvNJmjUPnBisnwmb861Q-_ubg";


  function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }



const subscription = async () => {
//
    const register = await navigator.serviceWorker.register("/worker.js", {
        scope: "/"
      });
      console.log("New Service Worker");

      const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY)
    });

 await fetch("/subscription", {
    method: "POST",
  body:JSON.stringify(subscription),
    headers: {
      "Content-Type": "application/json"
    }
  });
  console.log("Subscribed!");
};


const form = document.querySelector('#myform');
const message = document.querySelector('#message');

console.log(message.value)

form.addEventListener('submit', (e) => {
  e.preventDefault();
  fetch('/new-message',{
    method: 'POST',
    body: JSON.stringify({message: message.value}),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  form.reset();
})
subscription();
 