let mute = document.getElementById('mute')
let unmute = document.getElementById('unmute')
let sound = document.querySelector('.sound-icon')
// console.log(sound);
mute.style.display = 'none'
let btnState = true
sound.addEventListener('click', function () {
  console.log(btnState)
  if (btnState) {
    mute.style.display = 'block'
    unmute.style.display = 'none'
    btnState = false
  } else {
    mute.style.display = 'none'
    unmute.style.display = 'block'
    btnState = true
  }
})
