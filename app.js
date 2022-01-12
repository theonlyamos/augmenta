const video = document.getElementsByTagName('video')[0]
const deviceInfoElem = document.getElementById('deviceInfo')
const devicePlatformElem = document.getElementById('devicePlatform')
const gpsInfoElem = document.getElementById('gpsInfo')

const start = async () => {
    try {
        let mediaConstraints = {video: true};
        if (navigator.userAgentData.mobile){
            mediaConstraints.video = {facingMode: 'user'}
        }
        let stream = await navigator.mediaDevices.getUserMedia({video: true})
        video.srcObject = stream
    } catch (error) {
        console.error(error)
    }
}

const toggleCamera = async() => {

}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            }
            gpsInfoElem.innerText = `${pos.lat}, ${pos.lng}`;
        }, function () {
            console.log("Your device does not support geolocation")
        });
    } else {
        // Browser doesn't support Geolocation
        console.log("Your device does not support geoloaction")
    }
}

window.addEventListener('load', () => {
    start()
    devicePlatformElem.innerHTML = navigator.userAgentData.platform
    getLocation();
})