//Asignar nombre y versión de la cache
const CACHE_NAME = 'v1_cache_YaeylinGarciaPWA';

//Ficheros a cachear en la aplicación
var urlToCache = [
    './',
    './css/styles.css',
    './img/messi-1805.jpg',
    './img/Cristiano_Ronaldo_playing_for_Al_Nassr_FC_against_Persepolis,_September_2023_(cropped).jpg',
    './img/Neymar.jpg',
    './img/facebook (2).jpeg',
    './img/facebook (4).jpeg',
    './img/facebook (8).jpeg',
    './img/EC16x16.png',
    './img/EC1024x1024.png',
    './img/EC512x512.png',
    './img/EC384x384.png',
    './img/EC256x256.png',
    './img/EC192x192.png',
    './img/EC128x128.png',
    './img/EC96x96.png',
    './img/EC64x64.png',
    './img/EC32x32.png',
    './img/EC16x16.png'
];

//Evento install
//Instalacion del service Worker y guarda en cache los recursos estaticos

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => cache.addAll(urlToCache)
        .then(() => {
            self.skipWiting();
        })    
    )
    )
})

//Evento activate
// Que la app funcione sin conexión
self.addEventListener('activate', e => {
	const cacheWhitelist =[CACHE_NAME];

	e.waitUntil(
		caches.keys()
			.then(cacheNames => {
				return Promise.all(
					cacheNames.map(cacheName => {

						if(cacheWhitelist.indexOf(cacheName) === -1){
							// Borrar elementos que no se necesitan
							return caches.delete(cacheName);
						}

					})
				);
			})
		.then(() => {
			//Activar cache
			self.clients.claim();
		})
	);
});

//Evento fetch
self.addEventListener('fetch', e => {

	e.respondWith(
		caches.match(e.request)
		.then(res =>{
			if(res){
				return res;
			}
			return fetch(e.request);
		})
	);
});